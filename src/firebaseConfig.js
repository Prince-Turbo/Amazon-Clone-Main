import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFJyLzsHDXpJjWESSmDwckYYermpIG240",
  authDomain: "amzn-clone-desndev.firebaseapp.com",
  projectId: "amzn-clone-desndev",
  storageBucket: "amzn-clone-desndev.appspot.com",
  messagingSenderId: "332067590431",
  appId: "1:332067590431:web:e474aedfbe6fa57b02202a",
  measurementId: "G-ZZ12HGD224",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
