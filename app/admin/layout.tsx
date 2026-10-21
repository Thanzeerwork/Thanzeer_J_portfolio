"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { subscribeToAuth, logoutAdmin, getStoredUser, AdminUser } from "@/lib/firebase/auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseLive, setFirebaseLive] = useState(false);

  useEffect(() => {
    setFirebaseLive(isFirebaseConfigured());

    // Check immediate local session if present
    const cached = getStoredUser();
    if (cached) {
      setUser(cached);
      setLoading(false);
    }

    const unsubscribe = subscribeToAuth((adminUser) => {
      setUser(adminUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Only redirect if auth check has finished and no user exists
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [loading, user, pathname, router]);

  // If on login page, render children without full sidebar shell
  if (pathname === "/admin/login") {
    return <div className="admin-body admin-grid-pattern">{children}</div>;
  }

  if (loading) {
    return (
      <div className="admin-body admin-grid-pattern" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <p className="admin-label" style={{ marginBottom: "0.5rem" }}>[Initializing Admin Session]</p>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem" }}>Verifying Firebase Authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const navLinks = [
    { href: "/admin", label: "Overview", icon: "⚡" },
    { href: "/admin/projects", label: "Projects Manager", icon: "📁" },
    { href: "/admin/blog", label: "Blog Articles", icon: "✍️" },
    { href: "/admin/media", label: "Cloudflare R2 Storage", icon: "☁️" },
    { href: "/admin/settings", label: "Site & Profile", icon: "⚙️" },
  ];

  return (
    <div className="admin-body admin-grid-pattern admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontWeight: 800, letterSpacing: "-0.04em", fontSize: "1.1rem", color: "#fff" }}>TJ</span>
            <span className="admin-label" style={{ color: "var(--admin-accent)" }}>/ CMS</span>
          </div>
          <span className={`admin-pill ${firebaseLive ? "admin-pill--live" : "admin-pill--demo"}`}>
            <span className="admin-dot"></span>
            {firebaseLive ? "Firebase Live" : "Demo Mode"}
          </span>
        </div>

        <nav className="admin-nav">
          <div className="admin-label" style={{ padding: "0.5rem 0.85rem", fontSize: "0.7rem" }}>
            Contents & Architecture
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--admin-border)", background: "rgba(0,0,0,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "0.825rem", fontWeight: 600, color: "#fff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {user.displayName || "Thanzeer J"}
              </p>
              <p className="admin-label" style={{ fontSize: "0.675rem", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => logoutAdmin()}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="admin-label" style={{ color: "var(--admin-text-muted)" }}>
              Admin Console · rev. 2026
            </span>
            <span style={{ color: "var(--admin-border)" }}>|</span>
            <span style={{ fontSize: "0.85rem", color: "var(--admin-text)" }}>
              {navLinks.find((l) => l.href === pathname)?.label || "Dashboard"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              href="/"
              target="_blank"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              style={{ fontSize: "0.75rem" }}
            >
              <span>View Live Website</span>
              <span>↗</span>
            </Link>
          </div>
        </header>

        {/* Main page content */}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
