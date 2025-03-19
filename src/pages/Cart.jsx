import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { useEffect } from "react";

const Cart = () => {
  const { cart, updateQuantity, removeProduct } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Usar useEffect para redireccionar de manera segura
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    } else {
      removeProduct(productId);
      toast.info("Producto eliminado");
    }
  };

  const handleRemove = (productId) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto del carrito?")) {
      removeProduct(productId);
      toast.success("Producto eliminado del carrito");
    }
  };

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
                <li key={item.id} className="py-4 grid md:grid-cols-5 gap-4 items-center">
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={`http://localhost:5000${item.image}`} 
                        alt={item.title} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <span className="text-white font-medium">{item.title}</span>
                  </div>
                  
                  <div className="text-center text-gray-300">${item.price}</div>
                  
                  <div className="flex justify-center">
                    <div className="flex border border-gray-600 rounded-md">
                      <button 
                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 border-r border-gray-600 hover:bg-gray-700"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 text-center bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 border-l border-gray-600 hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end">
                    <span className="font-bold md:mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      onClick={() => handleRemove(item.id)} 
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Eliminar producto"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </li>
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