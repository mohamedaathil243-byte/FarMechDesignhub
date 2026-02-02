import { Tractor, Package, Milk, Settings } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Tractor,
      title: 'Agricultural Machinery Design',
      description: 'Custom design solutions for tractors, harvesters, seeders, and other agricultural implements. We focus on efficiency, durability, and ease of use.',
      features: [
        'Custom machinery design',
        'Implement development',
        'Equipment optimization',
        'CAD modeling & simulation'
      ]
    },
    {
      icon: Package,
      title: 'Food Processing Machinery',
      description: 'Innovative equipment design for food processing plants, ensuring hygiene, efficiency, and compliance with industry standards.',
      features: [
        'Processing equipment design',
        'Packaging line solutions',
        'Hygiene-compliant systems',
        'Automation integration'
      ]
    },
    {
      icon: Milk,
      title: 'Dairy Layout Design',
      description: 'Complete dairy facility layout planning, from milking parlors to processing areas, optimized for workflow and productivity.',
      features: [
        'Milking parlor design',
        'Processing area layout',
        'Cold storage planning',
        'Workflow optimization'
      ]
    },
    {
      icon: Settings,
      title: 'Engineering Consulting',
      description: 'Expert consultation services for machinery upgrades, facility improvements, and technical problem-solving.',
      features: [
        'Technical consultation',
        'Equipment upgrades',
        'Performance analysis',
        'Compliance support'
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive engineering design solutions tailored to your industry needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="text-white" size={28} />
              </div>
              <h3 className="text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
