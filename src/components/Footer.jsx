import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import logo from "../assets/logo.png";

const Footer = () => {
  const address = "Calle de la nieve, Coruña";
  const phone = "+34333666999";
  const email = "contacto@snowshop.com";
  
  // Función para codificar la dirección para Google Maps
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <footer className="bg-gray-800 text-white py-6 px-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="mb-4 md:mb-0">
          <Link to="/">
            <img src={logo} alt="Logo de la Tienda" className="h-10" />
          </Link>
        </div>
        
        {/* Información de contacto con enlaces */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="mb-2">
            <a 
              href={mapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start hover:text-blue-300 transition-colors"
            >
              <MdLocationOn className="mr-1" />
              Dirección: {address}
            </a>
          </p>
          <p className="mb-2">
            <a 
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex items-center justify-center md:justify-start hover:text-blue-300 transition-colors"
            >
              <MdPhone className="mr-1" />
              Teléfono: {phone}
            </a>
          </p>
          <p>
            <a 
              href={`mailto:${email}`}
              className="flex items-center justify-center md:justify-start hover:text-blue-300 transition-colors"
            >
              <MdEmail className="mr-1" />
              Email: {email}
            </a>
          </p>
        </div>
        
        {/* Redes sociales */}
        <div className="flex space-x-4">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            <FaFacebook size={40} />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-pink-400 transition-colors"
          >
            <FaInstagram size={40} />
          </a>
        </div>
      </div>
      
      <div className="text-center mt-4 text-sm text-gray-400">
        © {new Date().getFullYear()} SnowShop. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;