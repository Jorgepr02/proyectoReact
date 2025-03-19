import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addProduct } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (product.id) {
      navigate(`/product/${product.id}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita que el clic se propague a la tarjeta
    
    if (!user) {
      toast.info("Debes iniciar sesión para añadir productos al carrito");
      navigate("/login");
      return;
    }
    
    addProduct(product);
    toast.success("Producto añadido al carrito");
  };

  return (
    <div 
      className="p-4 bg-gray-800 rounded shadow cursor-pointer transition-transform hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="h-48 bg-gray-100 flex items-center justify-center mb-2 rounded overflow-hidden">
        <img 
          src={`http://localhost:5000${product.image}`} 
          alt={product.title} 
          className="w-full h-auto max-h-full object-contain" 
        />
      </div>
      <h3 className="text-lg text-white font-medium">{product.title}</h3>
      <p className="text-gray-400 font-bold mb-2">${product.price}</p>
      {product.id ? (
        <button 
          onClick={handleAddToCart} 
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
        >
          Añadir al carrito
        </button>
      ) : (
        <p className="text-red-500">Producto no disponible</p>
      )}
    </div>
  );
};

export default ProductCard;