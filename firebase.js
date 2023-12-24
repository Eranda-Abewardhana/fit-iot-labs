// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2gkh4VeENVWv-8TxmURhoe5CxLpe5Ous",
  authDomain: "uom-iot-labs.firebaseapp.com",
  projectId: "uom-iot-labs",
  storageBucket: "uom-iot-labs.appspot.com",
  messagingSenderId: "442829101326",
  appId: "1:442829101326:web:5edce26b490a21fde35f5f",
  measurementId: "G-17K0D3EGB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);