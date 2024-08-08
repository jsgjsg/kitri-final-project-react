// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBauTQ52Qfeyh1WctOZBpzQpL-R_6VZk08",
  authDomain: "kitri-final-project.firebaseapp.com",
  projectId: "kitri-final-project",
  storageBucket: "kitri-final-project.appspot.com",
  messagingSenderId: "9237902339",
  appId: "1:9237902339:web:7f0c5431d86b1b55efca36",
  measurementId: "G-T0GEPG1NHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
