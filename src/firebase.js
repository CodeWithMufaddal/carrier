// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyAAdYfukmXvyBesVWOeW5XimutnvBv8WyM",
   authDomain: "hatsoffdigital-career.firebaseapp.com",
   projectId: "hatsoffdigital-career",
   storageBucket: "gs://hatsoffdigital-career.appspot.com/",
   // storageBucket: "hatsoffdigital-career.appspot.com",
   messagingSenderId: "479549320378",
   appId: "1:479549320378:web:2e1e7a81ad7f975ad0a683",
   measurementId: "G-G4V2TGETTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app, 'gs://hatsoffdigital-career.appspot.com/');
// const BannerRef = ref(storage, 'BannerImg');

export default storage;


