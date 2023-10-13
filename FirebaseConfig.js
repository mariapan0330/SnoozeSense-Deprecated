import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { KEYS } from "./keys";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: KEYS.APIKEY,
  authDomain: KEYS.AUTHDOMAIN,
  projectId: KEYS.PROJECTID,
  storageBucket: KEYS.STORAGEBUCKET,
  messagingSenderId: KEYS.MESSAGESENDERID,
  appId: KEYS.APPID,
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
