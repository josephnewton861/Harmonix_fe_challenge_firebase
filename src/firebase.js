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
var firebaseConfig2 = {
  apiKey: "AIzaSyCvwYlGDv_GP9gK92-iJW9hPzM9fpDZ_iA",
  authDomain: "harmonixpalindrome.firebaseapp.com",
  databaseURL: "https://harmonixpalindrome.firebaseio.com",
  projectId: "harmonixpalindrome",
  storageBucket: "harmonixpalindrome.appspot.com",
  messagingSenderId: "326621465330",
  appId: "1:326621465330:web:db759c7d1025a5a6f85e6b",
  measurementId: "G-Y8PZ1JDPLP",
};

firebase.initializeApp(firebaseConfig, firebaseConfig2);

export default firebase;
