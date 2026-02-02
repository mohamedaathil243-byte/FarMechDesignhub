import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-70f7e97d/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/make-server-70f7e97d/contact", async (c) => {
  try {
    const formData = await c.req.json();
    const { name, email, phone, service, message } = formData;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const timestamp = new Date().toISOString();
    const submissionId = `contact-${Date.now()}`;

    // Store in KV store
    await kv.set(submissionId, {
      name,
      email,
      phone: phone || "Not provided",
      service,
      message,
      timestamp,
    });

    // Send email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return c.json({ error: "Email service not configured" }, 500);
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "FARM MECH DESIGN <onboarding@resend.dev>",
        to: "farmmechdesign@gmail.com",
        subject: `New Contact Form Submission - ${service}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Email sending failed:", errorText);
      return c.json({ error: "Failed to send email notification" }, 500);
    }

    // Save to Google Drive
    const googleCredsJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    if (!googleCredsJson) {
      console.error("GOOGLE_SERVICE_ACCOUNT_JSON not configured");
      return c.json({ error: "Google Drive not configured" }, 500);
    }

    try {
      const credentials = JSON.parse(googleCredsJson);
      
      // Get OAuth2 token
      const jwtHeader = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
      const now = Math.floor(Date.now() / 1000);
      const jwtClaim = btoa(JSON.stringify({
        iss: credentials.client_email,
        scope: "https://www.googleapis.com/auth/drive.file",
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
      }));

      // Import the private key
      const pemHeader = "-----BEGIN PRIVATE KEY-----";
      const pemFooter = "-----END PRIVATE KEY-----";
      const pemContents = credentials.private_key
        .replace(pemHeader, "")
        .replace(pemFooter, "")
        .replace(/\s/g, "");
      
      const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
      
      const cryptoKey = await crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256",
        },
        false,
        ["sign"]
      );

      // Sign the JWT
      const dataToSign = new TextEncoder().encode(`${jwtHeader}.${jwtClaim}`);
      const signature = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        cryptoKey,
        dataToSign
      );
      
      const jwtSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");

      const jwt = `${jwtHeader}.${jwtClaim}.${jwtSignature}`;

      // Exchange JWT for access token
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error("Token exchange failed:", errorText);
        throw new Error("Failed to get access token");
      }

      const { access_token } = await tokenResponse.json();

      // Create file content
      const fileContent = `Contact Form Submission
Submitted: ${new Date(timestamp).toLocaleString()}
ID: ${submissionId}

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service}
Message: ${message}
`;

      // Upload to Google Drive
      const fileName = `Contact_${name.replace(/\s+/g, "_")}_${Date.now()}.txt`;
      const metadata = {
        name: fileName,
        mimeType: "text/plain",
      };

      const form = new FormData();
      form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
      form.append("file", new Blob([fileContent], { type: "text/plain" }));

      const driveResponse = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${access_token}`,
          },
          body: form,
        }
      );

      if (!driveResponse.ok) {
        const errorText = await driveResponse.text();
        console.error("Google Drive upload failed:", errorText);
        throw new Error("Failed to upload to Google Drive");
      }

      console.log("Successfully uploaded to Google Drive");
    } catch (driveError) {
      console.error("Google Drive error:", driveError);
      // Continue even if Google Drive fails
    }

    return c.json({ 
      success: true, 
      message: "Contact form submitted successfully",
      id: submissionId 
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return c.json({ error: "Failed to process contact form" }, 500);
  }
});

Deno.serve(app.fetch);