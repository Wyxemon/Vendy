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
    name: "Coca Cola Pequeña",
    price: 3.19,
    description: "Coca-Cola es una bebida refrescante de cola, dulce y con gas, muy conocida en todo el mundo.",
    category: "Bebidas",
  };
  const data = {
    ejemplo,
  };
  
  const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')

  await set(ref(db, `users/${safeEmail}`), {
    email,
    data,
    description: "McDonald's es una cadena de restaurantes de comida rápida reconocida a nivel mundial. Ofrece una amplia variedad de hamburguesas, patatas fritas, nuggets, postres y bebidas, con un servicio rápido y opciones para toda la familia. En este establecimiento podrás disfrutar de tus productos favoritos en un ambiente cómodo y moderno, ya sea para comer en el local, llevar o pedir a domicilio.",
    title: "McDonald's®",
    code: code
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

export async function addItem(email, itemName, name, price, description, category) {
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}/data/${itemName}`;
  
  set(ref(db, rute), {
    name: name,
    price: price,
    description: description,
    category: category,
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

export async function addBannerImg(email, img) {
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}`;
  await update(ref(db, rute), { // Actualizar con set sobrescribe todo
    banner: img,
  });
}


// Img convert

import imageCompression from "browser-image-compression";

export async function convertToBase64(file) {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedImage = await imageCompression(file, options);

    /*Convertir a Base64 para realtime database*/
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(compressedImage);

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });    

  } catch (error) {
    console.log("Error converting image: " + error);
  }
}

export async function readBannerImg(email) {
  // hay que mostrar la imagen que hay guardada en el banner: img esto que esta en realtime db
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}/banner`;
  const a = await get(ref(db, rute));
  if (a.exists()) {
    return a.val();
  } else {
    return null;
  }
}


export async function addBannerInformation(email, itemName, value) {
  const safeEmail = email.replace(/\./g, "_");
  const path = `users/${safeEmail}`;
  await update(ref(db, path), {
    [itemName]: value,
  });
}

export async function getBannerInformation(email, itemName) {
  const safeEmail = email.replace(/\./g, "_");
  const path = `users/${safeEmail}/${itemName}`;
  const a = await get(ref(db, path));
  if (a.exists()) {
    return a.val();
  } else {
    return null;
  }
}

export async function addImgItem(email, itemName, img) {
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}/data/${itemName}`;
  await update(ref(db, rute), {
    img: img,
  });
}

export async function getImgItem(email, itemName) {
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}/data/${itemName}/img`;
  const a = await get(ref(db, rute));
  if (a.exists()) {
    return a.val();
  }
}
