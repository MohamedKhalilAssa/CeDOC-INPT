import  { useState, useEffect } from 'react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

import { getData } from "../../Helpers/CRUDFunctions"
import appConfig from "../../public/config";

import { FormationResponseDTO } from '../../Types/FormationTypes/FormationResponse';

import { LucideIcon } from "lucide-react";

import {
  Brain,
  Code,
  Network,
  Shield,
  Database,
  Cloud,
  Link,
  Bot,
} from 'lucide-react';


// Programmes Section Component
const ProgrammesSection = () => {


const getModuleIcon = (module: string): LucideIcon => {
  switch (module) {
    case "IA":
      return Brain;
    case "DEV":
      return Code;
    case "TELECOM":
      return Network;
    case "CYBERSECURITE":
      return Shield;
    case "DATA":
      return Database;
    case "CLOUD":
      return Cloud;
    case "BLOCKCHAIN":
      return Link;
    case "ROBOTIQUE":
      return Bot;
    default:
      return Brain;
  }
};

const getFormations = async (): Promise<FormationResponseDTO[]> => {
  return (await getData(appConfig.API_PATHS.FORMATION.getAll.path)) ?? [];
};




  const [courses, setCourses] = useState<FormationResponseDTO[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<FormationResponseDTO[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("ALL");

  const [currentPage, setCurrentPage] = useState(1);
  const COURSES_PER_PAGE = 6;


  useEffect(() => {
    const handleSelectModule = (e: CustomEvent) => {
      setSelectedModule(e.detail);
    };

    window.addEventListener("selectModule", handleSelectModule as EventListener);
    return () => window.removeEventListener("selectModule", handleSelectModule as EventListener);
  }, []);


  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const data = await getFormations();
        setCourses(data as FormationResponseDTO[]);
      } catch (err) {
        console.error("Erreur lors du chargement des formations", err);
      }
    };

    fetchFormations();
  }, []);

  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.formationName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedModule !== "ALL") {
      filtered = filtered.filter(course => course.module === selectedModule);
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedModule, courses]);

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };



  const indexOfLast = currentPage * COURSES_PER_PAGE;
  const indexOfFirst = indexOfLast - COURSES_PER_PAGE;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);




  // const courset = [
  //   {
  //     id: 1,
  //     title: "Intelligence Artificielle & Machine Learning",
  //     description: "Maîtrisez les algorithmes d'IA, le deep learning et les applications pratiques.",
  //     duration: "60 heures",
  //     period: "3 mois",
  //     price: "2 500 DH",
  //     level: "Débutant",
  //     levelColor: "bg-green-100 text-green-800",
  //     icon: Brain,
  //     image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400",
  //     popular: false
  //   },
  //   {
  //     id: 2,
  //     title: "Réseaux 5G & Télécommunications",
  //     description: "Architecture 5G, IoT et technologies de communication avancées.",
  //     duration: "80 heures",
  //     period: "4 mois",
  //     price: "3 800 DH",
  //     level: "Intermédiaire",
  //     levelColor: "bg-yellow-100 text-yellow-800",
  //     icon: Network,
  //     image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=400",
  //     popular: true
  //   },
  //   {
  //     id: 3,
  //     title: "Cybersécurité & Ethical Hacking",
  //     description: "Sécurisation des systèmes, tests d'intrusion et forensic numérique.",
  //     duration: "120 heures",
  //     period: "6 mois",
  //     price: "5 200 DH",
  //     level: "Avancé",
  //     levelColor: "bg-red-100 text-red-800",
  //     icon: Shield,
  //     image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600&h=400",
  //     popular: false
  //   },
  //   {
  //     id: 4,
  //     title: "Data Science & Analytics",
  //     description: "Analyse des données, visualisation et business intelligence.",
  //     duration: "70 heures",
  //     period: "3 mois",
  //     price: "2 900 DH",
  //     level: "Débutant",
  //     levelColor: "bg-green-100 text-green-800",
  //     icon: Database,
  //     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400",
  //     popular: false
  //   },
  //   {
  //     id: 5,
  //     title: "Cloud Computing & DevOps",
  //     description: "AWS, Azure, containerisation et architectures cloud natives.",
  //     duration: "90 heures",
  //     period: "4 mois",
  //     price: "4 100 DH",
  //     level: "Intermédiaire",
  //     levelColor: "bg-yellow-100 text-yellow-800",
  //     icon: Cloud,
  //     image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=400",
  //     popular: false
  //   },
  //   {
  //     id: 6,
  //     title: "Blockchain & Web3",
  //     description: "Smart contracts, DApps et économie décentralisée.",
  //     duration: "100 heures",
  //     period: "5 mois",
  //     price: "4 800 DH",
  //     level: "Avancé",
  //     levelColor: "bg-red-100 text-red-800",
  //     icon: Link,
  //     image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600&h=400",
  //     popular: false
  //   }
  // ];

  return (
    
    <section id="programmes" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            Programmes
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Nos Formations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des programmes innovants adaptés aux besoins du marché et aux dernières technologies.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent default form reload
            handleSearch();     // trigger the same function as button click
          }}
        >
          <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4 mx-auto">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Rechercher une formation..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />

            {/* Module Filter Dropdown */}
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Tous les modules</option>
              <option value="IA">Intelligence Artificielle</option>
              <option value="DEV">Développement</option>
              <option value="TELECOM">Réseaux & Télécoms</option>
              <option value="CYBERSECURITE">Cybersécurité</option>
              <option value="DATA">Data Science</option>
              <option value="CLOUD">Cloud Computing</option>
              <option value="BLOCKCHAIN">Blockchain</option>
              <option value="ROBOTIQUE">Robotique & IoT</option>
            </select>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full md:w-auto p-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Rechercher
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCourses.map(course => {
              const IconComponent: LucideIcon = getModuleIcon(course.module);
            return (
            <div key={course.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {course.module == 'Intelligence Artificielle'? true : false  && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                  Populaire
                </div>
              )}
              
              <div className="relative overflow-hidden h-48">
                <img 
                  src={course.image} 
                  alt={course.formationName} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${course.duree > 100 ? "bg-red-100 text-red-800" : course.duree > 60 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"} transition-colors`}>
                  {course.duree > 100 ? "Avancé" : course.duree > 60 ? "Intermédiaire" : "Débutant"}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {course.formationName}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-2">{course.details}</p>
                
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duree}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{((course.duree ) / 22).toFixed(1)} mois</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{course.dateDebut}</span>
                  <button className="group/btn inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Détails
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )})}
        </div>
        
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
          >
            Précédent
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-300`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>

      </div>
    </section>
  );  
};

export default ProgrammesSection;
