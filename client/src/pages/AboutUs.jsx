import { FiUsers, FiAward, FiGlobe, FiHeart, FiCode } from 'react-icons/fi';
import { Link } from "react-router-dom"
export default function AboutUs() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-blue-600 dark:bg-blue-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-blue-600 dark:bg-blue-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                    <span className="block">About Our</span>
                    <span className="block text-blue-200 dark:text-blue-300">Sentiment Analysis Platform</span>
                  </h1>
                  <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Pioneering Arabic language understanding through advanced machine learning techniques
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              To make Arabic sentiment analysis more accurate and accessible
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <FiGlobe className="h-8 w-8 text-blue-500" />,
                  title: "Language Focus",
                  description: "Specializing in Arabic NLP with models fine-tuned for regional dialects"
                },
                {
                  icon: <FiCode className="h-8 w-8 text-blue-500" />,
                  title: "Open Research",
                  description: "Contributing to the Arabic NLP community with published papers and open datasets"
                },
                {
                  icon: <FiAward className="h-8 w-8 text-blue-500" />,
                  title: "Accuracy First",
                  description: "Ensemble methods that outperform single-model approaches"
                }
              ].map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white dark:bg-gray-700 rounded-lg px-6 pb-8 h-full shadow">
                    <div className="-mt-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-50 dark:bg-blue-900/30 text-white mx-auto">
                        {feature.icon}
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white text-center">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-300 text-center">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              NLP researchers working on Arabic language technology
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This project is part of a Master's thesis at University 8 Mai 1945, Guelma
            </p>
            <a 
              href="https://dspace.univ-guelma.dz/jspui/bitstream/123456789/16457/1/F5_8_BOUKHEROUBA_MOHAMMED%20RAID%20ELISLAM.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Thesis Document
            </a>
          </div>
                  
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {[
              {
                name: "Mohammed Raid Boukherouba",
                role: "Master Student",
                bio: "master student at University 8 Mai 1945.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='20' fill='%23374151'/%3E%3Ccircle cx='50' cy='35' r='16' fill='%23f0f0f0'/%3E%3Cpath d='M40 30 Q50 20 60 30' stroke='%23374151' stroke-width='2' fill='none'/%3E%3Cpath d='M30 85 Q50 95 70 85' stroke='%23374151' stroke-width='3' fill='none'/%3E%3C/svg%3E"
              },
              {
                name: "Djalila Boughareb",
                role: "Thesis Supervisor",
                bio: "Doctor at University 8 Mai 1945",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='20' fill='%23374151'/%3E%3Ccircle cx='50' cy='35' r='16' fill='%23f0f0f0'/%3E%3Cpath d='M40 30 Q50 20 60 30' stroke='%23374151' stroke-width='2' fill='none'/%3E%3Cpath d='M30 85 Q50 95 70 85' stroke='%23374151' stroke-width='3' fill='none'/%3E%3C/svg%3E"
              }
            ].map((member, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full shadow hover:shadow-lg transition-shadow duration-200">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-24 w-24 rounded-full bg-white dark:bg-gray-700 shadow-md mx-auto overflow-hidden">
                      <img className="h-full w-full object-cover" src={member.image} alt={member.name} />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white text-center">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-blue-600 dark:text-blue-400 text-center">
                      {member.role}
                    </p>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-300 text-center">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-200">Start analyzing text today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}