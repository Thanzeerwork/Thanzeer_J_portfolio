"use client";

import React, { useEffect, useState } from "react";
import { fetchBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/firebase/firestore";
import { BlogPostMeta } from "@/data/blog";

const EMPTY_POST: BlogPostMeta = {
  slug: "",
  title: "",
  date: new Date().toISOString().split("T")[0],
  formattedDate: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
  topic: "Web Architecture",
  topicSlug: "dev",
  readingTime: "5 min",
  excerpt: "",
  featured: true,
  image: "",
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPostMeta | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetchBlogPosts();
      setPosts(res.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleOpenEdit = (post: BlogPostMeta) => {
    setEditingPost({ ...post });
    setIsNew(false);
  };

  const handleOpenNew = () => {
    setEditingPost({
      ...EMPTY_POST,
      slug: `article-${Date.now()}`,
    });
    setIsNew(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    setSaving(true);
    setNotice(null);

    try {
      const cleanSlug = editingPost.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
      const postToSave: BlogPostMeta = {
        ...editingPost,
        slug: cleanSlug,
      };

      const res = await saveBlogPost(postToSave);
      if (res.liveFirestore) {
        setNotice(`Article "${postToSave.title}" saved directly to Cloud Firestore!`);
      } else {
        setNotice(`Article "${postToSave.title}" saved locally. (Note: Firestore rules currently locked in Firebase Console)`);
      }
      setEditingPost(null);
      await loadPosts();
    } catch (err: any) {
      alert("Error saving post: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete article "${title}"?`)) return;
    try {
      const res = await deleteBlogPost(slug);
      if (res.liveFirestore) {
        setNotice(`Article "${title}" deleted from Cloud Firestore.`);
      } else {
        setNotice(`Article "${title}" deleted locally.`);
      }
      await loadPosts();
    } catch (err: any) {
      alert("Error deleting article: " + err.message);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="admin-label">[Collection / 02]</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginTop: "0.25rem" }}>
            Blog Articles Manager
          </h1>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Publish and manage architectural writeups, tutorials, and development insights.
          </p>
        </div>

        <button onClick={handleOpenNew} className="admin-btn admin-btn-primary">
          <span>+ Write New Article</span>
        </button>
      </div>

      {notice && (
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            color: "var(--admin-green)",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>✓ {notice}</span>
          <button onClick={() => setNotice(null)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>×</button>
        </div>
      )}

      {/* Blog Posts Table */}
      <div className="admin-card">
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title & Slug</th>
                <th>Topic</th>
                <th>Date</th>
                <th>Reading Time</th>
                <th>Featured</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--admin-text-muted)" }}>
                    Loading articles...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--admin-text-muted)" }}>
                    No blog posts found. Click "+ Write New Article" to create one.
                  </td>
                </tr>
              ) : (
                posts.map((p) => (
                  <tr key={p.slug}>
                    <td>
                      <div style={{ fontWeight: 600, color: "#fff" }}>{p.title}</div>
                      <div style={{ fontSize: "0.775rem", color: "var(--admin-text-muted)", fontFamily: "var(--admin-font-mono)" }}>
                        /blog/{p.slug}
                      </div>
                    </td>
                    <td>
                      <span className="admin-pill" style={{ background: "rgba(255,255,255,0.05)" }}>
                        {p.topic}
                      </span>
                    </td>
                    <td style={{ fontFamily: "var(--admin-font-mono)", color: "var(--admin-text-muted)" }}>
                      {p.formattedDate || p.date}
                    </td>
                    <td style={{ fontFamily: "var(--admin-font-mono)", color: "var(--admin-text-muted)" }}>
                      {p.readingTime}
                    </td>
                    <td>
                      {p.featured ? (
                        <span className="admin-pill admin-pill--live" style={{ fontSize: "0.65rem" }}>Featured</span>
                      ) : (
                        <span className="admin-pill" style={{ fontSize: "0.65rem", background: "rgba(255,255,255,0.05)" }}>Standard</span>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.slug, p.title)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {editingPost && (
        <div className="admin-modal-backdrop" onClick={() => setEditingPost(null)}>
          <div className="admin-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid var(--admin-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span className="admin-label">[{isNew ? "Create" : "Edit"} Article]</span>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginTop: "0.2rem" }}>
                  {isNew ? "Write New Article" : editingPost.title}
                </h2>
              </div>
              <button
                onClick={() => setEditingPost(null)}
                style={{ background: "none", border: "none", color: "var(--admin-text-muted)", fontSize: "1.25rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  value={editingPost.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoSlug = isNew ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : editingPost.slug;
                    setEditingPost({ ...editingPost, title, slug: autoSlug });
                  }}
                  placeholder="Architecting Scalable Mobile Backends with Supabase"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    placeholder="architecting-scalable-mobile-backends"
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Topic Category
                  </label>
                  <select
                    className="admin-select"
                    value={editingPost.topic}
                    onChange={(e) => setEditingPost({ ...editingPost, topic: e.target.value, topicSlug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  >
                    <option value="Dev">Dev</option>
                    <option value="AI in practice">AI in practice</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Engineering">Mobile Engineering</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Publication Date
                  </label>
                  <input
                    type="date"
                    required
                    className="admin-input"
                    value={editingPost.date}
                    onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value, formattedDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Formatted Date
                  </label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingPost.formattedDate || editingPost.date}
                    onChange={(e) => setEditingPost({ ...editingPost, formattedDate: e.target.value })}
                    placeholder="21 Oct 2026"
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Reading Time
                  </label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingPost.readingTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readingTime: e.target.value })}
                    placeholder="8 min"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Cover Image URL (Paste Cloudflare R2 URL or local asset)
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingPost.image || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                  placeholder="https://pub-xxxx.r2.dev/blog/cover.webp"
                />
              </div>

              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Excerpt / Brief Description
                </label>
                <textarea
                  className="admin-textarea"
                  rows={3}
                  required
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="Key takeaways and summary for article cards and RSS feeds..."
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                <input
                  type="checkbox"
                  id="featured-blog-toggle"
                  checked={editingPost.featured}
                  onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                  style={{ width: "16px", height: "16px", accentColor: "var(--admin-accent)" }}
                />
                <label htmlFor="featured-blog-toggle" style={{ fontSize: "0.85rem", color: "#fff", cursor: "pointer" }}>
                  Feature on Blog home & main highlights
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem", borderTop: "1px solid var(--admin-border)", paddingTop: "1.25rem" }}>
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? "Saving to Firestore..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
