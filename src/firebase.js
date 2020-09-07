import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAMd6YrdYLWrQGhDU79KlfcQiKc9_ywj4E",
  authDomain: "harmonixitem-83c41.firebaseapp.com",
  databaseURL: "https://harmonixitem-83c41.firebaseio.com",
  projectId: "harmonixitem-83c41",
  storageBucket: "harmonixitem-83c41.appspot.com",
  messagingSenderId: "1092831547332",
  appId: "1:1092831547332:web:97e1f89db6507cae6fde91",
  measurementId: "G-R42Q9MRLZW",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
