import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { KEYS } from "../keys.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: KEYS.APIKEY,
  authDomain: KEYS.AUTHDOMAIN,
  projectId: KEYS.PROJECTID,
  storageBucket: KEYS.STORAGEBUCKET,
  messagingSenderId: KEYS.MESSAGESENDERID,
  appId: KEYS.APPID,
  measurementId: KEYS.MEASUREMENTID,
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const analytics = getAnalytics(FIREBASE_APP);
