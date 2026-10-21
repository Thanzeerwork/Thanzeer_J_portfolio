"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProjects, fetchBlogPosts, fetchSiteSettings, seedInitialData } from "@/lib/firebase/firestore";
import { isFirebaseConfigured, getFirebaseConfig } from "@/lib/firebase/config";
import { isR2Configured, getR2Config } from "@/lib/r2/client";
import { Project } from "@/data/projects";
import { BlogPostMeta } from "@/data/blog";

export default function AdminOverviewPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [r2FilesCount, setR2FilesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedNotice, setSeedNotice] = useState<string | null>(null);

  const firebaseLive = isFirebaseConfigured();
  const fbConfig = getFirebaseConfig();
  const r2Live = isR2Configured();
  const r2Config = getR2Config();

  useEffect(() => {
    async function loadData() {
      try {
        const [projRes, blogRes] = await Promise.all([
          fetchProjects(),
          fetchBlogPosts(),
        ]);
        setProjects(projRes.projects);
        setPosts(blogRes.posts);

        // Fetch R2 objects count
        const r2Res = await fetch("/api/admin/r2/list");
        if (r2Res.ok) {
          const r2Data = await r2Res.json();
          setR2FilesCount(r2Data.objects?.length || 0);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSeed = async () => {
    if (!confirm("This will synchronize all current projects, blog posts, and settings (with Cloudflare R2 assets) into your database. Proceed?")) {
      return;
    }
    setSeeding(true);
    setSeedNotice(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      
      // Also sync to local storage fallback
      await seedInitialData();

      if (data.success) {
        setSeedNotice(`✓ ${data.message}`);
      } else if (data.permissionDenied) {
        setSeedNotice(`⚠️ ${data.message} (Data saved to local admin cache)`);
      } else {
        setSeedNotice(`Notice: ${data.message}`);
      }

      // Reload projects & posts
      const [projRes, blogRes] = await Promise.all([fetchProjects(), fetchBlogPosts()]);
      setProjects(projRes.projects);
      setPosts(blogRes.posts);
    } catch (err: any) {
      setSeedNotice("Sync notice: " + (err?.message || "Data updated in local storage"));
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      {/* Top Banner / Welcome */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="admin-label">[Overview / 01]</span>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginTop: "0.25rem" }}>
              Control Center
            </h1>
            <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              Manage website content powered by Firebase Firestore & Cloudflare R2 Object Storage.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="admin-btn admin-btn-secondary admin-btn-sm"
              title="Populate Firebase/Local storage with default portfolio data"
            >
              <span>🌱</span>
              <span>{seeding ? "Syncing..." : "Seed Default Data"}</span>
            </button>
            <Link href="/admin/projects" className="admin-btn admin-btn-primary admin-btn-sm">
              <span>+ New Project</span>
            </Link>
          </div>
        </div>

        {seedNotice && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              borderRadius: "6px",
              background: "rgba(47, 91, 255, 0.1)",
              border: "1px solid rgba(47, 91, 255, 0.3)",
              color: "#9db4ff",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{seedNotice}</span>
            <button
              onClick={() => setSeedNotice(null)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        {/* Metric 1 */}
        <div className="admin-card">
          <span className="admin-label">Projects</span>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", fontFamily: "var(--admin-font-mono)" }}>
              {loading ? "..." : String(projects.length).padStart(2, "0")}
            </span>
            <span className="admin-pill admin-pill--accent">
              {projects.filter((p) => p.featured).length} Featured
            </span>
          </div>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.775rem", marginTop: "0.75rem" }}>
            Case studies & showcase apps
          </p>
        </div>

        {/* Metric 2 */}
        <div className="admin-card">
          <span className="admin-label">Blog Articles</span>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", fontFamily: "var(--admin-font-mono)" }}>
              {loading ? "..." : String(posts.length).padStart(2, "0")}
            </span>
            <span className="admin-pill admin-pill--accent">Published</span>
          </div>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.775rem", marginTop: "0.75rem" }}>
            Technical articles & tutorials
          </p>
        </div>

        {/* Metric 3 */}
        <div className="admin-card">
          <span className="admin-label">Cloudflare R2 Files</span>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", fontFamily: "var(--admin-font-mono)" }}>
              {loading ? "..." : String(r2FilesCount).padStart(2, "0")}
            </span>
            <span className={`admin-pill ${r2Live ? "admin-pill--live" : "admin-pill--demo"}`}>
              {r2Live ? "R2 Active" : "Local Mock"}
            </span>
          </div>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.775rem", marginTop: "0.75rem" }}>
            Images, screenshots & PDFs
          </p>
        </div>

        {/* Metric 4 */}
        <div className="admin-card">
          <span className="admin-label">Database Mode</span>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", fontFamily: "var(--admin-font-mono)" }}>
              {firebaseLive ? "Firestore" : "Sandbox"}
            </span>
            <span className={`admin-pill ${firebaseLive ? "admin-pill--live" : "admin-pill--demo"}`}>
              {firebaseLive ? "Live" : "Demo"}
            </span>
          </div>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.775rem", marginTop: "0.75rem" }}>
            {firebaseLive ? `Project: ${fbConfig.projectId}` : "Using local state until .env keys added"}
          </p>
        </div>
      </div>

      {/* Status & Integrations Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Firebase Service Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <span className="admin-label">Backend Service</span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginTop: "0.2rem" }}>
                Firebase Firestore & Auth
              </h3>
            </div>
            <span className={`admin-pill ${firebaseLive ? "admin-pill--live" : "admin-pill--demo"}`}>
              <span className="admin-dot"></span>
              {firebaseLive ? "Connected" : "Pending .env.local"}
            </span>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
            Firebase provides real-time document storage for all website content including case studies, technical articles, and site configurations.
          </p>

          <div
            style={{
              background: "#0c0d12",
              border: "1px solid var(--admin-border-subtle)",
              borderRadius: "6px",
              padding: "0.85rem 1rem",
              fontFamily: "var(--admin-font-mono)",
              fontSize: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--admin-text-muted)" }}>PROJECT_ID:</span>
              <span style={{ color: "#fff" }}>{fbConfig.projectId || "Not configured"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--admin-text-muted)" }}>AUTH_DOMAIN:</span>
              <span style={{ color: "#fff" }}>{fbConfig.authDomain || "Not configured"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--admin-text-muted)" }}>COLLECTIONS:</span>
              <span style={{ color: "var(--admin-green)" }}>projects, blog_posts, settings</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={handleSeed} disabled={seeding} className="admin-btn admin-btn-secondary admin-btn-sm" style={{ flex: 1 }}>
              {seeding ? "Syncing..." : "Sync Default Content"}
            </button>
            <Link href="/admin/settings" className="admin-btn admin-btn-primary admin-btn-sm" style={{ flex: 1 }}>
              Manage Settings →
            </Link>
          </div>
        </div>

        {/* Cloudflare R2 Service Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <span className="admin-label">Object Storage</span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginTop: "0.2rem" }}>
                Cloudflare R2 Storage
              </h3>
            </div>
            <span className={`admin-pill ${r2Live ? "admin-pill--live" : "admin-pill--demo"}`}>
              <span className="admin-dot"></span>
              {r2Live ? "S3 API Active" : "Pending .env.local"}
            </span>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
            Cloudflare R2 provides S3-compatible, zero-egress object storage for screenshots, project graphics, article illustrations, and resume files.
          </p>

          <div
            style={{
              background: "#0c0d12",
              border: "1px solid var(--admin-border-subtle)",
              borderRadius: "6px",
              padding: "0.85rem 1rem",
              fontFamily: "var(--admin-font-mono)",
              fontSize: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--admin-text-muted)" }}>BUCKET_NAME:</span>
              <span style={{ color: "#fff" }}>{r2Config.bucketName || "portfolio-assets"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--admin-text-muted)" }}>PUBLIC_DOMAIN:</span>
              <span style={{ color: "#fff", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis" }}>
                {r2Config.publicDomain || "Direct /api streaming"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--admin-text-muted)" }}>STORED_OBJECTS:</span>
              <span style={{ color: "var(--admin-accent)" }}>{r2FilesCount} items uploaded</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/admin/media" className="admin-btn admin-btn-primary admin-btn-sm" style={{ width: "100%" }}>
              Open Cloudflare R2 Media Manager →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Projects Table Preview */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <span className="admin-label">[Content List / 02]</span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginTop: "0.2rem" }}>
              Selected Projects
            </h3>
          </div>
          <Link href="/admin/projects" className="admin-btn admin-btn-secondary admin-btn-sm">
            View All Projects →
          </Link>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>No.</th>
                <th>Title & Client</th>
                <th>Tech Stack</th>
                <th>Year</th>
                <th>Featured</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 4).map((p) => (
                <tr key={p.id}>
                  <td style={{ fontFamily: "var(--admin-font-mono)", color: "var(--admin-accent)" }}>
                    {p.n}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#fff" }}>{p.title}</div>
                    <div style={{ fontSize: "0.775rem", color: "var(--admin-text-muted)" }}>{p.client}</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                      {p.stack?.slice(0, 3).map((s, i) => (
                        <span key={i} className="admin-pill" style={{ background: "rgba(255,255,255,0.04)", fontSize: "0.7rem" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontFamily: "var(--admin-font-mono)", color: "var(--admin-text-muted)" }}>
                    {p.year}
                  </td>
                  <td>
                    {p.featured ? (
                      <span className="admin-pill admin-pill--live" style={{ fontSize: "0.65rem" }}>Featured</span>
                    ) : (
                      <span className="admin-pill" style={{ fontSize: "0.65rem", background: "rgba(255,255,255,0.05)" }}>Standard</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href="/admin/projects" className="admin-btn admin-btn-secondary admin-btn-sm" style={{ padding: "0.25rem 0.5rem" }}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
