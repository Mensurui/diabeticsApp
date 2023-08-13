
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDpUw4GYcRtscnD4aYq0omGioRRAi44yQU",
  authDomain: "my-diabetics.firebaseapp.com",
  projectId: "my-diabetics",
  storageBucket: "my-diabetics.appspot.com",
  messagingSenderId: "657427763602",
  appId: "1:657427763602:web:3946138db384aef9c5f14b"
};



  export const FIREBASE_APP = firebase.default.initializeApp(firebaseConfig)
  export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
  export const FIREBASE_DB = getFirestore(FIREBASE_APP)
  export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)

  // export const FIREBASE_DB = firebase.firestore()
  //Android: 861982546272-0a8fl1q6fanik9i62r4t23tgr79qoiph.apps.googleusercontent.com