// components/StatsSection.tsx
import React, { useEffect } from 'react';

interface StatItemProps {
  number: number;
  text: string;
  isPercentage?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ number, text, isPercentage = false }) => (
  <div className="stats-item p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white text-center shadow-sm hover:shadow-lg transition duration-500 hover:-translate-y-2">
    <div className="text-blue-600 text-3xl md:text-4xl font-bold mb-2 flex justify-center">
      {isPercentage ? (
        <span>{number}%</span>
      ) : (
        <span className="counter" data-target={number}>0</span>
      )}
      {!isPercentage && '+'}
    </div>
    <div className="text-gray-700 font-medium">{text}</div>
    <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
  </div>
);

const StatsSection: React.FC = () => {
  useEffect(() => {
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
      const updateCount = () => {
        const target = 0 //||+(counter.getAttribute('data-target');
        const count = +(counter.textContent || 0);
        
        const inc = target / speed;
        
        if (count < target) {
          counter.textContent = Math.ceil(count + inc).toString();
          setTimeout(updateCount, 1);
        } else {
          counter.textContent = target + '+';
        }
      };
      
      updateCount();
    });
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <StatItem number={50} text="Formations" />
          <StatItem number={120} text="Enseignants experts" />
          <StatItem number={15} text="Partenaires industriels" />
          <StatItem number={90} text="Taux d'insertion" isPercentage />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;