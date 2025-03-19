import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import logo from "../assets/logo.png"; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="bg-gray-800 text-white py-3 px-6 flex items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center">
        <Link to="/" className="flex-shrink-0">
          <img 
            src={logo} 
            alt="Logo de la Tienda" 
            className="h-8 sm:h-10 mr-4" 
          />
        </Link>
        
        <form onSubmit={handleSearch} className="hidden md:flex ml-10 max-w-xs">
          <div className="relative flex overflow-hidden rounded-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-3 py-1 text-sm text-gray-900 bg-white focus:outline-none rounded-l-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit" 
              className="px-3 bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors rounded-r-full"
            >
              <FiSearch size={16} />
            </button>
          </div>
        </form>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6 ml-auto">
        <Link to="/products" className="hover:text-blue-300 transition-colors font-medium">
          Productos
        </Link>
        {user ? (
          <>
            <Link to="/cart" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <FiShoppingCart size={20} />
              <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {cart.length}
              </span>
            </Link>
            <button 
              onClick={logout} 
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-300 transition-colors font-medium">
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition-colors"
            >
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;