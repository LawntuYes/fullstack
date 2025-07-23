// firebase-config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // ← Add this for Realtime DB

const firebaseConfig = {
    apiKey: "AIzaSyCy_VmesGYhb2IW4uiV3ExKVB_wZG6Pol8",
    authDomain: "expensetracker-4d53d.firebaseapp.com",
    projectId: "expensetracker-4d53d",
    storageBucket: "expensetracker-4d53d.firebasestorage.app",
    messagingSenderId: "762926310676",
    appId: "1:762926310676:web:e4c4d24fc3c07ca3b5ce01",
    measurementId: "G-G6SVK4450D",
    databaseURL: "https://expensetracker-4d53d-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
