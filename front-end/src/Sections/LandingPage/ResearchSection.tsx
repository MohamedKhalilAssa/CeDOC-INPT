import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const ResearchSection = () => {
  const researchProjects = [
    {
      id: 1,
      title: "IA Explicable en Santé",
      description: "Développement de techniques innovantes pour des systèmes d'IA plus transparents dans le diagnostic médical.",
      category: "IA Médicale",
      date: "Mars 2023",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      researcher: {
        name: "Dr. Chaimae El Hassani",
        role: "Directrice de recherche IA",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
      }
    },
    {
      id: 2,
      title: "Protocoles Éco-énergétiques",
      description: "Solutions innovantes pour réduire la consommation énergétique dans les réseaux de nouvelle génération.",
      category: "6G",
      date: "Janvier 2023",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      researcher: {
        name: "Pr. Karim Alami",
        role: "Responsable Labo Télécoms",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
      }
    },
    {
      id: 3,
      title: "Cybersécurité Quantique",
      description: "Développement de nouveaux algorithmes résistants aux attaques quantiques.",
      category: "Sécurité",
      date: "Avril 2023",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      researcher: {
        name: "Dr. Amina Belhaj",
        role: "Responsable Sécurité Quantique",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
      }
    },
    {
      id: 4,
      title: "Robotique Médicale",
      description: "Conception de robots assistifs pour les interventions chirurgicales complexes.",
      category: "Robotique",
      date: "Février 2023",
      image: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      researcher: {
        name: "Dr. Youssef Kabbaj",
        role: "Directeur Robotique Médicale",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
      }
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="recherche" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3"
            whileHover={{ scale: 1.05 }}
          >
            Avancées scientifiques
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recherche & Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les projets de recherche innovants conduits par nos doctorants et chercheurs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {researchProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="flex flex-col h-full bg-gray-50 rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={index}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-white text-sm bg-black/30 px-2 py-1 rounded">
                      {project.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                
                <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
                  <motion.img 
                    src={project.researcher.avatar}
                    alt={project.researcher.name}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-md"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{project.researcher.name}</p>
                    <p className="text-xs text-gray-500">{project.researcher.role}</p>
                  </div>
                  <a 
                    href="#"
                    className="ml-auto text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label={`En savoir plus sur ${project.title}`}
                  >
                    <FaArrowRight className="text-lg" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-full group"
            whileHover={{ 
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            Explorer toutes les recherches
            <motion.span
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <FaArrowRight />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;