import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, Navigation, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    sujet: '',
    message: '',
    consentement: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Une Question ?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Notre équipe se tient à votre disposition pour toute information sur nos programmes doctoraux.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Informations de contact</h2>
                
                <div className="space-y-6" onSubmit={handleSubmit}>
                  <div className="flex items-start group">
                    <div className="bg-blue-100 p-4 rounded-xl mr-4 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                      <MapPin className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Adresse</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Centre des Études Doctorales - INPT<br />
                        Avenue Mohammed Ben Abdallah Regragui,<br />
                        Madinat Al Irfane, Rabat
                      </p>
                      <button className="inline-flex items-center text-blue-600 mt-3 text-sm font-medium hover:text-blue-700 transition-colors">
                        <Navigation className="mr-2 w-4 h-4" />
                        Voir sur la carte
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-blue-100 p-4 rounded-xl mr-4 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                      <Mail className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Email</h4>
                      <p className="text-gray-600">ced@inpt.ac.ma</p>
                      <a 
                        href="mailto:ced@inpt.ac.ma" 
                        className="inline-flex items-center text-blue-600 mt-3 text-sm font-medium hover:text-blue-700 transition-colors"
                      >
                        <Send className="mr-2 w-4 h-4" />
                        Envoyer un email
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-blue-100 p-4 rounded-xl mr-4 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                      <Phone className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Téléphone</h4>
                      <p className="text-gray-600">+212 5 37 77 88 99</p>
                      <a 
                        href="tel:+212537778899" 
                        className="inline-flex items-center text-blue-600 mt-3 text-sm font-medium hover:text-blue-700 transition-colors"
                      >
                        <Phone className="mr-2 w-4 h-4" />
                        Appeler maintenant
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-blue-100 p-4 rounded-xl mr-4 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                      <Clock className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Horaires</h4>
                      <p className="text-gray-600">Du lundi au vendredi : 9h00 - 17h00</p>
                      <p className="text-gray-500 text-sm mt-1">Fermé les week-ends et jours fériés</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <h4 className="font-bold text-gray-900 text-xl mb-6">Suivez-nous</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transform hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center hover:bg-blue-900 transform hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transform hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input 
                      type="text" 
                      id="prenom" 
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 hover:border-gray-400" 
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input 
                      type="text" 
                      id="nom" 
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 hover:border-gray-400" 
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 hover:border-gray-400" 
                  />
                </div>
                
                <div>
                  <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select 
                    id="sujet" 
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 hover:border-gray-400"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="admission">Admission doctorale</option>
                    <option value="programme">Information sur les programmes</option>
                    <option value="recherche">Opportunités de recherche</option>
                    <option value="financement">Financement et bourses</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 hover:border-gray-400 resize-none"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>
                
                <div className="flex items-start">
                  <input 
                    id="consentement" 
                    name="consentement" 
                    type="checkbox"
                    checked={formData.consentement}
                    onChange={handleInputChange}
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1" 
                  />
                  <label htmlFor="consentement" className="ml-3 block text-sm text-gray-700 leading-relaxed">
                    J'accepte que mes données soient traitées conformément à la 
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline ml-1">
                      politique de confidentialité
                    </a>. *
                  </label>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="relative w-full inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold rounded-lg shadow-lg group bg-gradient-to-r from-blue-600 to-blue-800 text-white transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-blue-900 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                    <span className="relative z-10 flex items-center">
                      <Send className="mr-3 w-5 h-5" />
                      Envoyer le message
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;