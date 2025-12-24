import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

/**
 * Firebase configuration
 * All sensitive keys are stored in environment variables
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent Firebase from initializing multiple times (important for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase Authentication
export const auth = getAuth(app);

// Google Authentication Provider
export const googleProvider = new GoogleAuthProvider();
