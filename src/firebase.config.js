import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'



// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDpPgx9FFrfg4yPxS27gTj_3O8YTpNJnvA",
   authDomain: "property-market-decb6.firebaseapp.com",
   projectId: "property-market-decb6",
   storageBucket: "property-market-decb6.appspot.com",
   messagingSenderId: "1069867689989",
   appId: "1:1069867689989:web:c6c6887bbfe414868c946c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();