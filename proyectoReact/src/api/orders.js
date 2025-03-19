import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

// Crear una orden
export const createOrder = async (userId, cartItems) => {
    try {
        const orderData = {
            userId,
            items: cartItems,
            createdAt: new Date(),
        };
        const docRef = await addDoc(collection(db, "orders"), orderData);
        return docRef.id;
    } catch (error) {
        throw error.message;
    }
};

// Obtener todas las órdenes del usuario
export const getUserOrders = async (userId) => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    return querySnapshot.docs
        .filter((doc) => doc.data().userId === userId)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Obtener detalles de una orden
export const getOrderById = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
        return { id: orderSnap.id, ...orderSnap.data() };
    } else {
        throw new Error("Orden no encontrada");
    }
};