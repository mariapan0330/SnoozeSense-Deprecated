import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { KEY } from "../key";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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
const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_AUTH = auth;
const db = getFirestore(FIREBASE_APP);
export const FIREBASE_DB = db;
console.log('Is Firestore initialized?', FIREBASE_DB ? 'Yes' : 'No');

