import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC7-c4Ulslc_tTgwm-s3SYpkmkrI9krcbs",
  authDomain: "semicircle-b0e4e.firebaseapp.com",
  databaseURL: "https://semicircle-b0e4e.firebaseio.com",
  projectId: "semicircle-b0e4e",
  storageBucket: "",
  messagingSenderId: "172966864618",
  appId: "1:172966864618:web:6c05c05158d98deb"
};

firebase.initializeApp(config);

export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(
    function(user) {
      if (user) {
        func(true, user);
      } else {
        func(false);
      }
    },
    function(error) {
      console.log(error);
    }
  );
}

export const firebaseDB = firebase.database();
export const firebaseAuth = firebase.auth;
