import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "well-wood.firebaseapp.com",
  projectId: "well-wood",
  storageBucket: "well-wood.firebasestorage.app",
  messagingSenderId: "1083592219700",
  appId: "1:1083592219700:web:52706e73c9f037f1373e61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);