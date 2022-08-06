import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
const firebaseConfig = { 
  /*
  In this configuracion const we pass our keys, in this case i´m importing them from a .env
  *I´m using import.env. because im using vite
  *if we use only react we use (process.env)
  */
    apiKey: import.meta.env.VITE_APP_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGINGSENDERID,
    appId:  import.meta.env.VITE_APP_FIREBASE_APPID
  };
const app= initializeApp (firebaseConfig)
const auth= getAuth(app) /*
                          ? I had a problem exporting auth and db at the same time
                          ? thats why im importing this auth function in my components, but you can try importing both and not using it in the components
                          */
const db= getFirestore(app)

export default db; //export our db

