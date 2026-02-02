import { ArrowRight } from 'lucide-react';

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-gray-900 mb-6">
              Innovative Design Solutions for Agricultural & Food Industries
            </h1>
            <p className="text-gray-600 mb-8">
              We specialize in engineering design for agricultural machinery, food processing equipment, 
              and dairy facility layouts. Transforming ideas into efficient, reliable solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToContact}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Our Services
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-200">
              <div>
                <div className="text-blue-600 mb-2">7+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div>
                <div className="text-blue-600 mb-2">4+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1744627049721-73c27008ad28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGRlc2lnbiUyMGJsdWVwcmludHxlbnwxfHx8fDE3NjU0NjAxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Engineering Design"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl hidden md:block">
              <div className="mb-1">Trusted by Industry Leaders</div>
              <div className="text-blue-100">FARM MECH DESIGN Since 2023</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}