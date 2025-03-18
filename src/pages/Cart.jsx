import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeProduct } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-2">
                <span>{item.title} - ${item.price} x {item.quantity}</span>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 border text-center"
                />
                <button onClick={() => handleRemove(item.id)} className="text-red-500">
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;