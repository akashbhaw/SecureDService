import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const app = firebase.initializeApp({
    apiKey: "AIzaSyA5vzn1mbEJ1dsGvNTnu-uI8LgVFL2bsBg",
    authDomain: "sds-drive.firebaseapp.com",
    projectId: "sds-drive",
    storageBucket: "sds-drive.appspot.com",
    messagingSenderId: "1050752071221",
    appId: "1:1050752071221:web:85067309841de9fd8da37c",
    measurementId: "G-G01HC7ZDFN"
  }); 

  
export  const auth =app.auth()
export const storage=app.storage()
export default app;