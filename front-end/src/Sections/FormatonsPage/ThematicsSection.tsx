import { useState, useRef } from "react";

const ThematicsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
        
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
      
      setScrollPosition(scrollTo);
    }
  };

  const thematics = [
    {
      id: 1,
      title: "Informatique & Développement Logiciel",
      icon: (
        <div className="bg-blue-700 p-4 w-16 h-16 flex items-center justify-center text-white rounded">
          <span className="font-bold text-xl">DEV</span>
        </div>
      ),
    },
    {
      id: 2,
      title: "Science des Données & Intelligence Artificielle",
      icon: (
        <div className="bg-blue-700 p-4 w-16 h-16 flex items-center justify-center text-white rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 2a8 8 0 0 0-8 8c0 2.2.9 4.2 2.3 5.7L4 22h16l-2.3-6.3A8 8 0 0 0 20 10a8 8 0 0 0-8-8z"></path>
            <path d="M12 6v4"></path>
            <path d="M12 16h.01"></path>
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      title: "Réseaux & Télécommunications",
      icon: (
        <div className="bg-blue-700 p-4 w-16 h-16 flex items-center justify-center text-white rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
      ),
    },
    {
      id: 4,
      title: "Cybersécurité",
      icon: (
        <div className="bg-blue-700 p-4 w-16 h-16 flex items-center justify-center text-white rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
      ),
    },
    {
      id: 5,
      title: "Systèmes Embarqués",
      icon: (
        <div className="bg-blue-700 p-4 w-16 h-16 flex items-center justify-center text-white rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <line x1="9" y1="1" x2="9" y2="4"></line>
            <line x1="15" y1="1" x2="15" y2="4"></line>
            <line x1="9" y1="20" x2="9" y2="23"></line>
            <line x1="15" y1="20" x2="15" y2="23"></line>
            <line x1="20" y1="9" x2="23" y2="9"></line>
            <line x1="20" y1="14" x2="23" y2="14"></line>
            <line x1="1" y1="9" x2="4" y2="9"></line>
            <line x1="1" y1="14" x2="4" y2="14"></line>
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Nos thématiques</h2>
        <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
          Nos formations sont organisées autour de plusieurs thématiques clés en lien 
          avec les évolutions technologiques actuelles. Que vous soyez passionné par 
          l'intelligence artificielle, la cybersécurité ou les systèmes embarqués, nous avons 
          une formation adaptée à votre parcours !
        </p>

        <div className="relative">
          <button 
            onClick={() => scroll("left")} 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Précédent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto pb-8 scrollbar-hide gap-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {thematics.map((thematic) => (
              <div 
                key={thematic.id} 
                className="min-w-[280px] md:min-w-[320px] border border-gray-200 rounded-lg p-6 flex flex-col items-center transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                {thematic.icon}
                <h3 className="text-xl font-semibold mt-4 text-center">{thematic.title}</h3>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scroll("right")} 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Suivant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <a 
            href="#" 
            className="bg-blue-700 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-800 transition-colors"
          >
            VOIR TOUT LES THÉMATIQUES
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThematicsSection;