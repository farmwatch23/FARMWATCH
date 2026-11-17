import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Show customer details, or redirect if not logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("customerName").textContent =
      user.displayName || "Customer";
    document.getElementById("customerEmail").textContent = user.email;
  } else {
    window.location.href = "customer.html";
  }
});

// Logout
window.logout = async function () {
  await signOut(auth);
  window.location.href = "customer.html";
};

// Navigate to a crop's products page
window.exploreCrop = (crop) => {
  window.location.href = "crop-products.html?crop=" + encodeURIComponent(crop);
};

// Live crop list
const list = document.getElementById("cropList");

onSnapshot(collection(db, "crops"), (snap) => {
  list.innerHTML = "";
  snap.forEach((docSnap) => {
    const c = docSnap.data();
    list.innerHTML += `
      <div class="crop-card">
        <h3>${c.name}</h3>
        <p>₹${c.price} / kg · ${c.quantity} kg</p>
        <p>Farmer: ${c.farmerName}</p>
        <p>${c.location}</p>
      </div>`;
  });
});