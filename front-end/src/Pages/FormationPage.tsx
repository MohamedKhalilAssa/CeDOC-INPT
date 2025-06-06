import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, Calendar, Users, Star, Award, Check, Brain, Network, Shield, Database, Cloud, Code, Link, Bot, Trophy, GraduationCap, CheckCircle, ArrowRight, Mail } from 'lucide-react';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white pt-32 pb-28 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Formations{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  d'Excellence
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Développez vos compétences avec nos programmes académiques et professionnels 
                conçus par des experts de l'industrie.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-white text-blue-900 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Découvrir <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="group px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300">
                S'inscrire maintenant
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-3 border-white flex items-center justify-center text-white font-bold">
                    {i}
                  </div>
                ))}
                <div className="w-12 h-12 bg-blue-800 rounded-full border-3 border-white flex items-center justify-center text-white font-bold text-sm">
                  2K+
                </div>
              </div>
              <div>
                <p className="text-blue-100">
                  Rejoignez nos <span className="font-bold text-white">2000 apprenants</span> chaque année
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=400" 
                alt="Formations INPT" 
                className="relative rounded-3xl shadow-2xl max-w-full h-auto ring-4 ring-white/20 group-hover:scale-105 transition-transform duration-500" 
              />
              
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-2xl shadow-xl animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Trophy className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-white/80">Classement 2024</p>
                    <p className="text-white font-bold">Top 5 au Maroc</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
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
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

// Stats Section Component
const StatsSection = () => {
  const [counters, setCounters] = useState({ formations: 0, teachers: 0, partners: 0, insertion: 0 });
  
  useEffect(() => {
    const targets = { formations: 50, teachers: 120, partners: 15, insertion: 90 };
    const duration = 2000;
    const steps = 60;
    
    const increment = Object.fromEntries(
      Object.entries(targets).map(([key, value]) => [key, value / steps])
    );
    
    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCounters(prev => ({
          formations: Math.min(Math.floor(increment.formations * currentStep), targets.formations),
          teachers: Math.min(Math.floor(increment.teachers * currentStep), targets.teachers),
          partners: Math.min(Math.floor(increment.partners * currentStep), targets.partners),
          insertion: Math.min(Math.floor(increment.insertion * currentStep), targets.insertion)
        }));
        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: counters.formations, label: "Formations", suffix: "+" },
    { value: counters.teachers, label: "Enseignants experts", suffix: "+" },
    { value: counters.partners, label: "Partenaires industriels", suffix: "+" },
    { value: counters.insertion, label: "Taux d'insertion", suffix: "%" }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-500 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-4">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-700 font-medium text-lg">{stat.label}</div>
              <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full group-hover:w-24 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Programmes Section Component
const ProgrammesSection = () => {
  const courses = [
    {
      id: 1,
      title: "Intelligence Artificielle & Machine Learning",
      description: "Maîtrisez les algorithmes d'IA, le deep learning et les applications pratiques.",
      duration: "60 heures",
      period: "3 mois",
      price: "2 500 DH",
      level: "Débutant",
      levelColor: "bg-green-100 text-green-800",
      icon: Brain,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400",
      popular: false
    },
    {
      id: 2,
      title: "Réseaux 5G & Télécommunications",
      description: "Architecture 5G, IoT et technologies de communication avancées.",
      duration: "80 heures",
      period: "4 mois",
      price: "3 800 DH",
      level: "Intermédiaire",
      levelColor: "bg-yellow-100 text-yellow-800",
      icon: Network,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=400",
      popular: true
    },
    {
      id: 3,
      title: "Cybersécurité & Ethical Hacking",
      description: "Sécurisation des systèmes, tests d'intrusion et forensic numérique.",
      duration: "120 heures",
      period: "6 mois",
      price: "5 200 DH",
      level: "Avancé",
      levelColor: "bg-red-100 text-red-800",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600&h=400",
      popular: false
    },
    {
      id: 4,
      title: "Data Science & Analytics",
      description: "Analyse des données, visualisation et business intelligence.",
      duration: "70 heures",
      period: "3 mois",
      price: "2 900 DH",
      level: "Débutant",
      levelColor: "bg-green-100 text-green-800",
      icon: Database,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400",
      popular: false
    },
    {
      id: 5,
      title: "Cloud Computing & DevOps",
      description: "AWS, Azure, containerisation et architectures cloud natives.",
      duration: "90 heures",
      period: "4 mois",
      price: "4 100 DH",
      level: "Intermédiaire",
      levelColor: "bg-yellow-100 text-yellow-800",
      icon: Cloud,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=400",
      popular: false
    },
    {
      id: 6,
      title: "Blockchain & Web3",
      description: "Smart contracts, DApps et économie décentralisée.",
      duration: "100 heures",
      period: "5 mois",
      price: "4 800 DH",
      level: "Avancé",
      levelColor: "bg-red-100 text-red-800",
      icon: Link,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600&h=400",
      popular: false
    }
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <div key={course.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {course.popular && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                  Populaire
                </div>
              )}
              
              <div className="relative overflow-hidden h-48">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${course.levelColor}`}>
                  {course.level}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <course.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{course.period}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                  <button className="group/btn inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Détails
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Voir toutes les formations
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );  
};

// Domaines Section Component
const DomainesSection = () => {
  const domains = [
    { icon: Brain, title: "Intelligence Artificielle", description: "ML, Deep Learning, Computer Vision, NLP", count: "8 formations", color: "from-purple-500 to-pink-500" },
    { icon: Network, title: "Réseaux & Télécoms", description: "5G/6G, IoT, Sécurité réseaux", count: "6 formations", color: "from-blue-500 to-cyan-500" },
    { icon: Shield, title: "Cybersécurité", description: "Ethical Hacking, Forensic, Cryptographie", count: "5 formations", color: "from-red-500 to-orange-500" },
    { icon: Database, title: "Data Science", description: "Big Data, Analytics, Visualisation", count: "7 formations", color: "from-green-500 to-emerald-500" },
    { icon: Cloud, title: "Cloud Computing", description: "AWS, Azure, DevOps, Microservices", count: "4 formations", color: "from-indigo-500 to-purple-500" },
    { icon: Code, title: "Développement", description: "Full Stack, Mobile, Architecture", count: "9 formations", color: "from-yellow-500 to-orange-500" },
    { icon: Link, title: "Blockchain", description: "Smart Contracts, DApps, Web3", count: "3 formations", color: "from-teal-500 to-cyan-500" },
    { icon: Bot, title: "Robotique & IoT", description: "Systèmes embarqués, Automatisation", count: "4 formations", color: "from-pink-500 to-rose-500" }
  ];

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
            <div key={index} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className={`bg-gradient-to-r ${domain.color} w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <domain.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {domain.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{domain.description}</p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                {domain.count} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Formation Page Component
const FormationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <StatsSection />
      <ProgrammesSection />
      <DomainesSection />
    </div>
  );
};

export default FormationPage;