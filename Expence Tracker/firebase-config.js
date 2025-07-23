// firebase-config.js

// ✨ ייבוא מהספריות של Firebase מכתובות CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✨ זה האובייקט שהעתקת מפיירבייס - ודא שהוא מעודכן עם הפרטים שלך
const firebaseConfig = {
    apiKey: "AIzaSyCy_VmesGYhb2IW4uiV3ExKVB_wZG6Pol8", // ✨ ודא שזה המפתח שלך
    authDomain: "expensetracker-4d53d.firebaseapp.com", // ✨ ודא שזה הדומיין שלך
    projectId: "expensetracker-4d53d", // ✨ ודא שזה ה-ID של הפרויקט שלך
    storageBucket: "expensetracker-4d53d.appspot.com",
    messagingSenderId: "762926310676",
    appId: "1:762926310676:web:e4c4d24fc3c07ca3b5ce01",
    measurementId: "G-G6SVK4450D" // אם יש לך
};

// ✨ יצירת האפליקציה
const app = initializeApp(firebaseConfig);

// ✨ יצירת שירותי Auth ו-Firestore
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✨ ייצוא לשימוש בקבצים אחרים
export { auth, provider, db };
