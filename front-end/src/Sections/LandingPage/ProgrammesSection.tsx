import { FaBrain, FaSatelliteDish, FaShieldAlt, FaArrowRight, FaChevronRight } from 'react-icons/fa';

const ProgrammesSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "Intelligence Artificielle",
      description: "Recherche avancée en deep learning, vision par ordinateur et traitement automatique du langage naturel.",
      icon: <FaBrain className="text-blue-600 text-xl" />,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      tag: "Nouveau"
    },
    {
      id: 2,
      title: "Télécommunications",
      description: "Recherche de pointe sur les réseaux 5G/6G, l'IdO et les systèmes de communication sans fil.",
      icon: <FaSatelliteDish className="text-blue-600 text-xl" />,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Cybersécurité",
      description: "Études avancées en cryptographie, sécurité des réseaux et forensic numérique.",
      icon: <FaShieldAlt className="text-blue-600 text-xl" />,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">
            Formations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Programmes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez parmi nos programmes pluridisciplaires conçus pour former
            des experts de haut niveau.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative overflow-hidden h-48 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                {item.tag && (
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition duration-300 group"
                    aria-label={`En savoir plus sur ${item.title}`}
                  >
                    En savoir plus
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition duration-300" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="relative inline-flex items-center px-6 py-3 overflow-hidden font-medium rounded-full group hover:shadow-md transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-800 group-hover:from-blue-700 group-hover:to-blue-900 transition-colors duration-300"></span>
            <span className="relative z-10 text-white font-medium flex items-center">
              Voir tous les programmes
              <FaChevronRight className="ml-2 transform group-hover:translate-x-1 transition duration-300" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProgrammesSection;