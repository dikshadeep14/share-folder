import firebase from "firebase";
const config = {
  apiKey: "AIzaSyBV7cZPUKapM1igznakxVnh5Ngp7HxY6yE",
  authDomain: "sharefolder-f5062.firebaseapp.com",
  databaseURL: "https://sharefolder-f5062.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;

export const db = firebase.database();
