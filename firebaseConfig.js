// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd18TiQ0LC0GQDEAv8LgTbFtYwVVjkeDU",
  authDomain: "neologism-4c173.firebaseapp.com",
  databaseURL: "https://neologism-4c173-default-rtdb.firebaseio.com",
  projectId: "neologism-4c173",
  storageBucket: "neologism-4c173.appspot.com",
  messagingSenderId: "994470905479",
  appId: "1:994470905479:web:ea7e174ccfbe33d3f55a22",
  measurementId: "G-9QRW5YX79M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebase_db = getDatabase(app);