import  { useState, useEffect } from 'react';
import {  Brain, Network, Shield, Database, Cloud, Code, Link, Bot,} from 'lucide-react';
import { FormationResponseDTO } from '../../Types/FormationTypes/FormationResponse';
import { getData } from "../../Helpers/CRUDFunctions"
import appConfig from "../../public/config";

// Domaines Section Component
const DomainesSection = () => {

    const getFormations = async () => {
        return getData(appConfig.API_PATHS.FORMATION.getAll.path);
    };
    const [counts, setCounts] = useState<Record<string, number>>({});

      useEffect(() => {
    const fetchFormations = async () => {
      try {

        const data = await getFormations() as FormationResponseDTO[];
        // count formations per module
        const moduleCount: Record<string, number> = {};
        data.forEach((f: FormationResponseDTO) => {
        const module = typeof f.module === 'string' ? f.module : "";
        if (module) {
            moduleCount[module] = (moduleCount[module] || 0) + 1;
        }
        });
        console.log("module counts:", moduleCount);
        setCounts(moduleCount);
      } catch (err) {
        console.error("Erreur lors du chargement des formations", err);
      }
    };

    fetchFormations();
    }, []);



    
  const domains = [
    { key: "IA", title: "Intelligence Artificielle", description: "ML, Deep Learning, Computer Vision, NLP", icon: Brain, color: "from-purple-500 to-pink-500" },
    { key: "TELECOM", title: "Réseaux & Télécoms", description: "5G/6G, IoT, Sécurité réseaux", icon: Network, color: "from-blue-500 to-cyan-500" },
    { key: "CYBERSECURITE", title: "Cybersécurité", description: "Ethical Hacking, Forensic, Cryptographie", icon: Shield, color: "from-red-500 to-orange-500" },
    { key: "DATA", title: "Data Science", description: "Big Data, Analytics, Visualisation", icon: Database, color: "from-green-500 to-emerald-500" },
    { key: "CLOUD", title: "Cloud Computing", description: "AWS, Azure, DevOps, Microservices", icon: Cloud, color: "from-indigo-500 to-purple-500" },
    { key: "DEV", title: "Développement", description: "Full Stack, Mobile, Architecture", icon: Code, color: "from-yellow-500 to-orange-500" },
    { key: "BLOCKCHAIN", title: "Blockchain", description: "Smart Contracts, DApps, Web3", icon: Link, color: "from-teal-500 to-cyan-500" },
    { key: "ROBOTIQUE", title: "Robotique & IoT", description: "Systèmes embarqués, Automatisation", icon: Bot, color: "from-pink-500 to-rose-500" }
  ];

    const handleDomainClick = (moduleKey: string) => {
    const searchSection = document.getElementById("programmes");
    if (searchSection) {
      window.scrollTo({
        top: searchSection.offsetTop - 80,
        behavior: "smooth"
      });
    }

    // trigger filter in ProgrammesSection
    const event = new CustomEvent("selectModule", { detail: moduleKey });
    window.dispatchEvent(event);
  };


 return (
    <section id="domaines" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            Domaines
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Nos Domaines d'Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorez nos domaines de formation et trouvez celui qui correspond à vos aspirations professionnelles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, index) => (
            <div
              key={index}
              onClick={() => handleDomainClick(domain.key)}
              className="group cursor-pointer relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`bg-gradient-to-r ${domain.color} w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <domain.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {domain.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{domain.description}</p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                {counts[domain.key] || 0} formations →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default DomainesSection;