import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbgtgfwY4xt3htpjhpOjpiO4hl43fln0s",
  authDomain: "ujenzihub-45ae2.firebaseapp.com",
  projectId: "ujenzihub-45ae2",
  storageBucket: "ujenzihub-45ae2.firebasestorage.app",
  messagingSenderId: "111518503276",
  appId: "1:111518503276:web:14e8f7dc095334c6206349",
  measurementId: "G-P7F3Q0TK86",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Use `initializeAuth` for React Native apps to set AsyncStorage persistence
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
