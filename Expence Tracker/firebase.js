// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js';
import { getDatabase, ref, push, set, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Export Firebase functions globally so other scripts can use them
window.firebaseDB = {
    database,
    ref,
    push,
    set,
    onValue,
    remove,
    update
};

export {
    database,
    ref,
    push,
    set,
    onValue,
    remove,
    update
};