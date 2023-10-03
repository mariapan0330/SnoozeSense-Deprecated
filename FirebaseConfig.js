import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjz476Iu-LUly7xC7tOwrpvA8jrZFz24U",
  authDomain: "snoozesense-681af.firebaseapp.com",
  projectId: "snoozesense-681af",
  storageBucket: "snoozesense-681af.appspot.com",
  messagingSenderId: "381149447959",
  appId: "1:381149447959:web:513df9b6bbc9a885051952"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);