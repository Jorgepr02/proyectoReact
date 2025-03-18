import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getCartItems, addToCart, updateCartItem, removeFromCart } from "../api/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      getCartItems(user.uid).then(setCart);
    }
  }, [user]);

  const addProduct = async (product) => {
    if (!user) return;
    await addToCart(user.uid, product);
    setCart(await getCartItems(user.uid));
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    await updateCartItem(user.uid, productId, quantity);
    setCart(await getCartItems(user.uid));
  };

  const removeProduct = async (productId) => {
    if (!user) return;
    await removeFromCart(user.uid, productId);
    setCart(await getCartItems(user.uid));
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, updateQuantity, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);