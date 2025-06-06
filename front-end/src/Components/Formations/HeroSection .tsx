// components/HeroSection.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="accueil" className="relative gradient-bg text-white pt-32 pb-28 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Formations <span className="gradient-text">d'Excellence</span></h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">Développez vos compétences avec nos programmes académiques et professionnels conçus par des experts.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#programmes" className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium rounded-full group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-gray-200"></span>
                <span className="relative z-10 text-blue-900 font-medium">Découvrir</span>
                <span className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 opacity-0 group-hover:opacity-75 transition duration-300"></span>
              </a>
              <a href="#inscription" className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium rounded-full group border-2 border-white">
                <span className="absolute inset-0 bg-white opacity-10"></span>
                <span className="relative z-10 text-white font-medium">S'inscrire</span>
              </a>
            </div>
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-2">
                <img src="https://via.placeholder.com/40x40?text=1" alt="Étudiant" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://via.placeholder.com/40x40?text=2" alt="Étudiant" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://via.placeholder.com/40x40?text=3" alt="Étudiant" className="w-10 h-10 rounded-full border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-blue-800 border-2 border-white flex items-center justify-center text-xs font-bold">500+</div>
              </div>
              <div>
                <p className="text-sm text-blue-100">Rejoignez nos <span className="font-bold">2000 apprenants</span> chaque année</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img src="https://via.placeholder.com/500x400?text=Formations+INPT" alt="Formations INPT" className="floating rounded-2xl shadow-2xl max-w-full h-auto ring-4 ring-white/20" />
              <div className="absolute -bottom-6 -left-6 bg-blue-700 p-4 rounded-2xl shadow-lg z-20 animate-pulse">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <i className="fas fa-trophy text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-xs text-white/80">Classement 2023</p>
                    <p className="text-white font-bold">Top 5 au Maroc</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg z-20">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <i className="fas fa-graduation-cap text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Taux de réussite</p>
                    <p className="text-blue-900 font-bold">95%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shape-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current text-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current text-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current text-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;