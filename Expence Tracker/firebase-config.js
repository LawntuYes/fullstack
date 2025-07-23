// firebase-config.js

// ✨ ייבוא מהספריות של Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✨ זה האובייקט שהעתקת מפיירבייס
const firebaseConfig = {
    apiKey: "AIzaSyCy_VmesGYhb2IW4uiV3ExKVB_wZG6Pol8",
    authDomain: "expensetracker-4d53d.firebaseapp.com",
    projectId: "expensetracker-4d53d",
    storageBucket: "expensetracker-4d53d.appspot.com",
    messagingSenderId: "762926310676",
    appId: "1:762926310676:web:e4c4d24fc3c07ca3b5ce01",
    measurementId: "G-G6SVK4450D"
};

// ✨ יצירת האפליקציה
const app = initializeApp(firebaseConfig);

// ✨ יצירת שירותי Auth ו-Firestore
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✨ ייצוא לשימוש בקבצים אחרים
export { auth, provider, db };
