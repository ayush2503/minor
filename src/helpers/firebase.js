// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9URwcwzZtJmZjNSryno1Hg07PJ002KH4",
  authDomain: "minor-89220.firebaseapp.com",
  projectId: "minor-89220",
  storageBucket: "minor-89220.appspot.com",
  messagingSenderId: "872674625196",
  appId: "1:872674625196:web:f674026ef641bc07404109",
  measurementId: "G-GW73Y55H7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);