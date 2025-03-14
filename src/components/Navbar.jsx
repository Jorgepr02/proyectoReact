import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="text-lg font-bold">Tienda</Link>
      <div className="flex gap-4">
        <Link to="/products">Productos</Link>
        {user ? (
          <>
            <Link to="/cart">
              <FiShoppingCart size={20} /> ({cart.length})
            </Link>
            <button onClick={logout} className="text-red-400">Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;