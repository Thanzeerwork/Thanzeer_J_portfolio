"use client";

import React, { useEffect, useState, useRef } from "react";
import { fetchProjects, saveProject, deleteProject } from "@/lib/firebase/firestore";
import { Project, ProjectMetric } from "@/data/projects";
import RichContentEditor from "@/components/admin/RichContentEditor";

const EMPTY_PROJECT: Project = {
  id: "",
  n: "01",
  title: "",
  client: "",
  year: "2026",
  stack: ["React.js", "Tailwind CSS"],
  summary: "",
  role: "Full-Stack Web Developer",
  challenge: "",
  solution: "",
  metrics: [
    { label: "Status", value: "Production" },
    { label: "Performance", value: "99+" },
  ],
  deliverables: ["Responsive UI", "REST API", "Database Setup"],
  featured: true,
  liveUrl: "",
  githubUrl: "",
  accent: "#2f5bff",
  imageUrl: "",
  content: "",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Form states
  const [stackInput, setStackInput] = useState("");
  const [deliverablesInput, setDeliverablesInput] = useState("");

  // Image Upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showR2Picker, setShowR2Picker] = useState(false);
  const [r2MediaList, setR2MediaList] = useState<any[]>([]);
  const [loadingR2Media, setLoadingR2Media] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetchProjects();
      setProjects(res.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenEdit = (project: Project) => {
    setEditingProject({
      ...project,
      imageUrl: project.imageUrl || "",
      content: project.content || project.description || "",
    });
    setStackInput((project.stack || []).join(", "));
    setDeliverablesInput((project.deliverables || []).join(", "));
    setIsNew(false);
  };

  const handleOpenNew = () => {
    const nextN = String(projects.length + 1).padStart(2, "0");
    const newProj: Project = {
      ...EMPTY_PROJECT,
      id: `project-${Date.now()}`,
      n: nextN,
      imageUrl: "",
      content: "",
    };
    setEditingProject(newProj);
    setStackInput(newProj.stack.join(", "));
    setDeliverablesInput(newProj.deliverables.join(", "));
    setIsNew(true);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingProject) return;
    const file = files[0];
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "projects");

      const res = await fetch("/api/admin/r2/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image to Cloudflare R2");
      }

      setEditingProject((prev) => (prev ? { ...prev, imageUrl: data.file.url } : null));
    } catch (err: any) {
      alert("Image upload error: " + err.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const loadR2Library = async () => {
    setShowR2Picker(true);
    setLoadingR2Media(true);
    try {
      const res = await fetch("/api/admin/r2/list");
      const data = await res.json();
      setR2MediaList(data.objects || []);
    } catch (err) {
      console.error("Failed to load R2 library:", err);
    } finally {
      setLoadingR2Media(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    setNotice(null);

    try {
      const formatted: Project = {
        ...editingProject,
        id: editingProject.id.trim() || `proj-${Date.now()}`,
        stack: stackInput.split(",").map((s) => s.trim()).filter(Boolean),
        deliverables: deliverablesInput.split(",").map((d) => d.trim()).filter(Boolean),
      };

      const res = await saveProject(formatted);
      if (res.liveFirestore) {
        setNotice(`Project "${formatted.title}" saved directly to Cloud Firestore!`);
      } else {
        setNotice(`Project "${formatted.title}" saved locally. (Note: Firestore rules currently locked in Firebase Console)`);
      }
      setEditingProject(null);
      await loadProjects();
    } catch (err: any) {
      alert("Error saving project: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await deleteProject(id);
      if (res.liveFirestore) {
        setNotice(`Project "${title}" deleted from Cloud Firestore.`);
      } else {
        setNotice(`Project "${title}" deleted locally.`);
      }
      await loadProjects();
    } catch (err: any) {
      alert("Error deleting: " + err.message);
    }
  };

  // Helper for metrics
  const updateMetric = (index: number, field: "label" | "value", val: string) => {
    if (!editingProject) return;
    const metrics = [...(editingProject.metrics || [])];
    if (metrics[index]) {
      metrics[index][field] = val;
      setEditingProject({ ...editingProject, metrics });
    }
  };

  const addMetric = () => {
    if (!editingProject) return;
    const metrics = [...(editingProject.metrics || []), { label: "Metric", value: "100%" }];
    setEditingProject({ ...editingProject, metrics });
  };

  const removeMetric = (index: number) => {
    if (!editingProject) return;
    const metrics = (editingProject.metrics || []).filter((_, i) => i !== index);
    setEditingProject({ ...editingProject, metrics });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="admin-label">[Collection / 01]</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginTop: "0.25rem" }}>
            Projects Manager
          </h1>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Manage featured applications, live websites, and architectural case studies.
          </p>
        </div>

        <button onClick={handleOpenNew} className="admin-btn admin-btn-primary">
          <span>+ Create New Project</span>
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

      {/* Projects Table */}
      <div className="admin-card">
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>No.</th>
                <th style={{ width: "70px" }}>Cover</th>
                <th>Title & Role</th>
                <th>Client / Category</th>
                <th>Tech Stack</th>
                <th>Metrics</th>
                <th>Featured</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "var(--admin-text-muted)" }}>
                    Loading projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "var(--admin-text-muted)" }}>
                    No projects found. Click "+ Create New Project" to add one.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: "var(--admin-font-mono)", color: "var(--admin-accent)" }}>
                      {p.n}
                    </td>
                    <td>
                      {p.imageUrl ? (
                        <div
                          style={{
                            width: "52px",
                            height: "36px",
                            borderRadius: "4px",
                            overflow: "hidden",
                            border: "1px solid var(--admin-border)",
                            background: "rgba(0,0,0,0.5)",
                          }}
                        >
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "52px",
                            height: "36px",
                            borderRadius: "4px",
                            border: "1px dashed var(--admin-border)",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "0.6rem",
                            color: "var(--admin-text-muted)",
                          }}
                        >
                          None
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "#fff" }}>{p.title}</div>
                      <div style={{ fontSize: "0.775rem", color: "var(--admin-text-muted)" }}>{p.role}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>{p.client}</span>
                      <div style={{ fontSize: "0.75rem", color: "var(--admin-text-muted)", fontFamily: "var(--admin-font-mono)" }}>
                        {p.year}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", maxWidth: "260px" }}>
                        {p.stack?.map((s, idx) => (
                          <span
                            key={idx}
                            className="admin-pill"
                            style={{ background: "rgba(255,255,255,0.04)", fontSize: "0.675rem" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {p.metrics?.slice(0, 2).map((m, idx) => (
                          <span key={idx} className="admin-pill admin-pill--accent" style={{ fontSize: "0.65rem" }}>
                            {m.label}: {m.value}
                          </span>
                        ))}
                      </div>
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
                          onClick={() => handleDelete(p.id, p.title)}
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

      {/* Create / Edit Modal */}
      {editingProject && (
        <div className="admin-modal-backdrop" onClick={() => setEditingProject(null)}>
          <div className="admin-modal-panel admin-modal-panel-lg" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid var(--admin-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span className="admin-label">[{isNew ? "Create" : "Edit"} Project]</span>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginTop: "0.2rem" }}>
                  {isNew ? "Add New Project" : editingProject.title}
                </h2>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                style={{ background: "none", border: "none", color: "var(--admin-text-muted)", fontSize: "1.25rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Project Identifier / Slug (id)
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={editingProject.id}
                    onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value })}
                    placeholder="e.g. ryphtech"
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Index Number (n)
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={editingProject.n}
                    onChange={(e) => setEditingProject({ ...editingProject, n: e.target.value })}
                    placeholder="01"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="RyphTech: Technology Brand & Web Platform"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Client / Subtitle
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    placeholder="Business Website · Live at ryphtech.in"
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Year
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    placeholder="2026"
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Accent Color
                  </label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingProject.accent || "#2f5bff"}
                    onChange={(e) => setEditingProject({ ...editingProject, accent: e.target.value })}
                    placeholder="#2f5bff"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Role
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingProject.role}
                  onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                  placeholder="Full-Stack Web Developer"
                />
              </div>

              {/* Project Cover Image Upload (Cloudflare R2) */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label className="admin-label">
                    Project Cover Image [Cloudflare R2 Object Storage]
                  </label>
                  {editingProject.imageUrl && (
                    <span className="admin-pill admin-pill--live" style={{ fontSize: "0.65rem" }}>
                      Connected to R2
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
                  {editingProject.imageUrl ? (
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
                          src={editingProject.imageUrl}
                          alt="Project Cover Preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <p style={{ fontSize: "0.75rem", color: "var(--admin-text-muted)", wordBreak: "break-all", marginBottom: "0.5rem", fontFamily: "var(--admin-font-mono)" }}>
                          {editingProject.imageUrl}
                        </p>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                          >
                            {uploadingImage ? "Uploading..." : "Replace Image"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProject({ ...editingProject, imageUrl: "" })}
                            className="admin-btn admin-btn-danger admin-btn-sm"
                          >
                            Remove
                          </button>
                          <a
                            href={editingProject.imageUrl}
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
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleImageUpload(e.dataTransfer.files);
                      }}
                      style={{
                        border: isDragging ? "2px dashed var(--admin-accent)" : "1px dashed rgba(255, 255, 255, 0.15)",
                        borderRadius: "6px",
                        padding: "1.5rem",
                        textAlign: "center",
                        cursor: "pointer",
                        background: isDragging ? "rgba(47, 91, 255, 0.08)" : "transparent",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ fontSize: "1.75rem", marginBottom: "0.35rem" }}>☁️</div>
                      <p style={{ fontWeight: 600, color: "#fff", fontSize: "0.875rem", marginBottom: "0.2rem" }}>
                        {uploadingImage ? "Uploading to Cloudflare R2 bucket..." : "Click or drag & drop project image to upload"}
                      </p>
                      <p style={{ fontSize: "0.725rem", color: "var(--admin-text-muted)" }}>
                        Uploads directly to Cloudflare R2 /projects/ folder (WebP, PNG, JPG, SVG)
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />

                  {/* Manual URL input or Choose from R2 */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="url"
                      className="admin-input"
                      placeholder="Or enter direct R2 image URL (https://pub-xxx.r2.dev/projects/...)"
                      value={editingProject.imageUrl || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                      style={{ fontSize: "0.775rem" }}
                    />
                    <button
                      type="button"
                      onClick={loadR2Library}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Browse R2 Media
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Summary / Brief Description (for project cards &amp; overview)
                </label>
                <textarea
                  className="admin-textarea"
                  rows={2}
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  placeholder="Brief summary of the application..."
                />
              </div>

              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Technical Stack (comma separated)
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  placeholder="React.js, Tailwind CSS, Vite, Cloud Firestore"
                />
              </div>

              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Challenge
                </label>
                <textarea
                  className="admin-textarea"
                  rows={2}
                  value={editingProject.challenge}
                  onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                  placeholder="The architectural or engineering challenge..."
                />
              </div>

              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Engineering Solution
                </label>
                <textarea
                  className="admin-textarea"
                  rows={2}
                  value={editingProject.solution}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  placeholder="How you architected and built the solution..."
                />
              </div>

              {/* Detailed Description & Case Study Contents with Direct File Image Upload */}
              <RichContentEditor
                value={editingProject.content || editingProject.description || ""}
                onChange={(content) =>
                  setEditingProject({
                    ...editingProject,
                    content,
                    description: content,
                  })
                }
                folder="projects"
                label="Detailed Description &amp; Case Study Contents (with Direct Images)"
                placeholder="Write an in-depth case study and architectural breakdown in Markdown...&#10;&#10;## Project Architecture&#10;Detail the system design, frontend state management, and API design...&#10;&#10;Click '📷 Add Image from File' above or drag &amp; drop photos directly here to embed UI screenshots, wireframes, and architecture diagrams!&#10;&#10;```typescript&#10;// Key implementation code&#10;```&#10;&#10;## Technical Challenges &amp; Key Insights&#10;What made this build unique and how was it achieved?"
              />

              {/* Metrics Editor */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label className="admin-label">Key Metrics</label>
                  <button type="button" onClick={addMetric} className="admin-btn admin-btn-secondary admin-btn-sm" style={{ padding: "0.15rem 0.4rem", fontSize: "0.7rem" }}>
                    + Add Metric
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {(editingProject.metrics || []).map((m, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "0.5rem" }}>
                      <input
                        type="text"
                        className="admin-input"
                        style={{ flex: 1 }}
                        placeholder="Label (e.g. Lighthouse)"
                        value={m.label}
                        onChange={(e) => updateMetric(idx, "label", e.target.value)}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        style={{ flex: 1 }}
                        placeholder="Value (e.g. 99+)"
                        value={m.value}
                        onChange={(e) => updateMetric(idx, "value", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeMetric(idx)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        style={{ padding: "0 0.5rem" }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Deliverables (comma separated)
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={deliverablesInput}
                  onChange={(e) => setDeliverablesInput(e.target.value)}
                  placeholder="Interactive UI, REST APIs, Cloud Deployment"
                />
              </div>

              {/* URLs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Live URL (Optional)
                  </label>
                  <input
                    type="url"
                    className="admin-input"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://ryphtech.in"
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    className="admin-input"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/Thanzeerwork/repo"
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={editingProject.featured}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  style={{ width: "16px", height: "16px", accentColor: "var(--admin-accent)" }}
                />
                <label htmlFor="featured-toggle" style={{ fontSize: "0.85rem", color: "#fff", cursor: "pointer" }}>
                  Highlight as Featured Showcase Project
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem", borderTop: "1px solid var(--admin-border)", paddingTop: "1.25rem" }}>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? "Saving to Firestore..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* R2 Media Library Picker Sub-Modal */}
      {showR2Picker && (
        <div className="admin-modal-backdrop" style={{ zIndex: 60 }} onClick={() => setShowR2Picker(false)}>
          <div className="admin-modal-panel" style={{ maxWidth: "680px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--admin-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span className="admin-label">[Cloudflare R2 Object Storage]</span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginTop: "0.2rem" }}>
                  Select from R2 Media Library
                </h3>
              </div>
              <button
                onClick={() => setShowR2Picker(false)}
                style={{ background: "none", border: "none", color: "var(--admin-text-muted)", fontSize: "1.25rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: "1.25rem", maxHeight: "420px", overflowY: "auto" }}>
              {loadingR2Media ? (
                <div style={{ textAlign: "center", padding: "2.5rem", color: "var(--admin-text-muted)" }}>
                  <p>Loading Cloudflare R2 bucket objects...</p>
                </div>
              ) : r2MediaList.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2.5rem", color: "var(--admin-text-muted)" }}>
                  <p>No objects found in your R2 bucket.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem" }}>
                  {r2MediaList.map((item) => (
                    <div
                      key={item.key}
                      onClick={() => {
                        setEditingProject((prev) => (prev ? { ...prev, imageUrl: item.url } : null));
                        setShowR2Picker(false);
                      }}
                      style={{
                        border: "1px solid var(--admin-border)",
                        borderRadius: "6px",
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "rgba(0,0,0,0.4)",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--admin-accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--admin-border)")}
                    >
                      <div style={{ width: "100%", height: "85px", background: "#05070a", display: "grid", placeItems: "center" }}>
                        {item.contentType?.includes("image") || item.key.match(/\.(webp|png|jpg|jpeg|svg|gif)$/i) ? (
                          <img src={item.url} alt={item.key} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span style={{ fontSize: "1.5rem" }}>📄</span>
                        )}
                      </div>
                      <div style={{ padding: "0.45rem", fontSize: "0.675rem", color: "var(--admin-text-muted)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {item.key.split("/").pop()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--admin-border)", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setShowR2Picker(false)} className="admin-btn admin-btn-secondary admin-btn-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
