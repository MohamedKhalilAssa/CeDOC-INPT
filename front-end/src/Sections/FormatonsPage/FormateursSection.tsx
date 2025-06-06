import { useRef, useState } from "react";

const FormateursSection = () => {
  const formateursRef = useRef<HTMLDivElement>(null);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);

  const checkScrollButtons = () => {
    if (formateursRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = formateursRef.current;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (formateursRef.current) {
      const { scrollLeft, clientWidth } = formateursRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 1.5 
        : scrollLeft + clientWidth / 1.5;
        
      formateursRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
      
      // Update scroll buttons visibility after animation
      setTimeout(checkScrollButtons, 300);
    }
  };

  // Mock data for formateurs
  const formateurs = [
    {
      id: 1,
      name: "Dr. Ahmed El Fadil",
      position: "Professeur en Cybersécurité & Réseaux",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      name: "Dr. Fatima Zahra",
      position: "Spécialiste en Intelligence Artificielle",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      name: "Prof. Mohammed Alaoui",
      position: "Expert en Développement Logiciel",
      image: "/api/placeholder/200/200"
    },
    {
      id: 4,
      name: "Dr. Samira Tazi",
      position: "Chercheuse en Science des Données",
      image: "/api/placeholder/200/200"
    },
    {
      id: 5,
      name: "Dr. Karim Bennis",
      position: "Professeur en Télécommunications",
      image: "/api/placeholder/200/200"
    },
    {
      id: 6,
      name: "Prof. Leila Moussaoui",
      position: "Experte en Systèmes Embarqués",
      image: "/api/placeholder/200/200"
    }
  ];

  return (
    <div className="bg-blue-800 py-16 px-4 text-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-2">Nos formateurs</h2>
        <p className="text-center mb-12">Des experts pour vous accompagner</p>

        <div className="relative">
          {isLeftVisible && (
            <button 
              onClick={() => scroll("left")} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10"
              aria-label="Précédent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <div 
            ref={formateursRef} 
            className="flex overflow-x-auto scrollbar-hide gap-6 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={checkScrollButtons}
          >
            {formateurs.map((formateur) => (
              <div 
                key={formateur.id} 
                className="min-w-[250px] max-w-[250px] bg-white text-black rounded-lg overflow-hidden flex flex-col items-center text-center p-6 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img 
                    src={formateur.image} 
                    alt={formateur.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{formateur.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{formateur.position}</p>
                <button className="mt-auto bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Lire plus
                </button>
              </div>
            ))}
          </div>
          
          {isRightVisible && (
            <button 
              onClick={() => scroll("right")} 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10"
              aria-label="Suivant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormateursSection;