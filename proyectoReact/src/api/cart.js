import { db } from "./firebaseConfig";
import { doc, setDoc, updateDoc, deleteDoc, getDocs, collection } from "firebase/firestore";

// Añadir producto al carrito
export const addToCart = async (userId, product) => {
  try {
    const cartItemRef = doc(db, `carts/${userId}/items`, product.id);
    await setDoc(cartItemRef, { ...product, quantity: 1 }, { merge: true });
  } catch (error) {
    throw error.message;
  }
};

// Obtener el carrito del usuario
export const getCartItems = async (userId) => {
  const querySnapshot = await getDocs(collection(db, `carts/${userId}/items`));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Actualizar cantidad de un producto
export const updateCartItem = async (userId, productId, quantity) => {
  const cartItemRef = doc(db, `carts/${userId}/items`, productId);
  await updateDoc(cartItemRef, { quantity });
};

// Eliminar producto del carrito
export const removeFromCart = async (userId, productId) => {
  const cartItemRef = doc(db, `carts/${userId}/items`, productId);
  await deleteDoc(cartItemRef);
};