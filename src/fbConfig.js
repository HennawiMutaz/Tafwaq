import {useEffect, useState} from 'react';
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAZU9mr36OLEC5rM-5WcWcGKueAFu5fTb4",
  authDomain: "tfwaq-36acd.firebaseapp.com",
  projectId: "tfwaq-36acd",
  storageBucket: "tfwaq-36acd.appspot.com",
  messagingSenderId: "353022946163",
  appId: "1:353022946163:web:509cb82e1c8b2fa21b7306"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);


export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}




// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user));
   return unsubscribe;
  }, [])

  return currentUser;
}




export async function GetUser (user) {
  const [info, setInfo] = useState(null);
  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const admin = docSnap.data();
      setInfo(admin);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
   } catch (error) {
    console.log(error);
   }
   return info;
}    