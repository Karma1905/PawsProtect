// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // import storage

const firebaseConfig = {
  apiKey: "AIzaSyBWRWl2UqCSzmuxIUq-A4racy7o4GE7ZpQ",
  authDomain: "pawsprotect-d7427.firebaseapp.com",
  projectId: "pawsprotect-d7427",
  storageBucket: "pawsprotect-d7427.appspot.com", 
  messagingSenderId: "185053673689",
  appId: "1:185053673689:web:00c16dffac92fa3b8926c8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // initialize storage

export {
  auth,
  db,
  storage, // export storage
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};
