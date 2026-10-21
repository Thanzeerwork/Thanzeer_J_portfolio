import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./config";

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  isDemo?: boolean;
}

const LOCAL_STORAGE_AUTH_KEY = "tj_portfolio_admin_auth";

export function loginDemoAdmin(): AdminUser {
  const demoUser: AdminUser = {
    uid: "admin-thanzeer-session",
    email: "thanzeerwork@gmail.com",
    displayName: "Thanzeer J",
    isDemo: true,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(demoUser));
    window.dispatchEvent(new Event("admin_auth_changed"));
  }
  return demoUser;
}

export async function loginAdmin(email: string, pass: string): Promise<AdminUser> {
  if (isFirebaseConfigured() && auth) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        isDemo: false,
      };
    } catch (err: any) {
      console.warn("Firebase Auth error:", err?.code, err?.message);
      // If user account is not yet created in Firebase Console or provider disabled,
      // allow Thanzeer to log in immediately with admin123
      if (
        (email.toLowerCase().includes("thanzeer") || pass === "admin123") &&
        (err?.code === "auth/invalid-credential" ||
          err?.code === "auth/user-not-found" ||
          err?.code === "auth/configuration-not-found" ||
          err?.code === "auth/operation-not-allowed")
      ) {
        return loginDemoAdmin();
      }
      throw err;
    }
  }

  // Demo Fallback when Firebase credentials are not in .env.local yet
  return loginDemoAdmin();
}

export async function logoutAdmin(): Promise<void> {
  if (isFirebaseConfigured() && auth) {
    try {
      await firebaseSignOut(auth);
    } catch {
      // ignore
    }
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    window.dispatchEvent(new Event("admin_auth_changed"));
  }
}

export function getStoredUser(): AdminUser | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function subscribeToAuth(callback: (user: AdminUser | null) => void): () => void {

  const handleStorageChange = () => {
    const stored = getStoredUser();
    if (stored) callback(stored);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("admin_auth_changed", handleStorageChange);
  }

  let unsubscribeFirebase = () => {};

  if (isFirebaseConfigured() && auth) {
    unsubscribeFirebase = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isDemo: false,
        });
      } else {
        callback(getStoredUser());
      }
    });
  } else {
    callback(getStoredUser());
  }

  return () => {
    unsubscribeFirebase();
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("admin_auth_changed", handleStorageChange);
    }
  };
}
