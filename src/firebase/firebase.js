// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Importa Firestore

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-eXk5o3DgAaFxP41h6k3DGPOOS8Bt-vY",
  authDomain: "soulanimal-9b250.firebaseapp.com",
  projectId: "soulanimal-9b250",
  storageBucket: "soulanimal-9b250.firebasestorage.app",
  messagingSenderId: "983945896968",
  appId: "1:983945896968:web:420184368739cb6be69dbd",
  measurementId: "G-P3G9PXFDJ9",
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la autenticación de Firebase
const auth = getAuth(app);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta tanto la autenticación como Firestore
export { auth, db, addDoc, collection };
