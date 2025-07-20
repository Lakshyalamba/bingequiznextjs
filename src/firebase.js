// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Replace these with your actual Firebase config values
const firebaseConfig = {
    apiKey: "AIzaSyATE961UglfdUnWXgScx9e1nif_wWFYR1g",
    authDomain: "bingequiz-b9c8b.firebaseapp.com",
    projectId: "bingequiz-b9c8b",
    storageBucket: "bingequiz-b9c8b.firebasestorage.app",
    messagingSenderId: "271408171793",
    appId: "1:271408171793:web:262d26c8c8cf76b5089ab0",
    measurementId: "G-R5RTFECB2R"
  };
// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Auth service
export const auth = getAuth(app);
