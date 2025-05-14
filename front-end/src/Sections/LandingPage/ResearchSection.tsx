import { motion } from "framer-motion";

const ResearchSection = () => {
  const researchProjects = [
    {
      id: 1,
      title: "IA Explicable en Santé",
      description: "Développement de techniques innovantes pour des systèmes d'IA plus transparents dans le diagnostic médical.",
      category: "IA Médicale",
      date: "Mars 2023",
      image: "https://source.unsplash.com/random/800x500/?ai,medical",
      researcher: {
        name: "Dr. Chaimae El Hassani",
        role: "Directrice de recherche IA",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    },
    {
      id: 2,
      title: "Protocoles Éco-énergétiques",
      description: "Solutions innovantes pour réduire la consommation énergétique dans les réseaux de nouvelle génération.",
      category: "6G",
      date: "Janvier 2023",
      image: "https://source.unsplash.com/random/800x500/?5g,network",
      researcher: {
        name: "Pr. Karim Alami",
        role: "Responsable Labo Télécoms",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    }
  ];

  return (
    <section id="recherche" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">
            Avancées scientifiques
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recherche & Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les projets de recherche innovants conduits par nos doctorants et chercheurs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {researchProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="research-card bg-gray-50 rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="inline-flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mr-2">
                      {project.category}
                    </span>
                    <span className="text-white text-sm">{project.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-blue-100 mb-4">{project.description}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center">
                  <motion.img 
                    src={project.researcher.avatar}
                    alt={project.researcher.name}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{project.researcher.name}</p>
                    <p className="text-xs text-gray-500">{project.researcher.role}</p>
                  </div>
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
          <a 
            href="#" 
            className="relative inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-full group overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition duration-300"></span>
            <span className="relative z-10 flex items-center">
              Explorer toutes les recherches
              <svg 
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;