"use client";

import React, { useEffect, useState, useRef } from "react";
import { fetchBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/firebase/firestore";
import { BlogPostMeta } from "@/data/blog";
import RichContentEditor from "@/components/admin/RichContentEditor";

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
  content: "",
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPostMeta | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Cover Image direct file upload states
  const [uploadingCover, setUploadingCover] = useState(false);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [showCoverR2Picker, setShowCoverR2Picker] = useState(false);
  const [coverR2MediaList, setCoverR2MediaList] = useState<any[]>([]);
  const [loadingCoverR2, setLoadingCoverR2] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

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
    setEditingPost({ ...post, content: post.content || "" });
    setIsNew(false);
  };

  const handleOpenNew = () => {
    setEditingPost({
      ...EMPTY_POST,
      slug: `article-${Date.now()}`,
      content: "",
    });
    setIsNew(true);
  };

  const handleCoverUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingPost) return;
    const file = files[0];
    setUploadingCover(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blog");

      const res = await fetch("/api/admin/r2/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image to Cloudflare R2");
      }

      setEditingPost((prev) => (prev ? { ...prev, image: data.file.url } : null));
    } catch (err: any) {
      alert("Cover image upload error: " + err.message);
    } finally {
      setUploadingCover(false);
      if (coverFileInputRef.current) coverFileInputRef.current.value = "";
    }
  };

  const loadCoverR2Library = async () => {
    setShowCoverR2Picker(true);
    setLoadingCoverR2(true);
    try {
      const res = await fetch("/api/admin/r2/list");
      const data = await res.json();
      setCoverR2MediaList(data.objects || []);
    } catch (err) {
      console.error("Failed to load R2 media:", err);
    } finally {
      setLoadingCoverR2(false);
    }
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
          <div className="admin-modal-panel admin-modal-panel-lg" onClick={(e) => e.stopPropagation()}>
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

            <form onSubmit={handleSave} style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.35rem" }}>
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

              {/* Cover Image Upload (Direct from files + R2) */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label className="admin-label">
                    Cover Image [Cloudflare R2 Object Storage]
                  </label>
                  {editingPost.image && (
                    <span className="admin-pill admin-pill--live" style={{ fontSize: "0.65rem" }}>
                      Cover Image Connected
                    </span>
                  )}
                </div>

                <div
                  style={{
                    border: "1px solid var(--admin-border)",
                    borderRadius: "8px",
                    padding: "1rem",
                    background: "rgba(255,255,255,0.015)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {editingPost.image ? (
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                      <div
                        style={{
                          width: "120px",
                          height: "80px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: "1px solid var(--admin-border)",
                          background: "#000",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={editingPost.image}
                          alt="Cover Preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <p style={{ fontSize: "0.75rem", color: "var(--admin-text-muted)", wordBreak: "break-all", marginBottom: "0.5rem", fontFamily: "var(--admin-font-mono)" }}>
                          {editingPost.image}
                        </p>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            type="button"
                            onClick={() => coverFileInputRef.current?.click()}
                            disabled={uploadingCover}
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                          >
                            {uploadingCover ? "Uploading..." : "Replace Image"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingPost({ ...editingPost, image: "" })}
                            className="admin-btn admin-btn-danger admin-btn-sm"
                          >
                            Remove
                          </button>
                          <a
                            href={editingPost.image}
                            target="_blank"
                            rel="noreferrer"
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                          >
                            View Full ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => coverFileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingCover(true); }}
                      onDragLeave={() => setIsDraggingCover(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingCover(false);
                        handleCoverUpload(e.dataTransfer.files);
                      }}
                      style={{
                        border: isDraggingCover ? "2px dashed var(--admin-accent)" : "1px dashed rgba(255, 255, 255, 0.15)",
                        borderRadius: "6px",
                        padding: "1.5rem",
                        textAlign: "center",
                        cursor: "pointer",
                        background: isDraggingCover ? "rgba(47, 91, 255, 0.08)" : "transparent",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ fontSize: "1.75rem", marginBottom: "0.35rem" }}>📷</div>
                      <p style={{ fontWeight: 600, color: "#fff", fontSize: "0.875rem", marginBottom: "0.2rem" }}>
                        {uploadingCover ? "Uploading to Cloudflare R2 bucket..." : "Click or drag & drop article cover image from files"}
                      </p>
                      <p style={{ fontSize: "0.725rem", color: "var(--admin-text-muted)" }}>
                        Uploads directly from your computer to Cloudflare R2 /blog/ folder (WebP, PNG, JPG, SVG)
                      </p>
                    </div>
                  )}

                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleCoverUpload(e.target.files)}
                  />

                  {/* Manual URL input or Choose from R2 */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="url"
                      className="admin-input"
                      placeholder="Or enter direct image URL (https://pub-xxx.r2.dev/blog/...)"
                      value={editingPost.image || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                      style={{ fontSize: "0.775rem" }}
                    />
                    <button
                      type="button"
                      onClick={loadCoverR2Library}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Browse R2 Media
                    </button>
                  </div>
                </div>
              </div>

              {/* Brief Excerpt / Summary */}
              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Excerpt / Brief Description (Summary for cards &amp; feeds)
                </label>
                <textarea
                  className="admin-textarea"
                  rows={2}
                  required
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="Key takeaways and summary for article cards and RSS feeds..."
                />
              </div>

              {/* Full Article Content with Direct File Image Upload */}
              <RichContentEditor
                value={editingPost.content || ""}
                onChange={(content) => setEditingPost({ ...editingPost, content })}
                folder="blog"
                label="Article Content &amp; Detailed Description (with Direct Images)"
                placeholder="Write the full article content here in Markdown...&#10;&#10;## Introduction&#10;Explain the problem or architectural challenge...&#10;&#10;Click '📷 Add Image from File' above or drag &amp; drop photos directly here to embed diagrams, screenshots, or code walkthroughs!&#10;&#10;```typescript&#10;// Code snippet&#10;console.log('Production ready');&#10;```&#10;&#10;## Conclusion&#10;Key takeaways and learnings..."
              />

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                <input
                  type="checkbox"
                  id="featured-blog-toggle"
                  checked={editingPost.featured}
                  onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                  style={{ width: "16px", height: "16px", accentColor: "var(--admin-accent)" }}
                />
                <label htmlFor="featured-blog-toggle" style={{ fontSize: "0.85rem", color: "#fff", cursor: "pointer" }}>
                  Feature on Blog home &amp; main highlights
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

            {/* Modal for Cover R2 Picker */}
            {showCoverR2Picker && (
              <div className="admin-modal-backdrop" onClick={() => setShowCoverR2Picker(false)}>
                <div
                  className="admin-modal-panel"
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxWidth: "700px", maxHeight: "80vh", display: "flex", flexDirection: "column" }}
                >
                  <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--admin-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="admin-label">Select Cover Image from Cloudflare R2</span>
                    <button
                      type="button"
                      onClick={() => setShowCoverR2Picker(false)}
                      style={{ background: "none", border: "none", color: "var(--admin-text-muted)", fontSize: "1.25rem", cursor: "pointer" }}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ padding: "1.25rem", overflowY: "auto", flex: 1 }}>
                    {loadingCoverR2 ? (
                      <p style={{ textAlign: "center", padding: "2rem", color: "var(--admin-text-muted)" }}>Loading assets...</p>
                    ) : coverR2MediaList.length === 0 ? (
                      <p style={{ textAlign: "center", padding: "2rem", color: "var(--admin-text-muted)" }}>No assets found.</p>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem" }}>
                        {coverR2MediaList.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setEditingPost({ ...editingPost, image: item.url });
                              setShowCoverR2Picker(false);
                            }}
                            style={{
                              border: "1px solid var(--admin-border)",
                              borderRadius: "6px",
                              padding: "0.4rem",
                              background: "rgba(255,255,255,0.02)",
                              cursor: "pointer",
                            }}
                          >
                            <img src={item.url} alt={item.key} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "4px" }} />
                            <span style={{ fontSize: "0.675rem", color: "var(--admin-text-muted)", display: "block", marginTop: "0.3rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {item.key.split("/").pop()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
