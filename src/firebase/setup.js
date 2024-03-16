import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbOsTncCvEQW_cYgoJY_DI2kMocRLkggg",
  authDomain: "test1-22e89.firebaseapp.com",
  databaseURL: "https://test1-22e89-default-rtdb.firebaseio.com",
  projectId: "test1-22e89",
  storageBucket: "test1-22e89.appspot.com",
  messagingSenderId: "40204187616",
  appId: "1:40204187616:web:8951cda4a57e9a9c355d85",
  measurementId: "G-6W4N1YMX9X"
};
  
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const db = getFirestore(app)
  