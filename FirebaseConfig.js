import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzXYyziVvmDvTOaWWroovflTNQfA7EJ5c",
    authDomain: "fyp2022-9b63a.firebaseapp.com",
    projectId: "fyp2022-9b63a",
    storageBucket: "fyp2022-9b63a.appspot.com",
    messagingSenderId: "1024164018088",
    appId: "1:1024164018088:web:049e88615dbf4e847f4f9d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;


