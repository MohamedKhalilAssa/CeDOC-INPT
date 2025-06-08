import { useState, useRef, useEffect } from "react";

const TestimonialsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Farah B",
      position: "",
      avatar: "/api/placeholder/60/60",
      text: "Les cours sont très pratiques, les formateurs sont des experts du domaine. Excellente formation en cybersécurité !"
    },
    {
      id: 2,
      name: "Sarah A",
      position: "Marketing Director",
      avatar: "/api/placeholder/60/60",
      text: "La formation en Cloud Computing m'a permis d'obtenir une certification AWS et un stage dans une grande entreprise !"
    },
    {
      id: 3,
      name: "Iman C",
      position: "Product Manager",
      avatar: "/api/placeholder/60/60",
      text: "Grâce au programme en IA, j'ai pu développer mon propre modèle de détection d'objets pour mon projet de fin d'études."
    },
    {
      id: 4,
      name: "Karim D",
      position: "Security Analyst",
      avatar: "/api/placeholder/60/60",
      text: "La formation en sécurité informatique est très complète et approfondie. L'approche pratique m'a beaucoup aidé."
    },
    {
      id: 5,
      name: "Amal F",
      position: "Software Developer",
      avatar: "/api/placeholder/60/60",
      text: "Le parcours en développement web est parfaitement adapté au marché actuel. J'ai trouvé un emploi immédiatement."
    }
  ];

  // Handle slide change
  const goToSlide = (index: number) => {
    if (slidesRef.current) {
      setActiveSlide(index);
      resetAutoplay();
    }
  };

  // Navigate to next slide
  const nextSlide = () => {
    const newIndex = (activeSlide + 1) % testimonials.length;
    goToSlide(newIndex);
  };

  // Navigate to previous slide
  const prevSlide = () => {
    const newIndex = (activeSlide - 1 + testimonials.length) % testimonials.length;
    goToSlide(newIndex);
  };

  // Set up autoplay
  const startAutoplay = () => {
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  };

  // Reset autoplay after manual interaction
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      startAutoplay();
    }
  };

  // Initialize autoplay on component mount
  useEffect(() => {
    startAutoplay();
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-2">Avis de nos Doctorants</h2>
        <p className="text-center text-gray-600 mb-12">"Nos doctorants témoignent"</p>

        <div className="relative">
          <div 
            ref={slidesRef} 
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* We're showing 3 testimonials at once in a grid, cycling through them */}
                    {[0, 1, 2].map((offset) => {
                      const index = (activeSlide + offset) % testimonials.length;
                      const current = testimonials[index];
                      return (
                        <div 
                          key={current.id} 
                          className="bg-gray-50 p-6 rounded-lg shadow-sm"
                        >
                          <p className="text-gray-700 mb-6">"{current.text}"</p>
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                              <img
                                src={current.avatar}
                                alt={current.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold">{current.name}</h4>
                              {current.position && (
                                <p className="text-gray-600 text-sm">{current.position}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Pagination dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeSlide === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;