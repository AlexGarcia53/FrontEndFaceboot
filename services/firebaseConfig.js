import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyDc34YsSZVEtRFRVJLBBt9odZ36BjDnfto",
    authDomain: "faceboot-b393b.firebaseapp.com",
    projectId: "faceboot-b393b",
    storageBucket: "faceboot-b393b.appspot.com",
    messagingSenderId: "313924725474",
    appId: "1:313924725474:web:9b12fe94f5f98b22de4cbb",
    measurementId: "G-9QXQSLDQQM"
};

export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
console.log(storage);

