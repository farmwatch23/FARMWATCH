 import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-analytics.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAHYjjA42OSzyY0RJSJ866lhehCkXFTqlo",
    authDomain: "farm-watch-34dea.firebaseapp.com",
    projectId: "farm-watch-50535",
    storageBucket: "farm-watch-34dea.firebasestorage.app",
    appId: "1:308074146283:web:931260d540799d5d3cd1ae",
    measurementId: "G-KSW8VBLYT7"
  };
  const photoInput = document.getElementById("cropPhoto");
    const description = document.getElementById("cropDescription");
    const gallery = document.getElementById("updateGallery");

  document.addEventListener("click", function(event) {

    if (event.target.innerText.includes("Buy Now")) {

        let name = prompt("Enter your name:");

        if (!name) return;

        let mobile = prompt("Enter your mobile number:");

        if (!mobile) return;

        let quantity = Number(prompt("How many kg do you want?"));

        if (!Number.isFinite(quantity) || quantity <= 0) {
            alert("Please enter a valid quantity!");
            return;
        }

        let price = 38;
        let total = quantity * price;

        alert(
            "Order Details 🌱\n\n" +
            "Customer: " + name + "\n" +
            "Mobile: " + mobile + "\n" +
            "Quantity: " + quantity + " kg\n" +
            "Price: ₹" + price + "/kg\n" +
            "Total: ₹" + total
        );
    }

}); 
function uploadCrop() {

    
    if (photoInput.files.length === 0) {
        alert("Please select a crop photo!");
        return;
    }

    const file = photoInput.files[0];

    if (!file.type.startsWith("image/")) {
        alert("Please select a valid image!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {

        const card = document.createElement("div");
        card.className = "update-card";

        const image = document.createElement("img");
        image.src = event.target.result;

        const text = document.createElement("p");
        text.textContent = description.value || "New crop update";

        const date = document.createElement("small");
        date.textContent = new Date().toLocaleString();

        card.appendChild(image);
        card.appendChild(text);
        card.appendChild(date);

        gallery.prepend(card);

        photoInput.value = "";
        description.value = "";

        alert("Crop update posted successfully!");
    };

    reader.readAsDataURL(file);
}
function loadPublicCrops() {

    const cropList = document.getElementById("crop-list");

    if (!cropList) return;

    const farmers = JSON.parse(localStorage.getItem("farmers")) || [];

    cropList.innerHTML = "";

    if (farmers.length === 0) {
        cropList.innerHTML = "<p>No crops available yet.</p>";
        return;
    }

    farmers.forEach(function(farmer) {

        if (!farmer.crop) return;

        const card = document.createElement("div");

        card.innerHTML = `
            <h3>${farmer.crop}</h3>
            <p>Farmer: ${farmer.name}</p>
            <p>Village: ${farmer.village}</p>
            <p>Quantity:${farmer.quantity} KG</p>
            <p>Price:${farmer.price} / KG</P>
        `;

        cropList.appendChild(card);

    });
}

loadPublicCrops();