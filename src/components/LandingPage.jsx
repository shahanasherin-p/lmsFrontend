import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, BarChart, Smartphone } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="font-sans antialiased text-gray-900">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-indigo-600 to-purple-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              BRIGHTLEARN
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Revolutionize Your Learning Experience
            </p>
            <button 
              onClick={handleGetStarted} 
              className="bg-white text-indigo-600 hover:bg-indigo-50 py-3 px-6 rounded-full font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg 
            className="absolute top-0 right-0 w-full h-full" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320"
          >
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"
            />
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Discover Our Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed to enhance learning, engagement, and performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="flex justify-center mb-4">
                <Book className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Interactive Courses
              </h3>
              <p className="text-gray-600">
                Engage with dynamic, personalized content that adapts to your learning style.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="flex justify-center mb-4">
                <BarChart className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Comprehensive Analytics
              </h3>
              <p className="text-gray-600">
                Gain insights into learning progress with intuitive, detailed performance tracking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="flex justify-center mb-4">
                <Smartphone className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Mobile-First Design
              </h3>
              <p className="text-gray-600">
                Learn seamlessly across devices with our responsive, mobile-friendly platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;