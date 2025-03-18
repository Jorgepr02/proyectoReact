import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../assets/logo.png"; // Importa el logo

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-gray-800 text-white py-3 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
      <Link to="/" className="flex items-center">
        <img 
          src={logo} 
          alt="Logo de la Tienda" 
          className="h-10 mr-2" 
        />
      </Link>
      <div className="flex items-center gap-6">
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