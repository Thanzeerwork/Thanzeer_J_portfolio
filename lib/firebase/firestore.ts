import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";
import { Project, PROJECTS } from "@/data/projects";
import { BlogPostMeta, BLOG_POSTS } from "@/data/blog";

export interface SiteSettings {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  companyUrl: string;
  resumePdfUrl: string;
  updatedAt?: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  name: "Thanzeer J",
  tagline: "Full-Stack Web Developer & Mobile App Engineer",
  email: "thanzeerwork@gmail.com",
  phone: "+91 98956 54031",
  location: "Kerala, India (IST / UTC+5:30)",
  status: "Available for full-stack and mobile projects",
  bio: "Full-Stack Developer and Mobile App Engineer based in Kerala, India. Specializing in modern React/Next.js frontends, React Native cross-platform apps, and scalable Cloud Firestore/Supabase databases.",
  githubUrl: "https://github.com/Thanzeerwork",
  linkedinUrl: "https://www.linkedin.com/in/thanzeer-j/",
  companyUrl: "https://ryphtech.in/",
  resumePdfUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/documents/resume.pdf",
};

// Storage keys for demo/local mode
const STORAGE_PROJECTS_KEY = "tj_portfolio_projects";
const STORAGE_BLOG_KEY = "tj_portfolio_blog";
const STORAGE_SETTINGS_KEY = "tj_portfolio_settings";

/* ========================================================
   PROJECTS CRUD
======================================================== */

const isLegacyMockUrl = (url?: string) =>
  !url ||
  url.includes("/images/projects/") ||
  url.includes("_astro") ||
  url.includes("wordpress") ||
  url.includes("front-io") ||
  url.includes("argocd") ||
  url.includes("turing");

export async function fetchProjects(): Promise<{ projects: Project[]; isLiveFirestore: boolean }> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "projects"), orderBy("n", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => {
          const p = d.data() as Project;
          if (isLegacyMockUrl(p.imageUrl)) {
            const def = PROJECTS.find((orig) => orig.id === p.id);
            if (def?.imageUrl) return { ...p, imageUrl: def.imageUrl };
          }
          return p;
        });
        return { projects: list, isLiveFirestore: true };
      }
    } catch (err) {
      console.warn("Firestore fetch error, falling back to local:", err);
    }
  }

  // Local / Demo storage fallback
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (cached) {
      try {
        const list: Project[] = JSON.parse(cached);
        const enriched = list.map((p) => {
          if (isLegacyMockUrl(p.imageUrl)) {
            const def = PROJECTS.find((orig) => orig.id === p.id);
            if (def?.imageUrl) return { ...p, imageUrl: def.imageUrl };
          }
          return p;
        });
        return { projects: enriched, isLiveFirestore: false };
      } catch {
        // ignore
      }
    }
  }

  return { projects: PROJECTS, isLiveFirestore: false };
}

export async function saveProject(project: Project): Promise<{ liveFirestore: boolean; error?: string }> {
  let liveFirestore = false;
  let errorMsg: string | undefined;

  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, "projects", project.id), {
        ...project,
        updatedAt: new Date().toISOString(),
      });
      liveFirestore = true;
    } catch (err: any) {
      console.warn("Firestore saveProject error:", err);
      errorMsg = err?.message || String(err);
    }
  }

  // Also sync to local storage guaranteed
  if (typeof window !== "undefined") {
    const { projects } = await fetchProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    let updated: Project[];
    if (index >= 0) {
      updated = [...projects];
      updated[index] = project;
    } else {
      updated = [project, ...projects];
    }
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
  }

  return { liveFirestore, error: errorMsg };
}

export async function deleteProject(projectId: string): Promise<{ liveFirestore: boolean; error?: string }> {
  let liveFirestore = false;
  let errorMsg: string | undefined;

  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      liveFirestore = true;
    } catch (err: any) {
      console.warn("Firestore deleteProject error:", err);
      errorMsg = err?.message || String(err);
    }
  }

  if (typeof window !== "undefined") {
    const { projects } = await fetchProjects();
    const updated = projects.filter((p) => p.id !== projectId);
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
  }

  return { liveFirestore, error: errorMsg };
}

/* ========================================================
   BLOG POSTS CRUD
======================================================== */

export async function fetchBlogPosts(): Promise<{ posts: BlogPostMeta[]; isLiveFirestore: boolean }> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "blog_posts"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as BlogPostMeta);
        return { posts: list, isLiveFirestore: true };
      }
    } catch (err) {
      console.warn("Firestore blog fetch error, falling back to local:", err);
    }
  }

  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(STORAGE_BLOG_KEY);
    if (cached) {
      try {
        const list: BlogPostMeta[] = JSON.parse(cached);
        const enriched = list.map((b) => {
          if (!b.image) {
            const def = BLOG_POSTS.find((orig) => orig.slug === b.slug);
            if (def?.image) return { ...b, image: def.image };
          }
          return b;
        });
        return { posts: enriched, isLiveFirestore: false };
      } catch {
        // ignore
      }
    }
  }

  return { posts: BLOG_POSTS, isLiveFirestore: false };
}

export async function saveBlogPost(post: BlogPostMeta): Promise<{ liveFirestore: boolean; error?: string }> {
  let liveFirestore = false;
  let errorMsg: string | undefined;

  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, "blog_posts", post.slug), {
        ...post,
        updatedAt: new Date().toISOString(),
      });
      liveFirestore = true;
    } catch (err: any) {
      console.warn("Firestore saveBlogPost error:", err);
      errorMsg = err?.message || String(err);
    }
  }

  if (typeof window !== "undefined") {
    const { posts } = await fetchBlogPosts();
    const index = posts.findIndex((p) => p.slug === post.slug);
    let updated: BlogPostMeta[];
    if (index >= 0) {
      updated = [...posts];
      updated[index] = post;
    } else {
      updated = [post, ...posts];
    }
    localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(updated));
  }

  return { liveFirestore, error: errorMsg };
}

export async function deleteBlogPost(slug: string): Promise<{ liveFirestore: boolean; error?: string }> {
  let liveFirestore = false;
  let errorMsg: string | undefined;

  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, "blog_posts", slug));
      liveFirestore = true;
    } catch (err: any) {
      console.warn("Firestore deleteBlogPost error:", err);
      errorMsg = err?.message || String(err);
    }
  }

  if (typeof window !== "undefined") {
    const { posts } = await fetchBlogPosts();
    const updated = posts.filter((p) => p.slug !== slug);
    localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(updated));
  }

  return { liveFirestore, error: errorMsg };
}

/* ========================================================
   SITE SETTINGS CRUD
======================================================== */

export async function fetchSiteSettings(): Promise<{ settings: SiteSettings; isLiveFirestore: boolean }> {
  if (isFirebaseConfigured() && db) {
    try {
      const snap = await getDoc(doc(db, "settings", "profile"));
      if (snap.exists()) {
        return { settings: snap.data() as SiteSettings, isLiveFirestore: true };
      }
    } catch (err) {
      console.warn("Firestore settings fetch error:", err);
    }
  }

  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(STORAGE_SETTINGS_KEY);
    if (cached) {
      try {
        return { settings: JSON.parse(cached), isLiveFirestore: false };
      } catch {
        // ignore
      }
    }
  }

  return { settings: DEFAULT_SETTINGS, isLiveFirestore: false };
}

export async function saveSiteSettings(settings: SiteSettings): Promise<{ liveFirestore: boolean; error?: string }> {
  let liveFirestore = false;
  let errorMsg: string | undefined;

  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, "settings", "profile"), {
        ...settings,
        updatedAt: new Date().toISOString(),
      });
      liveFirestore = true;
    } catch (err: any) {
      console.warn("Firestore saveSiteSettings error:", err);
      errorMsg = err?.message || String(err);
    }
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  }

  return { liveFirestore, error: errorMsg };
}

/* ========================================================
   SEED FIRESTORE WITH INITIAL DATA
======================================================== */

export async function seedInitialData(): Promise<{ success: boolean; count: number; message: string }> {
  let seededProjects = 0;
  let seededPosts = 0;

  if (isFirebaseConfigured() && db) {
    for (const p of PROJECTS) {
      await setDoc(doc(db, "projects", p.id), {
        ...p,
        updatedAt: new Date().toISOString(),
      });
      seededProjects++;
    }

    for (const b of BLOG_POSTS) {
      await setDoc(doc(db, "blog_posts", b.slug), {
        ...b,
        updatedAt: new Date().toISOString(),
      });
      seededPosts++;
    }

    await setDoc(doc(db, "settings", "profile"), {
      ...DEFAULT_SETTINGS,
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      count: seededProjects + seededPosts,
      message: `Successfully seeded ${seededProjects} projects and ${seededPosts} blog posts directly into live Firebase Firestore!`,
    };
  }

  // Local storage seed
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(PROJECTS));
    localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(BLOG_POSTS));
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
  }

  return {
    success: true,
    count: PROJECTS.length + BLOG_POSTS.length,
    message: `Initialized ${PROJECTS.length} projects and ${BLOG_POSTS.length} posts into local admin cache. Add Firebase config to .env.local to persist in live Firestore.`,
  };
}
