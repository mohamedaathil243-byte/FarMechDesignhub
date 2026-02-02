import { Mail, Phone, MapPin } from 'lucide-react';
import logo from 'figma:asset/467aaa67bbd6088c02348910d6afdfbca990725f.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Farm Mech Design" className="h-12 w-auto bg-white rounded-lg p-1" />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Leading provider of engineering design solutions for agricultural machinery, 
              food processing equipment, and dairy facility layouts.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>+91 8939253197</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <div className="flex flex-col">
                  <span>mohamedaathil243@gmail.com</span>
                  <span>farmmechdesign@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Lawley Road, Coimbatore 641003</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Agricultural Machinery</li>
              <li className="text-gray-400">Food Processing</li>
              <li className="text-gray-400">Dairy Layouts</li>
              <li className="text-gray-400">Engineering Consulting</li>
              <li className="text-gray-400">Custom Machine Design</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} FARM MECH DESIGN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}