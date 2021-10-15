import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

// Set the configuration for your app
const firebaseConfig = {
  apiKey: "AIzaSyAaIAO-qQRV0ifsn_sdE-Uhv-g2m74N1vI",
  authDomain: "reut-storage.firebaseapp.com",
  projectId: "reut-storage",
  storageBucket: "reut-storage.appspot.com",
  messagingSenderId: "388345731862",
  appId: "1:388345731862:web:0e7c723815a6eadf5e0e37",
  measurementId: "G-838Z3WNSBC",
};
initializeApp(firebaseConfig);

const storage = getStorage();

export { storage };
