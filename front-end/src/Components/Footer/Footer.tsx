// import appConfig from "@/public/config";
import { FC } from "react";
import FooterLink from "./FooterLink";
import FooterLinkGroup from "./FooterLinkGroup";

const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-white">CEDoc INPT</span>
            </div>
            <p className="text-sm mb-6">
              Le Centre des Études Doctorales de l'INPT forme les chercheurs de
              demain à travers des programmes d'excellence en sciences et
              technologies.
            </p>
            <div className="flex space-x-4">
              {["facebook-f", "twitter", "linkedin-in", "youtube"].map(
                (icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                )
              )}
            </div>
          </div>

          <FooterLinkGroup title="Navigation">
            <FooterLink path="/" label="Accueil" />
            <FooterLink path="#programmes" label="Programmes" />
            <FooterLink path="#recherche" label="Recherche" />
            <FooterLink path="#admission" label="Admission" />
            <FooterLink path="#contact" label="Contact" />
          </FooterLinkGroup>

          <FooterLinkGroup title="Ressources">
            <FooterLink path="#" label="Portail recherche" />
            <FooterLink path="#" label="Bibliothèque" />
            <FooterLink path="#" label="Annuaire des enseignants" />
            <FooterLink path="#" label="Guide du doctorant" />
            <FooterLink path="#" label="FAQ" />
          </FooterLinkGroup>

          <FooterLinkGroup title="Légal">
            <FooterLink path="#" label="Mentions légales" />
            <FooterLink path="#" label="Confidentialité" />
            <FooterLink path="#" label="Accessibilité" />
            <FooterLink path="#" label="Plan du site" />
          </FooterLinkGroup>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Centre des Études Doctorales - INPT.
              Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0">
              <button
                onClick={scrollToTop}
                className="text-sm hover:text-white transition duration-300 cursor-pointer"
              >
                Retour en haut ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
