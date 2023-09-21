import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBrCZwzleFhcpA1w6CQfuNzggPfWOfn580",
  authDomain: "concert-journal.firebaseapp.com",
  projectId: "concert-journal",
  storageBucket: "concert-journal.appspot.com",
  messagingSenderId: "547526881139",
  appId: "1:547526881139:web:b3ad32a59d3f56f5d75f06",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const concertsCollectionRef = collection(db, "Concerts");

export async function getConcerts() {
  const snapshot = await getDocs(concertsCollectionRef);
  const concerts = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return concerts;
}

export async function getConcert(id) {
  const docRef = doc(db, "Concerts", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}
