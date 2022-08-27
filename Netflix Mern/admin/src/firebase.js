// import firebase from "firebase"
import firebase from "firebase/compat/app"
import 'firebase/compat/storage';
import dotenv from "dotenv"
dotenv.config()
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "netflix-24a93.firebaseapp.com",
    projectId: "netflix-24a93",
    storageBucket: "netflix-24a93.appspot.com",
    messagingSenderId: "546510193398",
    appId: "1:546510193398:web:83150642c7b1ca257762d7",
    measurementId: "G-9BN5CLB3KR"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export default storage