import firebase from "firebase";
const config = {
  apiKey: "AIzaSyBmTkMhw6EM3xEAJVa68K22yqyv5eUVG1M",
  // "AIzaSyBV7cZPUKapM1igznakxVnh5Ngp7HxY6yE",
  authDomain: "filesystem-46647.firebaseapp.com",
  databaseURL: "https://filesystem-46647.firebaseio.com",
  storageBucket: "filesystem-46647.appspot.com/filesystem"
};

firebase.initializeApp(config);

export const auth = firebase.auth;

export const db = firebase.database();
export const storageRef = firebase.storage();
