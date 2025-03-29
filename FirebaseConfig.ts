// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPVg8fSCI_a-Z1G707rLWHWyycPUEVz7s",
    authDomain: "sort-4-words.firebaseapp.com",
    projectId: "sort-4-words",
    storageBucket: "sort-4-words.firebasestorage.app",
    messagingSenderId: "14885826105",
    appId: "1:14885826105:web:b31296db4748e1bde9e7e8",
    measurementId: "G-F3X4CW06PT"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);