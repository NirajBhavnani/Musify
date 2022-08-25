import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjxnjW6fYZPAYJH9MXAt3xik-Zbo0b7-g",
  authDomain: "musify-cf513.firebaseapp.com",
  projectId: "musify-cf513",
  storageBucket: "musify-cf513.appspot.com",
  messagingSenderId: "781494405324",
  appId: "1:781494405324:web:3027d9c7004fe946be1a69",
};

//  init firebase
firebase.initializeApp(firebaseConfig);

// init services
const firestore = firebase.firestore();
const auth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firestore, auth, timestamp };
