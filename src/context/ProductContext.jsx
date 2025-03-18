import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../api/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener productos
  const fetchProducts = async () => {
    try {
      console.log("📦 Cargando productos desde Firestore...");
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log("✅ Productos obtenidos:", productList);
      setProducts(productList);
    } catch (error) {
      console.error("❌ Error obteniendo productos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Agregar un nuevo producto
  const addNewProduct = async (newProduct) => {
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      const addedProduct = { id: docRef.id, ...newProduct };

      setProducts([...products, addedProduct]); // Actualizar estado localmente
      toast.success("Producto agregado correctamente");
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
      toast.error("Error al agregar producto");
    }
  };

  // Actualizar un producto existente 
  const updateProduct = async (id, updatedData) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedData);

      setProducts(products.map(p => (p.id === id ? { ...p, ...updatedData } : p)));
      toast.success("Producto actualizado correctamente");
    } catch (error) {
      console.error("❌ Error al actualizar producto:", error);
      toast.error("Error al actualizar producto");
    }
  };

  // Eliminar un producto 
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));

      setProducts(products.filter(p => p.id !== id));
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      toast.error("Error al eliminar producto");
    }
  };

  useEffect(() => {
    fetchProducts(); // Cargar productos al iniciar la app
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, addNewProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);