import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { get, update, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL:
    "https://vendy-4687d-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  console.log("User:", result.user);
  return result.user;
}

export async function signInWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
}

export async function registerUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
}

// Real-time Database functions

export async function storageUser(email) {
  const safeEmail = email.replace(/\./g, "_");

  const ejemplo = {
    name: "Ejemplo",
    price: 0,
    description: "Un ejemplo de un productos creado con Vendy",
  };
  const data = {
    ejemplo,
  };

  await set(ref(db, `users/${safeEmail}`), {
    email,
    data,
  });
}

// Function to check if a user exists in the database
export async function checkUserExists(email) {
  try {
    const safeEmail = email.replace(/\./g, "_");
    const userRef = ref(db, `users/${safeEmail}`);
    const snapshot = await get(userRef);
    return snapshot.exists();
  } catch (error) {
    console.log("Error checking user existence: " + error);
    return false;
  }
}

export async function getAccountItems(email) {
  const rute = `users/${email}/data`;

  const e = await get(ref(db, rute));
  return e.val();
}

export async function editAccountItems(email, itemName, name, price, description) {
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}/data/${itemName}`;
  try {
    await update(ref(db, rute), {
      name: name,
      price: price,
      description: description,
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

export function deleteItem(email, itemName) {
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}/data/${itemName}`;

  try {
    remove(ref(db, rute));
  } catch(e) {
    console.log("Error remove");
  }
}

export async function addItem(email, itemName, name, price, description) {
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}/data/${itemName}`;

  set(ref(db, rute), {
    name: name,
    price: price,
    description: description,
  });
}

export function deleteAccount(email) {
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}`;

  try {
    remove(ref(db, rute));
  } catch(e) {
    console.log("Error deleting account");
  }
}