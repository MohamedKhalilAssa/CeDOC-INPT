// components/ProgrammesSection.js
import React from 'react';

const ProgrammesSection = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction à l'IA",
      description: "Découvrez les fondamentaux de l'intelligence artificielle et ses applications pratiques.",
      duration: "60 heures",
      period: "3 mois",
      price: "2 500 DH",
      level: "beginner",
      icon: "brain",
      image: "https://via.placeholder.com/600x400?text=IA"
    },
    {
      id: 2,
      title: "Réseaux 5G",
      description: "Maîtrisez les concepts avancés des réseaux 5G et leurs architectures.",
      duration: "80 heures",
      period: "4 mois",
      price: "3 800 DH",
      level: "intermediate",
      icon: "satellite-dish",
      image: "https://via.placeholder.com/600x400?text=5G"
    },
    {
      id: 3,
      title: "Cybersécurité Offensive",
      description: "Techniques avancées de test d'intrusion et de sécurisation des systèmes.",
      duration: "120 heures",
      period: "6 mois",
      price: "5 200 DH",
      level: "advanced",
      icon: "shield-alt",
      image: "https://via.placeholder.com/600x400?text=Securité"
    },
    {
      id: 4,
      title: "Data Science",
      description: "Introduction à l'analyse des données et aux techniques de machine learning.",
      duration: "70 heures",
      period: "3 mois",
      price: "2 900 DH",
      level: "beginner",
      icon: "database",
      image: "https://via.placeholder.com/600x400?text=Data"
    },
    {
      id: 5,
      title: "Cloud Computing",
      description: "Architectures cloud, déploiement et gestion des services AWS et Azure.",
      duration: "90 heures",
      period: "4 mois",
      price: "4 100 DH",
      level: "intermediate",
      icon: "cloud",
      image: "https://via.placeholder.com/600x400?text=Cloud"
    },
    {
      id: 6,
      title: "Blockchain",
      description: "Développement d'applications décentralisées et contrats intelligents.",
      duration: "100 heures",
      period: "5 mois",
      price: "4 800 DH",
      level: "advanced",
      icon: "link",
      image: "https://via.placeholder.com/600x400?text=Blockchain"
    }
  ];

  return (
    <section id="programmes" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badge="Programmes" 
          title="Nos Formations" 
          description="Des programmes académiques et professionnels adaptés à vos besoins." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="relative inline-flex items-center px-6 py-3 overflow-hidden font-medium rounded-full group">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-800"></span>
            <span className="relative z-10 text-white font-medium flex items-center">
              Voir toutes les formations
              <i className="fas fa-chevron-right ml-2 transform group-hover:translate-x-1 transition duration-300"></i>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ badge, title, description }) => (
  <div className="text-center mb-16">
    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">{badge}</span>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
  </div>
);

const CourseCard = ({ course }) => {
  const levelClasses = {
    beginner: "level-beginner",
    intermediate: "level-intermediate",
    advanced: "level-advanced"
  };
  
  const levelText = {
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé"
  };

  return (
    <div className="course-card bg-white rounded-xl shadow-lg overflow-hidden group relative">
      <div className={`level-badge ${levelClasses[course.level]}`}>{levelText[course.level]}</div>
      <div className="relative overflow-hidden h-48">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-xl mr-4">
            <i className={`fas fa-${course.icon} text-blue-600 text-xl`}></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <i className="fas fa-clock mr-2"></i>
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <i className="fas fa-calendar-alt mr-2"></i>
            <span>{course.period}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-bold">{course.price}</span>
          <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition duration-300 group">
            Détails
            <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition duration-300"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProgrammesSection;