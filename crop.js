import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import {
getAuth,
createUserWithEmailAndPassword,
updateProfile,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzEciHKeJzZmihMWsZVYvh4jNz-OrspVA",
    authDomain: "farm-watch-50535.firebaseapp.com",
    projectId: "farm-watch-50535",
    storageBucket: "farm-watch-50535.firebasestorage.app",
    messagingSenderId: "695242174342",
    appId: "1:695242174342:web:5bf655f5096acaa3b14607",
    measurementId: "G-731TSKEK9W"
};

// Initialize Firebase (only once) 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Customer Registration
const customerForm = document.getElementById("customerForm");

customerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const mobile = document.getElementById("customerMobile").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const password = document.getElementById("customerPassword").value;
    const message = document.getElementById("customerMessage");

    const button = customerForm.querySelector("button");

    if (!/^[0-9]{10}$/.test(mobile)) {
        message.textContent = "Enter a valid 10-digit mobile number.";
        return;
    }
    if (password.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        return;
    }

    try {
        button.disabled = true;
        message.textContent = "Registering...";

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: name
        });
        await updateProfile(userCredential.user,{
            displayName:name
        });
        message.textContent = "Registration successful!";
message.style.color = "green";

customerForm.reset();

} catch (error) {
    console.error("Registration error:", error);
    message.textContent = error.message;
    message.style.color = "red";

} finally {
    button.disabled = false;
}

});
// Customer Login

const customerLoginForm = document.getElementById("customerLoginForm");

customerLoginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        message.textContent = "Login successful! Welcome to Farmwatch.";
        message.style.color = "green";

        console.log("Logged in user:", userCredential.user);
        window.location.href="customer-dashboard.html"

    } catch (error) {

        console.error("Login error:", error);

        message.textContent = error.message;
        message.style.color = "red";

    }

});
