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

export const DEFAULT_ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "thanzeerwork@gmail.com";
export const DEFAULT_ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Thanzeerportfolio@479660";

export async function loginAdmin(email: string, pass: string): Promise<AdminUser> {
  const inputEmail = (email || "").trim().toLowerCase();
  const validEmail = DEFAULT_ADMIN_EMAIL.trim().toLowerCase();
  const inputPass = pass || "";
  const isDefaultCredentials =
    inputEmail === validEmail && inputPass === DEFAULT_ADMIN_PASSWORD;

  // 1. If Firebase Auth is configured, attempt authentication with Firebase
  if (isFirebaseConfigured() && auth) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const user: AdminUser = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || "Thanzeer J",
        isDemo: false,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(user));
        window.dispatchEvent(new Event("admin_auth_changed"));
      }
      return user;
    } catch (err: any) {
      console.warn("Firebase Auth error:", err?.code, err?.message);
      // If user is not yet registered in Firebase Console Auth provider,
      // fallback to master portfolio admin credentials
      if (isDefaultCredentials) {
        const user: AdminUser = {
          uid: "admin-thanzeer",
          email: DEFAULT_ADMIN_EMAIL,
          displayName: "Thanzeer J",
          isDemo: false,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(user));
          window.dispatchEvent(new Event("admin_auth_changed"));
        }
        return user;
      }
      throw new Error("Invalid email or password.");
    }
  }

  // 2. Fallback when Firebase Auth is offline or disabled: strictly verify master credentials
  if (isDefaultCredentials) {
    const user: AdminUser = {
      uid: "admin-thanzeer",
      email: DEFAULT_ADMIN_EMAIL,
      displayName: "Thanzeer J",
      isDemo: false,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(user));
      window.dispatchEvent(new Event("admin_auth_changed"));
    }
    return user;
  }

  throw new Error("Invalid email or password.");
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
