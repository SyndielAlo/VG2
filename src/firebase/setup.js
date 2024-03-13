import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDARudR_zkIxCJl2HkhomivoOhMk_XO_fQ",
    authDomain: "visualgreen-519e5.firebaseapp.com",
    databaseURL: "https://visualgreen-519e5-default-rtdb.firebaseio.com",
    projectId: "visualgreen-519e5",
    storageBucket: "visualgreen-519e5.appspot.com",
    messagingSenderId: "1025073099068",
    appId: "1:1025073099068:web:59f27abb80b490da80ae39",
    measurementId: "G-7B4XH1JBMR"
  };
  
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const db = getFirestore(app)
  