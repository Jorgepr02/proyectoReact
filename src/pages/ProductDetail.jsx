import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("⛔ ID del producto no válido.");
      toast.error("ID del producto no válido.");
      navigate("/");
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log(`🔍 Buscando producto con ID: ${id}`);
        const fetchedProduct = await getProductById(id);
        if (!fetchedProduct) throw new Error("Producto no encontrado");
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("❌ Error obteniendo producto:", error);
        toast.error(error.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) return <p className="text-center text-gray-500">Cargando producto...</p>;
  if (!product) return <p className="text-center text-red-500">Producto no encontrado</p>;

  const handleAddToCart = () => {
    addProduct(product);
    toast.success("Producto añadido al carrito");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <img src={`http://localhost:5000${product.image}`} alt={product.title} className="w-full h-60 object-cover mt-4" />
      <p className="text-lg text-gray-600">${product.price}</p>
      <p className="mt-2">{product.description}</p>

      {/* Botón de acción: Añadir al carrito o Iniciar sesión */}
      {user ? (
        <button 
          onClick={handleAddToCart} 
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          🛒 Añadir al carrito
        </button>
      ) : (
        <button 
          onClick={() => navigate("/login")} 
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          🔐 Inicia sesión para comprar
        </button>
      )}
    </div>
  );
};

export default ProductDetail;