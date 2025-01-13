// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore ,collection, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getAuth } from "firebase/auth";

// Your Firebase configuration object (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBmrqsgntNQrtXEcpQZkvY8cCl_0Rr6d8E",
  authDomain: "mdrrmo-libertad.firebaseapp.com",
  projectId: "mdrrmo-libertad-c72e0",
  storageBucket: "mdrrmo-libertad-c72e0.appspot.com",
  appId: "1:97439655519:android:2272a3e095230ee96c5dea",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Realtime Database
const database = getDatabase(app);


const db = getFirestore(app);
// Initialize Firebase Authentication
const auth = getAuth(app);

export { firestore, db ,auth, onSnapshot, collection, getDocs, serverTimestamp };

