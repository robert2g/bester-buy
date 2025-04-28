import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
// Removed as project no longer requires access to non-existent firebase instance.
  };


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
