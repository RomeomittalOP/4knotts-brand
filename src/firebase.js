import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDewTDhAwCelIwQ4hw1Uj3Pt_DGNgTMdFY",
  authDomain: "knotts-auth.firebaseapp.com",
  projectId: "knotts-auth",
  storageBucket: "knotts-auth.firebasestorage.app",
  messagingSenderId: "143052429608",
  appId: "1:143052429608:web:87889e3f43265fb115581d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);