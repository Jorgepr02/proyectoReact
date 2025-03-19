import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FiShoppingCart, FiLock } from "react-icons/fi";
import loadingGif from "../assets/skigif.gif";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      toast.error("ID del producto no válido.");
      navigate("/");
      return;
    }

    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        if (!fetchedProduct) throw new Error("Producto no encontrado");
        setProduct(fetchedProduct);
      } catch (error) {
        toast.error(error.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addProduct(product);
    toast.success("Producto añadido al carrito");
  };

  if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <img 
            src={loadingGif}  
            alt="Cargando..." 
            className="w-32 h-32" 
          />
        </div>
      );  }
  
  if (!product) return <p className="text-center text-red-500">Producto no encontrado</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800/60 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <div className="md:flex">
          {/* Imagen del producto */}
          <div className="md:w-1/2 bg-white p-4">
            <div className="h-80 flex items-center justify-center">
              <img 
                src={`http://localhost:5000${product.image}`} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain" 
              />
            </div>
          </div>
          
          {/* Información del producto */}
          <div className="md:w-1/2 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="text-2xl font-bold text-green-400 mb-4">
              ${product.price}
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Descripción:</h2>
              <p className="text-gray-300">{product.description}</p>
            </div>
            
            {/* Botón de acción: Añadir al carrito o Iniciar sesión */}
            {user ? (
              <button 
                onClick={handleAddToCart} 
                className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FiShoppingCart />
                Añadir al carrito
              </button>
            ) : (
              <button 
                onClick={() => navigate("/login")} 
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FiLock />
                Inicia sesión para comprar
              </button>
            )}
            
            <button 
              onClick={() => navigate("/products")} 
              className="w-full mt-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Volver a productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;