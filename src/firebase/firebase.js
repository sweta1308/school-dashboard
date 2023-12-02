import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUNYi00qaoP4u1IyfNQ2jPDkTOP1haukw",
  authDomain: "school-dashboard-7aab3.firebaseapp.com",
  projectId: "school-dashboard-7aab3",
  storageBucket: "school-dashboard-7aab3.appspot.com",
  messagingSenderId: "147980908083",
  appId: "1:147980908083:web:794d949caeafcea5821546",
  databaseURL:
    "https://console.firebase.google.com/project/school-dashboard-7aab3/database/school-dashboard-7aab3-default-rtdb/data/~2F",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
