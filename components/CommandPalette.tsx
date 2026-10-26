"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { BLOG_POSTS, BlogPostMeta } from "@/data/blog";
import { fetchBlogPosts } from "@/lib/firebase/firestore";

interface PaletteItem {
  id: string;
  title: string;
  category: string;
  detail?: string;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [blogPosts, setBlogPosts] = useState<BlogPostMeta[]>(BLOG_POSTS);

  useEffect(() => {
    fetchBlogPosts()
      .then((res) => {
        if (res.posts && res.posts.length > 0) {
          setBlogPosts(res.posts);
        }
      })
      .catch(() => {});
  }, []);

  const items: PaletteItem[] = useMemo(() => {
    const baseNav: PaletteItem[] = [
      {
        id: "home",
        title: "Home",
        category: "Navigation",
        detail: "Back to starting camp",
        action: () => router.push("/"),
      },
      {
        id: "work",
        title: "Selected Work",
        category: "Navigation",
        detail: "Confidential case studies & builds",
        action: () => router.push("/#work"),
      },
      {
        id: "services",
        title: "Services",
        category: "Navigation",
        detail: "Web development & AI integrations",
        action: () => router.push("/services"),
      },
      {
        id: "about",
        title: "About Thanzeer J",
        category: "Navigation",
        detail: "B.Tech CSE, technical skills & approach",
        action: () => router.push("/about"),
      },
      {
        id: "resume",
        title: "View Resume / CV",
        category: "Navigation",
        detail: "Education, technical skills, and project history",
        action: () => router.push("/resume"),
      },
      {
        id: "contact",
        title: "Contact & Opportunities",
        category: "Navigation",
        detail: "Connect or email thanzeerwork@gmail.com",
        action: () => router.push("/contact"),
      },
      {
        id: "copy-email",
        title: "Copy Email Address",
        category: "Connect",
        detail: "thanzeerwork@gmail.com",
        action: () => {
          navigator.clipboard?.writeText("thanzeerwork@gmail.com");
        },
      },
      {
        id: "blog",
        title: "Blog",
        category: "Navigation",
        detail: "Articles on dev and AI in practice",
        action: () => router.push("/blog"),
      },
    ];

    const projectItems: PaletteItem[] = PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      title: `[${p.n}] ${p.title}`,
      category: "Work / Case Studies",
      detail: `${p.stack.join(" · ")} — ${p.client}`,
      action: () => router.push(p.href || "/#work"),
    }));

    const serviceItems: PaletteItem[] = SERVICES.map((s) => ({
      id: `srv-${s.id}`,
      title: `[${s.n}] ${s.title}`,
      category: "Services",
      detail: `${s.tags.join(" · ")} — ${s.typicalTimeline}`,
      action: () => router.push(`/services/${s.slug}`),
    }));

    const blogItems: PaletteItem[] = blogPosts.map((b) => ({
      id: `post-${b.slug}`,
      title: b.title,
      category: `Blog / ${b.topic}`,
      detail: `${b.formattedDate} · ${b.readingTime} read`,
      action: () => router.push(`/blog/${b.slug}`),
    }));

    const prefItems: PaletteItem[] = [
    {
      id: "theme-toggle",
      title: "Toggle Theme",
      category: "Preferences",
      detail: "Switch between light and dark mode",
      action: () => {
        const root = document.documentElement;
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try { localStorage.setItem("pg-theme", next); } catch {}
      },
    },
    {
      id: "accent-cycle",
      title: "Cycle Accent Color",
      category: "Preferences",
      detail: "Blue → Orange → Lime",
      action: () => {
        const accents = ["blue", "orange", "lime"];
        const root = document.documentElement;
        const cur = root.dataset.accent || "blue";
        const next = accents[(accents.indexOf(cur) + 1) % accents.length];
        root.dataset.accent = next;
        try { localStorage.setItem("pg-accent", next); } catch {}
      },
    },
    {
      id: "grid-toggle",
      title: "Toggle 12-Column Grid",
      category: "Preferences",
      detail: "Show or hide grid overlay (Alt+G)",
      action: () => {
        const root = document.documentElement;
        root.dataset.grid = root.dataset.grid === "on" ? "off" : "on";
      },
    },
    {
      id: "replay-preloader",
      title: "Replay Logo Loading Animation",
      category: "Preferences",
      detail: "Re-run the Pier Gorelli monogram plotting preloader",
      action: () => {
        window.dispatchEvent(new CustomEvent("replay-preloader"));
      },
    },
  ];

  return [...baseNav, ...projectItems, ...serviceItems, ...blogItems, ...prefItems];
  }, [router, blogPosts]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.detail && item.detail.toLowerCase().includes(q))
    );
  }, [items, query]);

  const close = () => {
    dialogRef.current?.close();
    setQuery("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (dialog.open) {
          dialog.close();
        } else {
          dialog.showModal();
          inputRef.current?.focus();
        }
      }
      if (e.altKey && !e.metaKey && !e.ctrlKey && e.code === "KeyG") {
        e.preventDefault();
        const root = document.documentElement;
        root.dataset.grid = root.dataset.grid === "on" ? "off" : "on";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        close();
      }
    } else if (e.key === "Escape") {
      close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      <div className="palette__box">
        <div className="palette__search">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search commands, pages, services..."
            aria-label="Command search"
          />
          <button
            type="button"
            className="palette__close note"
            onClick={close}
            aria-label="Close command palette"
          >
            Esc
          </button>
        </div>

        <div className="palette__list" role="listbox">
          {filtered.length === 0 ? (
            <p className="palette__empty note">No results found for &ldquo;{query}&rdquo;</p>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                role="option"
                aria-selected={idx === selectedIndex}
                onClick={() => {
                  item.action();
                  close();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span>{item.title}</span>
                {item.detail && <span className="note">{item.detail}</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </dialog>
  );
}
