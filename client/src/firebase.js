// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbVpy1UQ0RxZJ06dmIqrfJrwxjNp7ZRxg",
  authDomain: "badbankcapstoneproject.firebaseapp.com",
  projectId: "badbankcapstoneproject",
  storageBucket: "badbankcapstoneproject.appspot.com",
  messagingSenderId: "636039062237",
  appId: "1:636039062237:web:40c5307d4935579c607134",
  measurementId: "G-WLD0NPL4YX"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider(); 
export {auth , provider};