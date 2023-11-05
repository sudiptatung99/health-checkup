// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD65ZBh4NfU7aHk8xm15fMIp3eu64Ic_aE",
  authDomain: "fiery-plate-366010.firebaseapp.com",
  projectId: "fiery-plate-366010",
  storageBucket: "fiery-plate-366010.appspot.com",
  messagingSenderId: "285990333399",
  appId: "1:285990333399:web:78078b3f51739a31033992",
  measurementId: "G-E3WYBTC67G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;