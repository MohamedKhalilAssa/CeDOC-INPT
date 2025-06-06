import { useState } from "react";

const SearchFormationsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [thematicFilter, setThematicFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  // Mock data for formations
  const formations = [
    {
      id: 1,
      title: "Intelligence Artificielle",
      image: "/api/placeholder/400/240",
      isNew: true,
      thematic: "Intelligence Artificielle",
      icon: "🧠",
      description: "Recherche avancée en deep learning, vision par ordinateur et traitement automatique du langage naturel"
    },
    {
      id: 2,
      title: "Télécommunications",
      image: "/api/placeholder/400/240",
      isNew: false,
      thematic: "Télécommunications",
      icon: "📡",
      description: "Recherche de pointe sur les réseaux 5G/6G et les systèmes de communication sans fil"
    },
    {
      id: 3,
      title: "Cybersécurité",
      image: "/api/placeholder/400/240",
      isNew: false,
      thematic: "Cybersécurité",
      icon: "🔒",
      description: "Études avancées en cryptographie, sécurité des réseaux et forensic numérique"
    },
    {
      id: 4,
      title: "Intelligence Artificielle Avancée",
      image: "/api/placeholder/400/240",
      isNew: true,
      thematic: "Intelligence Artificielle",
      icon: "🧠",
      description: "Recherche avancée en deep learning, vision par ordinateur et traitement automatique du langage naturel"
    },
    {
      id: 5,
      title: "Réseaux et Télécommunications",
      image: "/api/placeholder/400/240",
      isNew: false,
      thematic: "Télécommunications",
      icon: "📡",
      description: "Recherche de pointe sur les réseaux 5G/6G et les systèmes de communication sans fil"
    },
    {
      id: 6,
      title: "Sécurité des Systèmes",
      image: "/api/placeholder/400/240",
      isNew: false,
      thematic: "Cybersécurité",
      icon: "🔒",
      description: "Études avancées en cryptographie, sécurité des réseaux et forensic numérique"
    },
        {
      id: 6,
      title: "Sécurité des Systèmes",
      image: "/api/placeholder/400/240",
      isNew: false,
      thematic: "Cybersécurité",
      icon: "🔒",
      description: "Études avancées en cryptographie, sécurité des réseaux et forensic numérique"
    },
        {
      id: 6,
      title: "Sécurité des Systèmes",
      image: "/api/placeholder/400/240",
      isNew: false,
      thematic: "Cybersécurité",
      icon: "🔒",
      description: "Études avancées en cryptographie, sécurité des réseaux et forensic numérique"
    },
        {
      id: 6,
      title: "Sécurité des Systèmes",
      image: "/api/placeholder/400/240",
      isNew: false,
      thematic: "Cybersécurité",
      icon: "🔒",
      description: "Études avancées en cryptographie, sécurité des réseaux et forensic numérique"
    },
        {
      id: 6,
      title: "Sécurité des Systèmes",
      image: "/api/placeholder/400/240",
      isNew: false,
      thematic: "Cybersécurité",
      icon: "🔒",
      description: "Études avancées en cryptographie, sécurité des réseaux et forensic numérique"
    },
        {
      id: 6,
      title: "Sécurité des Systèmes",
      image: "/api/placeholder/400/240",
      isNew: false,
      thematic: "Cybersécurité",
      icon: "🔒",
      description: "Études avancées en cryptographie, sécurité des réseaux et forensic numérique"
    },
  ];

  // Mock thematic options for filter
  const thematicOptions = [
    { value: "", label: "Thématique" },
    { value: "ia", label: "Intelligence Artificielle" },
    { value: "dev", label: "Développement" },
    { value: "cyber", label: "Cybersécurité" },
    { value: "telecom", label: "Télécommunications" },
  ];

  // Mock category options for filter
  const categoryOptions = [
    { value: "", label: "Catégorie" },
    { value: "formation", label: "Formation Continue" },
    { value: "certification", label: "Certification" },
    { value: "workshop", label: "Workshop" },
  ];

  // Simple pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(formations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFormations = formations.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({
      top: document.getElementById("search-formations")?.offsetTop || 0,
      behavior: "smooth"
    });
  };

  return (
    <div id="search-formations" className="py-16 px-4 bg-blue-50/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-2">NOS FORMATIONS</h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Explorer nos formations et trouver celle qui répond le mieux à 
          vos objectifs professionnels. Filtrez par domaine, durée, et 
          niveau d'expertise pour choisir le programme qui vous 
          convient le mieux.
        </p>

        {/* Search and filter bar */}
        <div className="bg-blue-800 p-4 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white pl-4 pr-10 py-3 rounded-md border-0 focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <select
              className="bg-white py-3 px-4 rounded-md border-0 text-gray-700 focus:ring-2 focus:ring-blue-500"
              value={thematicFilter}
              onChange={(e) => setThematicFilter(e.target.value)}
            >
              {thematicOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              className="bg-white py-3 px-4 rounded-md border-0 text-gray-700 focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Formations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentFormations.map((formation) => (
            <div key={formation.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={formation.image} 
                  alt={formation.title} 
                  className="w-full h-[180px] object-cover"
                />
                {formation.isNew && (
                  <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">
                    Nouveau!
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-2">{formation.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm">
                    {formation.icon}
                  </span>
                  <span className="text-blue-800 text-sm font-medium">{formation.thematic}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {formation.description}
                </p>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  En savoir plus
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            // Show current page, first, last, and adjacent pages
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-8 h-8 flex items-center justify-center rounded ${
                    currentPage === pageNumber
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-800 hover:bg-blue-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              (pageNumber === currentPage - 2 && currentPage > 3) ||
              (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return (
                <span key={pageNumber} className="px-1">
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFormationsSection;