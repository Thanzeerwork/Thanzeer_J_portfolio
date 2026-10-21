import { NextResponse } from "next/server";
import { PROJECTS } from "@/data/projects";
import { BLOG_POSTS } from "@/data/blog";
import { DEFAULT_SETTINGS } from "@/lib/firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export async function POST() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!apiKey || !projectId) {
    return NextResponse.json({
      success: false,
      message: "Firebase is not configured in .env.local",
    }, { status: 400 });
  }

  try {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    const db = getFirestore(app);

    let seededProjects = 0;
    let seededPosts = 0;

    for (const project of PROJECTS) {
      await setDoc(doc(db, "projects", project.id), {
        ...project,
        updatedAt: new Date().toISOString(),
      });
      seededProjects++;
    }

    for (const post of BLOG_POSTS) {
      await setDoc(doc(db, "blog_posts", post.slug), {
        ...post,
        updatedAt: new Date().toISOString(),
      });
      seededPosts++;
    }

    await setDoc(doc(db, "settings", "profile"), {
      ...DEFAULT_SETTINGS,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Successfully synchronized ${seededProjects} projects, ${seededPosts} blog posts, and site settings directly into Cloud Firestore!`,
      data: {
        projectsCount: seededProjects,
        postsCount: seededPosts,
        storageProvider: "Cloudflare R2",
      },
    });
  } catch (err: any) {
    console.error("Firestore seed error:", err);
    if (err?.code === "permission-denied" || err?.message?.includes("PERMISSION_DENIED")) {
      return NextResponse.json({
        success: false,
        permissionDenied: true,
        message: "Firestore Security Rules are currently locked in Firebase Console. Go to Firebase Console -> Firestore Database -> Rules tab and update to: allow read, write: if true;",
        error: err.message,
      }, { status: 403 });
    }

    return NextResponse.json({
      success: false,
      message: err.message || "Failed to seed database",
    }, { status: 500 });
  }
}
