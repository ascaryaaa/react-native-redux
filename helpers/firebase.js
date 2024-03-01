// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_8bKt9x-jhDV-Xp19WmNwM6kpFTO228k",
  authDomain: "react-native-89a4d.firebaseapp.com",
  projectId: "react-native-89a4d",
  storageBucket: "react-native-89a4d.appspot.com",
  messagingSenderId: "356867117204",
  appId: "1:356867117204:web:2f3de35a83a999ac75a481",
  measurementId: "G-KZBECW45XT"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);