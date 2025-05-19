import { motion } from "framer-motion";
import { FaCalendarCheck, FaArrowRight, FaEnvelope } from "react-icons/fa";

const AdmissionSection = () => {
  const steps = [
    {
      number: 1,
      title: "Vérifier les prérequis",
      description: "Consultez les conditions académiques et linguistiques requises."
    },
    {
      number: 2,
      title: "Préparer le dossier",
      description: "Rassemblez vos diplômes, projet de recherche et lettres de recommandation."
    },
    {
      number: 3,
      title: "Soumettre la candidature",
      description: "Complétez et soumettez votre dossier via notre plateforme en ligne."
    },
    {
      number: 4,
      title: "Entretien & décision",
      description: "Les candidats retenus passeront un entretien avant la décision finale."
    }
  ];

  const deadlines = [
    {
      id: 1,
      session: "Session d'automne 2025",
      date: "30 juin 2025",
      progress: 40,
      places: "60% des places restantes"
    },
    {
      id: 2,
      session: "Session de printemps 2026",
      date: "15 novembre 2026",
      progress: 0,
      places: "Toutes les places disponibles"
    }
  ];

  return (
    <section id="admission" className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-3"
            whileHover={{ scale: 1.05 }}
          >
            Admission
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment Postuler ?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Rejoignez notre communauté de chercheurs à travers un processus d'admission transparent.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-white/20 transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                {step.number}
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-blue-100">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="md:flex">
            {/* Deadlines Section */}
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Dates limites</h3>
              <ul className="space-y-6">
                {deadlines.map((deadline) => (
                  <motion.li 
                    key={deadline.id}
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-blue-100 p-3 rounded-xl mr-4 flex-shrink-0">
                      <FaCalendarCheck className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{deadline.session}</h4>
                      <p className="text-gray-600">Date limite : {deadline.date}</p>
                      <div className="mt-1 h-1 w-full bg-gray-100 rounded-full">
                        <motion.div 
                          className="h-1 bg-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${deadline.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{deadline.places}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Application CTA Section */}
            <div id="candidature" className="md:w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Prêt à Postuler ?</h3>
              <p className="mb-8">Lancez votre candidature aujourd'hui et commencez votre aventure doctorale à l'INPT.</p>
              
              <motion.a 
                href="#"
                className="relative inline-flex items-center px-8 py-3 overflow-hidden font-medium rounded-full shadow-xl group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-gray-200 opacity-10 group-hover:opacity-20 transition duration-300"></span>
                <span className="relative z-10 flex items-center">
                  Commencer la candidature
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </span>
              </motion.a>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="font-bold mb-3">Besoin d'aide ?</h4>
                <p className="text-blue-100 text-sm mb-4">Notre équipe est disponible pour répondre à vos questions sur le processus d'admission.</p>
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-sm font-medium hover:underline"
                >
                  <FaEnvelope className="mr-2" />
                  Contactez-nous
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionSection;