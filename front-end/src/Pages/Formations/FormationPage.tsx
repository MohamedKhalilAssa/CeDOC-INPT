// FormationsPage.js
import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ProgrammesSection from './components/ProgrammesSection';
import DomainesSection from './components/DomainesSection';
import CertificationsSection from './components/CertificationsSection';
import InscriptionSection from './components/InscriptionSection';
import TemoignagesSection from './components/TemoignagesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function FormationsPage() {
  return (
    <div className="bg-gray-50">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <ProgrammesSection />
      <DomainesSection />
      <CertificationsSection />
      <InscriptionSection />
      <TemoignagesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default FormationsPage;

// Additional component needed for the top banner as seen in image 3
const TopBanner = () => {
  return (
    <div className="w-full bg-blue-800 text-white py-16 px-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Développez vos compétences,<br />
          maîtrisez les technologies de<br />
          demain !
        </h1>
        <p className="text-lg mb-8 max-w-3xl">
          Nos formations couvrent les domaines les plus innovants : développement logiciel, intelligence
          artificielle, réseaux, cybersécurité et bien plus encore. Accompagné par des experts, accédez à un
          enseignement de qualité et propulsez votre carrière vers l'excellence.
        </p>
        <div className="flex flex-wrap gap-8 mt-10 justify-between max-w-2xl">
          <div className="text-center">
            <div className="text-4xl font-bold">+100</div>
            <div className="uppercase tracking-wider">Formations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">+10</div>
            <div className="uppercase tracking-wider">Thématiques</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">+50</div>
            <div className="uppercase tracking-wider">Formateurs</div>
          </div>
        </div>
        <button className="mt-8 bg-white text-blue-800 font-medium px-6 py-2 rounded-full flex items-center gap-2">
          <span>Découvrir</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};