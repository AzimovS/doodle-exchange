// utils/auth.js
import { auth } from "../app/firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const getCurrentUserToken = async () => {
  await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER_EMAIL!, process.env.FIREBASE_USER_PASSWORD!);
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const token = await user.getIdToken();
        resolve(token);
      } else {
        reject("No user is signed in");
      }
    });
  });
};
