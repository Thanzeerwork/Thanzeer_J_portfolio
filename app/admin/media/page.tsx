"use client";

import React, { useEffect, useState, useRef } from "react";

interface MediaItem {
  key: string;
  size: number;
  lastModified?: string;
  url: string;
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [folder, setFolder] = useState("projects");
  const [isR2Live, setIsR2Live] = useState(false);
  const [bucketName, setBucketName] = useState("");
  const [publicDomain, setPublicDomain] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/r2/list");
      const data = await res.json();
      setItems(data.objects || []);
      setIsR2Live(Boolean(data.isConfigured));
      if (data.config) {
        setBucketName(data.config.bucketName || "");
        setPublicDomain(data.config.publicDomain || "");
      }
    } catch (err) {
      console.error("Failed to load R2 media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setNotice(null);

    let successCount = 0;
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/admin/r2/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          successCount++;
        }
      }

      setNotice(
        isR2Live
          ? `Uploaded ${successCount} asset(s) directly to Cloudflare R2 bucket "${bucketName}"!`
          : `Uploaded ${successCount} asset(s) locally. Set Cloudflare R2 credentials in .env.local to persist directly to Cloudflare R2.`
      );
      await loadMedia();
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Permanently remove "${key}" from Cloudflare R2?`)) return;

    try {
      const res = await fetch("/api/admin/r2/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (res.ok) {
        setNotice(`Deleted "${key}" from storage.`);
        await loadMedia();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete file.");
      }
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const handleCopyUrl = (url: string, key: string) => {
    const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const isImageFile = (key: string) => {
    return /\.(jpg|jpeg|png|webp|svg|gif|avif)$/i.test(key);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="admin-label">[Storage / 03]</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginTop: "0.25rem" }}>
            Cloudflare R2 Object Storage
          </h1>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            High-performance, zero-egress asset storage for images, project screenshots, and PDF documents.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className={`admin-pill ${isR2Live ? "admin-pill--live" : "admin-pill--demo"}`}>
            <span className="admin-dot"></span>
            {isR2Live ? `R2 Bucket: ${bucketName || "Live"}` : "R2 Local Sandbox"}
          </span>
          <button onClick={loadMedia} className="admin-btn admin-btn-secondary admin-btn-sm">
            Refresh ↻
          </button>
        </div>
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

      {/* Cloudflare R2 Connection Details Card */}
      <div
        className="admin-card"
        style={{
          marginBottom: "1.75rem",
          background: isR2Live ? "rgba(47, 91, 255, 0.04)" : "rgba(245, 158, 11, 0.04)",
          borderColor: isR2Live ? "rgba(47, 91, 255, 0.2)" : "rgba(245, 158, 11, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="admin-label">Cloudflare R2 Integration</span>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginTop: "0.15rem" }}>
              {isR2Live ? "S3-Compatible Cloudflare R2 API Active" : "Setup Cloudflare R2 Credentials"}
            </h3>
            <p style={{ color: "var(--admin-text-muted)", fontSize: "0.8rem", marginTop: "0.2rem" }}>
              {isR2Live
                ? `Files upload directly to Cloudflare R2 with public distribution URL: ${publicDomain || "(Direct Stream)"}`
                : "Add R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY to .env.local to link your bucket."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <span className="admin-pill" style={{ background: "rgba(255,255,255,0.06)", fontSize: "0.725rem" }}>
              Zero Egress Fees
            </span>
            <span className="admin-pill" style={{ background: "rgba(255,255,255,0.06)", fontSize: "0.725rem" }}>
              Global Edge CDN
            </span>
          </div>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="admin-card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <span className="admin-label">Target Destination Folder</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label className="admin-label" style={{ fontSize: "0.75rem" }}>Directory:</label>
            <select
              className="admin-select"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              style={{ width: "auto", padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
            >
              <option value="projects">projects/</option>
              <option value="blog">blog/</option>
              <option value="documents">documents/</option>
              <option value="general">general/</option>
            </select>
          </div>
        </div>

        <div
          className="admin-dropzone"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ display: "none" }}
          />

          <div style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>☁️</div>
          <p style={{ fontWeight: 600, color: "#fff", fontSize: "1rem", marginBottom: "0.25rem" }}>
            {uploading ? "Transferring to Cloudflare R2..." : "Click or Drag & Drop to Upload to Cloudflare R2"}
          </p>
          <p className="admin-label" style={{ color: "var(--admin-text-muted)" }}>
            PNG, JPG, WEBP, SVG, PDF up to 50MB · Stored in R2 bucket
          </p>
        </div>
      </div>

      {/* Media Items Grid */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <span className="admin-label">[Asset Catalog / 02]</span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginTop: "0.2rem" }}>
              Stored Assets ({items.length})
            </h3>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--admin-text-muted)" }}>
            Scanning Cloudflare R2 bucket...
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--admin-text-muted)" }}>
            No assets stored yet. Use the upload area above to add media to Cloudflare R2.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {items.map((item) => (
              <div
                key={item.key}
                style={{
                  background: "#0c0d12",
                  border: "1px solid var(--admin-border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.15s ease",
                }}
              >
                {/* Media Preview Box */}
                <div
                  style={{
                    height: "150px",
                    background: "#08090c",
                    borderBottom: "1px solid var(--admin-border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {isImageFile(item.key) ? (
                    <img
                      src={item.url}
                      alt={item.key}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        // Fallback icon if image fails to render
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "2.5rem" }}>📄</span>
                      <p className="admin-label" style={{ fontSize: "0.65rem", marginTop: "0.25rem" }}>
                        PDF DOCUMENT
                      </p>
                    </div>
                  )}

                  <span
                    className="admin-pill"
                    style={{
                      position: "absolute",
                      bottom: "0.5rem",
                      right: "0.5rem",
                      background: "rgba(0,0,0,0.75)",
                      fontSize: "0.65rem",
                    }}
                  >
                    {formatBytes(item.size)}
                  </span>
                </div>

                {/* Info & Actions */}
                <div style={{ padding: "0.85rem 1rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <p
                      style={{
                        fontSize: "0.825rem",
                        fontWeight: 600,
                        color: "#fff",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={item.key}
                    >
                      {item.key.split("/").pop()}
                    </p>
                    <p className="admin-label" style={{ fontSize: "0.675rem", marginTop: "0.2rem" }}>
                      {item.key.split("/")[0]}/
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                      onClick={() => handleCopyUrl(item.url, item.key)}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      style={{ flex: 1, fontSize: "0.75rem" }}
                    >
                      {copiedKey === item.key ? "✓ Copied!" : "Copy R2 URL"}
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      style={{ padding: "0 0.5rem", fontSize: "0.75rem" }}
                      title="Open in new tab"
                    >
                      ↗
                    </a>
                    <button
                      onClick={() => handleDelete(item.key)}
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      style={{ padding: "0 0.5rem", fontSize: "0.75rem" }}
                      title="Delete from R2"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
