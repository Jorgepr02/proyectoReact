import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUIyyIFU1IqxXYutzd953vD13OJqVOLzc",
  authDomain: "proyecto-react-17896.firebaseapp.com",
  projectId: "proyecto-react-17896",
  storageBucket: "proyecto-react-17896.firebasestorage.app",
  messagingSenderId: "825492352958",
  appId: "1:825492352958:web:a282ed38f65363c361d3ef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);