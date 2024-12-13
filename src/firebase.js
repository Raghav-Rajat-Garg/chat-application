// Import the functions you need from the SDKs you need
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Add any other services you need
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase configuration

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-p_TQ1eCQl5_7BDEAV7QAQZgsyLyqOW0",
  authDomain: "chat-application-d346a.firebaseapp.com",
  databaseURL: "https://chat-application-d346a-default-rtdb.firebaseio.com",
  projectId: "chat-application-d346a",
  storageBucket: "chat-application-d346a.firebasestorage.app",
  messagingSenderId: "470776721205",
  appId: "1:470776721205:web:529d8e4477589348eb667c",
  measurementId: "G-2Z9K65V18F"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase services
  const auth = getAuth(app);
  
  export { app, auth };
  export const db = getFirestore(app)