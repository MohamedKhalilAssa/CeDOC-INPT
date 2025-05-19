import { useEffect } from "react";

const StatsSection = () => {
  // Function to animate counters
  const animateCounters = () => {
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter: Element) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      let count = 0;
      const updateCounter = () => {
        const increment = target / 100;
        if (count < target) {
          count += increment;
          (counter as HTMLElement).innerText = Math.ceil(count).toString();
          requestAnimationFrame(updateCounter);
        } else {
          (counter as HTMLElement).innerText = target.toString();
        }
      };
      updateCounter();
    });
  };

  useEffect(() => {
    animateCounters();
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="stats-item p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white text-center shadow-sm hover:shadow-lg transition duration-500 hover:-translate-y-2">
            <div className="text-blue-600 text-3xl md:text-4xl font-bold mb-2 flex justify-center">
              <span className="counter" data-target="150">0</span>+
            </div>
            <div className="text-gray-700 font-medium">Doctorants</div>
            <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>
          <div className="stats-item p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white text-center shadow-sm hover:shadow-lg transition duration-500 hover:-translate-y-2">
            <div className="text-blue-600 text-3xl md:text-4xl font-bold mb-2 flex justify-center">
              <span className="counter" data-target="40">0</span>+
            </div>
            <div className="text-gray-700 font-medium">Enseignants-chercheurs</div>
            <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>
          <div className="stats-item p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white text-center shadow-sm hover:shadow-lg transition duration-500 hover:-translate-y-2">
            <div className="text-blue-600 text-3xl md:text-4xl font-bold mb-2 flex justify-center">
              <span className="counter" data-target="25">0</span>+
            </div>
            <div className="text-gray-700 font-medium">Laboratoires</div>
            <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>
          <div className="stats-item p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white text-center shadow-sm hover:shadow-lg transition duration-500 hover:-translate-y-2">
            <div className="text-blue-600 text-3xl md:text-4xl font-bold mb-2">10M+ DH</div>
            <div className="text-gray-700 font-medium">Financement recherche</div>
            <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
