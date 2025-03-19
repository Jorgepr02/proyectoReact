import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import loadingGif from "../assets/skigif.gif";

const Cart = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Usar useEffect para redireccionar de manera segura y manejar la carga
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Desactivar loader cuando tenemos los datos necesarios
    if (cart !== undefined) {
      setLoading(false);
    }
  }, [user, navigate, cart]);

  if (!user) return null;
  
  // Mostrar loader mientras carga inicialmente
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img 
          src={loadingGif}  
          alt="Cargando..." 
          className="w-32 h-32" 
        />
      </div>
    );
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="bg-gray-800/60 rounded-lg p-6 shadow-lg border border-gray-700 text-white">
        <h2 className="text-2xl font-bold mb-6 text-white">Tu Carrito de Compras</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4 flex justify-center">
              <FiShoppingBag />
            </div>
            <p className="text-xl mb-6">Tu carrito está vacío</p>
            <button 
              onClick={() => navigate("/products")} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center mx-auto gap-2"
            >
              <FiArrowLeft /> Ir a productos
            </button>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-5 gap-4 pb-2 border-b border-gray-700 font-semibold text-sm uppercase">
              <div className="col-span-2">Producto</div>
              <div className="text-center">Precio</div>
              <div className="text-center">Cantidad</div>
              <div className="text-right">Total</div>
            </div>
            
            <ul className="divide-y divide-gray-700">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
            
            <div className="mt-8 border-t border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl">Total:</span>
                <span className="text-2xl font-bold text-green-400">${total.toFixed(2)}</span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <button 
                  onClick={() => navigate("/products")} 
                  className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiArrowLeft /> Seguir comprando
                </button>
                
                <button 
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors flex items-center justify-center gap-2"
                  onClick={() => toast.info("Función de pago en desarrollo")}
                >
                  <FiShoppingBag /> Finalizar compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;