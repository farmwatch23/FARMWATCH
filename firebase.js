import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAzEciHKeJzZmihMWsZVYvh4jNz-OrspVA",
    authDomain: "farm-watch-50535.firebaseapp.com",
    projectId: "farm-watch-50535",
    storageBucket: "farm-watch-50535.firebasestorage.app",
    messagingSenderId: "695242174342",
    appId: "1:695242174342:web:5bf655f5096acaa3b14607",
    measurementId: "G-731TSKEK9W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);