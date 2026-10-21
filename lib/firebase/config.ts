import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export function getFirebaseConfig(): FirebaseConfig {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

export function isFirebaseConfigured(): boolean {
  const cfg = getFirebaseConfig();
  return Boolean(
    cfg.apiKey &&
    cfg.apiKey !== "your_firebase_api_key_here" &&
    cfg.projectId &&
    cfg.projectId !== "your_project_id"
  );
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (typeof window !== "undefined" || process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  if (isFirebaseConfigured()) {
    try {
      const cfg = getFirebaseConfig();
      app = getApps().length > 0 ? getApp() : initializeApp(cfg);
      auth = getAuth(app);
      db = getFirestore(app);
    } catch (err) {
      console.warn("Firebase initialization warning:", err);
    }
  }
}

export { app, auth, db };
