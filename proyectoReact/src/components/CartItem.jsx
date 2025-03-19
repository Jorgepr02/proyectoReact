import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeProduct } = useCart();

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

  return (
    <li className="py-4 grid md:grid-cols-5 gap-4 items-center">
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
  );
};

export default CartItem;