
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC3S7tgmDi_671FfbO_b_QAGevoO75OaDA",
  authDomain: "node-registration-server.firebaseapp.com",
  projectId: "node-registration-server",
  storageBucket: "node-registration-server.appspot.com",
  messagingSenderId: "975017823242",
  appId: "1:975017823242:web:a9982f9a7de9b5c94ae3f3",
  measurementId: "G-KBQVRCT753"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
