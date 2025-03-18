import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Obtener productos
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener producto por id
export const getProductById = async (id) => {
  if (!id) {
    console.error("⛔ ID del producto inválido.");
    return null;
  }

  try {
    console.log("🔎 Buscando producto con ID en Firestore:", id);
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      console.error("❌ Producto no encontrado en Firestore.");
      return null;
    }

    console.log("✅ Producto encontrado:", productSnap.data());
    return { id: productSnap.id, ...productSnap.data() };
  } catch (error) {
    console.error("⚠️ Error al obtener producto:", error);
    return null;
  }
};

// Agregar producto
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return docRef.id;
  } catch (error) {
    throw error.message;
  }
};

// Editar producto
export const updateProduct = async (id, updatedProduct) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedProduct);
  } catch (error) {
    throw error.message;
  }
};

// Eliminar producto
export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
  } catch (error) {
    throw error.message;
  }
};