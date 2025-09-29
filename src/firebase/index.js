import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzHIEY3bTBb43-TGjCBcEr0wzPbv5drS4",
  authDomain: "mini-app-ccbd6.firebaseapp.com",
  projectId: "mini-app-ccbd6",
  storageBucket: "mini-app-ccbd6.appspot.com",
  messagingSenderId: "407676911885",
  appId: "1:407676911885:web:4b4c1aedb37be5c3cef044",
  measurementId: "G-X87H168H3Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore();
