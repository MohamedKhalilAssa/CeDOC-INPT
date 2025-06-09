import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, Calendar, Users, Star, Award, Check, Brain, Network, Shield, Database, Cloud, Code, Link, Bot, Trophy, GraduationCap, CheckCircle, ArrowRight, Mail } from 'lucide-react';
import HeroSection from '@/Sections/FormatonsPage/FormationHeroSection';
import DomainesSection from '@/Sections/FormatonsPage/DomainesSection';
import FormationStatsSection from '@/Sections/FormatonsPage/StatsSection';   
import ProgrammesSection from '@/Sections/FormatonsPage/ProgrammesSection';  




// Main Formation Page Component
const FormationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <FormationStatsSection />
      <ProgrammesSection />
      <DomainesSection />
    </div>
  );
};

export default FormationPage;