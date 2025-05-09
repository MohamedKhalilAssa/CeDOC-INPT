const ProgrammesSection = () => {
  return (
    <section id="programmes" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">
            Formations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Actualités
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez parmi nos programmes pluridisciplaires conçus pour former
            des experts de haut niveau.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden group">
            <div className="relative overflow-hidden h-48">
              <img
                src="https://via.placeholder.com/600x400?text=IA"
                alt="IA"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  Nouveau
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <i className="fas fa-brain text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Intelligence Artificielle</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Recherche avancée en deep learning, vision par ordinateur et
                traitement automatique du langage naturel.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition duration-300 group"
              >
                En savoir plus
                <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition duration-300"></i>
              </a>
            </div>
          </div>

          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden group">
            <div className="relative overflow-hidden h-48">
              <img
                src="https://via.placeholder.com/600x400?text=5G"
                alt="Télécoms"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <i className="fas fa-satellite-dish text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Télécommunications</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Recherche de pointe sur les réseaux 5G/6G, l'IdO et les systèmes
                de communication sans fil.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition duration-300 group"
              >
                En savoir plus
                <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition duration-300"></i>
              </a>
            </div>
          </div>

          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden group">
            <div className="relative overflow-hidden h-48">
              <img
                src="https://via.placeholder.com/600x400?text=Securité"
                alt="Cybersécurité"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <i className="fas fa-shield-alt text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cybersécurité</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Études avancées en cryptographie, sécurité des réseaux et
                forensic numérique.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition duration-300 group"
              >
                En savoir plus
                <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition duration-300"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="relative inline-flex items-center px-6 py-3 overflow-hidden font-medium rounded-full group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-800"></span>
            <span className="relative z-10 text-white font-medium flex items-center">
              Voir tous les programmes
              <i className="fas fa-chevron-right ml-2 transform group-hover:translate-x-1 transition duration-300"></i>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProgrammesSection;
