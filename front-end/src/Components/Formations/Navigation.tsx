// components/Navigation.tsx
import React, { useState } from 'react';

interface NavLinkProps {
  href: string;
  text: string;
  active?: boolean;
}

interface MobileNavLinkProps {
  href: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text, active = false }) => (
  <a href={href} className={`${active ? 'text-blue-900' : 'text-gray-700 hover:text-blue-600'} font-medium px-3 py-2 rounded-md text-sm transition duration-300 relative group`}>
    {text}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, text }) => (
  <a href={href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
    {text}
  </a>
);

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src="https://via.placeholder.com/150x50?text=INPT+Logo" alt="Logo INPT" />
              <span className="ml-3 text-xl font-bold gradient-text hidden md:block">Formations</span>
            </div>
            <div className="hidden md:block ml-12">
              <div className="flex space-x-6">
                <NavLink href="#accueil" text="Accueil" active />
                <NavLink href="#programmes" text="Programmes" />
                <NavLink href="#domaines" text="Domaines" />
                <NavLink href="#certifications" text="Certifications" />
                <NavLink href="#contact" text="Contact" />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="#inscription" className="relative inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full text-sm shadow-lg hover:shadow-xl transition duration-300 group">
              <span className="relative z-10">S'inscrire</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></span>
            </a>
          </div>
          <div className="md:hidden">
            <button 
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div id="mobile-menu" className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
          <MobileNavLink href="#accueil" text="Accueil" />
          <MobileNavLink href="#programmes" text="Programmes" />
          <MobileNavLink href="#domaines" text="Domaines" />
          <MobileNavLink href="#certifications" text="Certifications" />
          <MobileNavLink href="#contact" text="Contact" />
          <a href="#inscription" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800">S'inscrire</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;