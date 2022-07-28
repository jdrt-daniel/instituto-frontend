import { initializeApp } from "firebase/app";
import { getDatabase, collection } from "firebase/database";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCeEmWPW0YgykfAZdPOm401C6UHpVKyGb4",
  authDomain: "san-andres-87ce5.firebaseapp.com",
  projectId: "san-andres-87ce5",
  storageBucket: "san-andres-87ce5.appspot.com",
  messagingSenderId: "906135230439",
  appId: "1:906135230439:web:d7cf764467766bf1f24f42",
  measurementId: "G-0J8VP3NQHZ",
};

// Initialize Firebase
const conexion = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messageCollection = collection(db, "messages");

export default messageCollection;
