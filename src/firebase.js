// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDttqNxCC3BtG-C7NWKgWCGFeBb8_fuBv4",
  authDomain: "disney-plus-clone-7ada7.firebaseapp.com",
  projectId: "disney-plus-clone-7ada7",
  storageBucket: "disney-plus-clone-7ada7.appspot.com",
  messagingSenderId: "745059919429",
  appId: "1:745059919429:web:07523354228294c042652c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;