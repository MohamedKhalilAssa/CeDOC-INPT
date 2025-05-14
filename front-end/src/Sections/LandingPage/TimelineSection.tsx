import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const TimelineSection = () => {
  const timelineItems = [
    {
      id: 1,
      title: "Recrutement",
      description:
        "Sélection sur dossier et entretien avec un comité scientifique.",
      content: {
        title: "Critères d'admission",
        items: [
          "Master ou diplôme équivalent",
          "Note minimale de 14/20",
          "Projet de recherche pertinent",
        ],
      },
      position: "left",
    },
    {
      id: 2,
      title: "Encadrement",
      description:
        "Soutien personnalisé par un directeur de recherche et un comité de suivi.",
      content: {
        title: "Encadrement",
        items: [
          "Directeur de recherche expérimenté",
          "Co-direction possible",
          "Réunions de suivi mensuelles",
        ],
      },
      position: "right",
    },
    {
      id: 3,
      title: "Formation",
      description: "Cours spécialisés, séminaires et écoles doctorales.",
      content: {
        title: "Modules proposés",
        items: [
          "Méthodologie de recherche",
          "Rédaction scientifique",
          "Communication scientifique",
        ],
      },
      position: "left",
    },
    {
      id: 4,
      title: "Valorisation",
      description:
        "Publication, transfert technologique et perspectives de carrière.",
      content: {
        title: "Opportunités",
        items: [
          "Mobilité internationale",
          "Partenariats industriels",
          "Conférences internationales",
        ],
      },
      position: "right",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">
            Parcours
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Votre Doctorat à l'INPT
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un accompagnement personnalisé tout au long de votre parcours
            doctoral.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline bar - hidden on mobile, centered on md+ screens */}
          <div className="hidden md:block absolute md:left-1/2 h-full w-1 bg-blue-200 transform -translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-0">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative flex flex-col md:flex-row items-start md:items-center"
                initial="hidden"
                whileInView="visible"
                variants={itemVariants}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Mobile timeline bar - only visible on mobile */}
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-200 md:hidden" />

                {/* Left content for md+ screens */}
                <div
                  className={`md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right pl-16 md:pl-0 ${
                    item.position === "right" ? "order-last md:order-first" : ""
                  }`}
                >
                  {item.position === "left" ? (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </>
                  ) : (
                    <motion.div
                      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="font-bold text-gray-900 mb-2">
                        {item.content.title}
                      </h4>
                      <ul className="text-gray-600 text-sm space-y-2">
                        {item.content.items.map((listItem, i) => (
                          <li key={i} className="flex items-start">
                            <FaCheck className="text-blue-500 mt-1 mr-2 text-sm" />
                            <span>{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>

                {/* Timeline dot - centered on the bar for both mobile and desktop */}
                <div className="absolute left-0.5 md:absolute md:left-1/2 top-2 md:top-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white z-10 transform -translate-x-1/2 md:-translate-x-1/2 md:-translate-y-1/2 shadow-lg">
                  {item.id}
                </div>

                {/* Right content for md+ screens */}
                <div
                  className={`md:w-1/2 md:pl-16 pl-16 ${
                    item.position === "right" ? "order-first md:order-last" : ""
                  }`}
                >
                  {item.position === "left" ? (
                    <motion.div
                      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="font-bold text-gray-900 mb-2">
                        {item.content.title}
                      </h4>
                      <ul className="text-gray-600 text-sm space-y-2">
                        {item.content.items.map((listItem, i) => (
                          <li key={i} className="flex items-start">
                            <FaCheck className="text-blue-500 mt-1 mr-2 text-sm" />
                            <span>{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
