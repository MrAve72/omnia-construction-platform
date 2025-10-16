import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">
              <Link to="/" className="text-sm font-semibold tracking-tight flex items-center gap-1">
            <span className="text-foreground">Omnia</span>
                <span className="text-foreground/80 font-normal">Construction</span>
              </Link>
            </h3>
            <ul className="space-y-1">
              <li className="flex items-start">
                <p className="text-xs text-gray-500 max-w-xs">
                  Transforming spaces with precision craftsmanship and timeless design.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">Services</h3>
            <ul className="space-y-1">
              <li className="flex items-center">
                <Link to="/#home-improvements" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">Home Improvements</Link>
              </li>
              <li className="flex items-center">
                <Link to="/#handyman-services" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">Handyman Services</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">Company</h3>
            <ul className="space-y-1">
              <li className="flex items-center">
                <Link to="/about" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">About Us</Link>
              </li>
              <li className="flex items-center">
                <Link to="/contact" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">Contact</Link>
              </li>
              <li className="flex items-center">
                <Link to="/booking" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">Book a Consultation</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">Contact</h3>
            <ul className="space-y-1">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-500 text-xs">1155 Ford Rd, Minneapolis, MN, 55426</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <a href="tel:+16128499633" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">612-849-9633</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <a href="mailto:kolbasin.oleksandr@omniaconstructionmn.com" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">kolbasin.oleksandr@omniaconstructionmn.com</a>
              </li>
              <li className="flex items-center">
                <span className="inline-flex items-center h-4 w-4 justify-center mr-2">
                  <span className="text-[10px] font-semibold text-gray-400">#</span>
                </span>
                <span className="text-gray-500 text-xs">License: CR807108</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-3 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
         &copy; {currentYear} Omnia Construction. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <Link to="/terms-conditions" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">
              Terms and Conditions
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/sms-consent-policy" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">
              SMS Consent Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
