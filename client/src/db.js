import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA6xESxkXcQEf6_M_rj0xyn8DAz43GtJHA",
    authDomain: "besterbuy-c18f6.firebaseapp.com",
    projectId: "besterbuy-c18f6",
    storageBucket: "besterbuy-c18f6.appspot.com",
    messagingSenderId: "99528590354",
    appId: "1:99528590354:web:c8adbc9de1acc507e6c4cb",
    measurementId: "G-LV5T03YQZD"
  };


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };