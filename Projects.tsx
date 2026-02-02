export function Projects() {
  const projects = [
    {
      title: 'Agricultural Implements Design',
      category: 'Agricultural Machinery',
      image: 'https://images.unsplash.com/photo-1689150396762-65ed008390cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBtYWNoaW5lcnklMjBmYXJtfGVufDF8fHx8MTc2NTQ2MDExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Designed custom agricultural implements that increased farming efficiency and productivity'
    },
    {
      title: 'Dairy Plant Design for Farmers',
      category: 'Dairy Layout',
      image: 'https://images.unsplash.com/photo-1764730570508-2316fb8df2fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMGZhcm0lMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY1NDYwMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Complete dairy plant layout design tailored for small to medium-scale farmers with efficient processing systems'
    },
    {
      title: 'Food Processing Layout and Machine',
      category: 'Food Machinery',
      image: 'https://images.unsplash.com/photo-1759244207370-a36254cbd59f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJvY2Vzc2luZyUyMGZhY3Rvcnl8ZW58MXx8fHwxNzY1Mzc1MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Comprehensive food processing facility layout design with custom machinery integration'
    },
    {
      title: 'Industrial Equipment Upgrade',
      category: 'Agricultural Machinery',
      image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFjaGluZXJ5fGVufDF8fHx8MTc2NTQ0MjM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Modernized existing agricultural machinery with improved efficiency and safety features'
    },
    {
      title: 'Smart Factory Integration',
      category: 'Food Machinery',
      image: 'https://images.unsplash.com/photo-1742970936099-b68c962278c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYWN0b3J5JTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NTM1MzM1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Integrated IoT and automation solutions for modern food processing facilities'
    },
    {
      title: 'Precision Seeding Equipment',
      category: 'Agricultural Machinery',
      image: 'https://images.unsplash.com/photo-1689150396762-65ed008390cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBtYWNoaW5lcnklMjBmYXJtfGVufDF8fHx8MTc2NTQ2MDExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Developed precision seeding system with GPS integration for optimal planting accuracy'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of successful engineering solutions across various industries
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}