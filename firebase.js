import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2iy5zk39N-_5cav3tbS8tF6tGrUOJdfA",
  authDomain: "promise-keeper-addc6.firebaseapp.com",
  projectId: "promise-keeper-addc6",
  storageBucket: "promise-keeper-addc6.firebasestorage.app",
  messagingSenderId: "559654081023",
  appId: "1:559654081023:web:de0070cc76a4efe28d17ca"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);