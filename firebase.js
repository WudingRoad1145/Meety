import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  ref as databaseRef,
  set as databaseSet,
  onValue as databaseOnValue,
  get as databaseGet,
  child as databaseChild,
  off as databaseOff,
  query as databaseQuery,
  orderByChild,
  equalTo,
} from "firebase/database";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  query as firestoreQuery,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8kuzkQ265v-TV6V90lhjhchynLFcRQhE",
  authDomain: "meety-d37b4.firebaseapp.com",
  databaseURL: "https://meety-d37b4-default-rtdb.firebaseio.com",
  projectId: "meety-d37b4",
  storageBucket: "meety-d37b4.appspot.com",
  messagingSenderId: "830145008574",
  appId: "1:830145008574:web:fe04e04c49c3aa08c0dfef"
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export {
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  database,
  databaseRef,
  databaseSet,
  databaseOnValue,
  databaseGet,
  databaseChild,
  databaseOff,
  databaseQuery,
  orderByChild,
  equalTo,
  firestore,
  collection,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  serverTimestamp,
  firestoreQuery,
  orderBy,
};

