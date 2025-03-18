import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// Registro de usuario con correo y contraseña
export const registerUser = async (email, password, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Perfil de usuario en Authentication de Firebase :)
    await updateProfile(user, { displayName: additionalData.username });

    await setDoc(doc(db, "users", user.uid), {
      username: additionalData.username,
      firstName: additionalData.firstName,
      lastName: additionalData.lastName,
      email: email,
      birthDate: additionalData.birthDate,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Inicio de sesión con correo y contraseña
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Hubo un error al iniciar sesión", error);
    
    throw error.message;
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Hubo un error al cerrar la sesión", error);
    throw error.message;
  }
};

// Iniciar sesión con Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Hubo un error al iniciar sesión con Google", error);
    throw error.message;
  }
};

// Detectar usuario autenticado
export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};