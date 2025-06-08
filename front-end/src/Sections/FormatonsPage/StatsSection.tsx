import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, Calendar, Users, Star, Award, Check, Brain, Network, Shield, Database, Cloud, Code, Link, Bot, Trophy, GraduationCap, CheckCircle, ArrowRight, Mail } from 'lucide-react';


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
export default StatsSection;