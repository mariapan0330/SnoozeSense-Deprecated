import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { KEY } from "./key";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: KEY.APIKEY,
  authDomain: KEY.AUTHDOMAIN,
  projectId: KEY.PROJECTID,
  storageBucket: KEY.STORAGEBUCKET,
  messagingSenderId: KEY.MESSAGESENDERID,
  appId: KEY.APPID,
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
