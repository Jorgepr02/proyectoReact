import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeProduct } = useCart();

  return (
    <li className="flex justify-between items-center border-b py-2">
      <span>{item.title} - ${item.price}</span>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
        className="w-16 border text-center"
      />
      <button
        onClick={() => removeProduct(item.id)}
        className="text-red-500"
      >
        ❌
      </button>
    </li>
  );
};

export default CartItem;