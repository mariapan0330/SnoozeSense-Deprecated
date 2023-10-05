import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { KEYS } from "./keys";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
/*
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
*/

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
const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_AUTH = auth;
