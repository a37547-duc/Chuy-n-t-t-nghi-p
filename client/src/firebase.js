// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzJgWNxIv0pGh9IWn0jdbaRtvXSbIW_as",
  authDomain: "chuyendetn-43b4d.firebaseapp.com",
  projectId: "chuyendetn-43b4d",
  storageBucket: "chuyendetn-43b4d.appspot.com",
  messagingSenderId: "935108413740",
  appId: "1:935108413740:web:84f0867286e7558aaa0489",
  measurementId: "G-X1E717W0BQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);
export { storage };