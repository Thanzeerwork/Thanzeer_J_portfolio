"use client";

import React, { useState, useRef } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface RichContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  folder?: "blog" | "projects" | "media";
  label?: string;
  placeholder?: string;
  minRows?: number;
}

export default function RichContentEditor({
  value,
  onChange,
  folder = "blog",
  label = "Description with Contents (Article / Case Study Body)",
  placeholder = "Write detailed content in Markdown...\n\nUse headings (## Heading), paragraphs, bullet lists, code blocks, and click 'Upload Image from File' to insert photos directly from your computer.",
  minRows = 14,
}: RichContentEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // R2 library modal state
  const [showR2Modal, setShowR2Modal] = useState(false);
  const [r2Items, setR2Items] = useState<any[]>([]);
  const [loadingR2, setLoadingR2] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Insert markdown text at cursor or wrap selection
  const insertFormatting = (prefix: string, suffix: string = "", placeholderText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + prefix + placeholderText + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || placeholderText;
    const replacement = prefix + selectedText + suffix;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  // Direct File Upload handler (uploads directly from device to R2 API)
  const handleImageFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadStatus(`Uploading ${files.length} image(s) to Cloudflare R2...`);

    let insertedText = "";

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/admin/r2/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || data.error || "Failed to upload image");
        }

        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        const imgMarkdown = `\n\n![${cleanName}](${data.file.url})\n\n`;
        insertedText += imgMarkdown;
      }

      if (insertedText) {
        // Insert at cursor
        const textarea = textareaRef.current;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const newValue = value.substring(0, start) + insertedText + value.substring(end);
          onChange(newValue);
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + insertedText.length, start + insertedText.length);
          }, 0);
        } else {
          onChange(value + insertedText);
        }
        setUploadStatus("✓ Image(s) successfully uploaded and inserted!");
        setTimeout(() => setUploadStatus(null), 4000);
      }
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
      setUploadStatus(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Browse R2 Library
  const openR2Library = async () => {
    setShowR2Modal(true);
    setLoadingR2(true);
    try {
      const res = await fetch("/api/admin/r2/list");
      const data = await res.json();
      setR2Items(data.objects || []);
    } catch (err) {
      console.error("Failed to load R2 assets:", err);
    } finally {
      setLoadingR2(false);
    }
  };

  const insertR2Image = (url: string, name: string) => {
    const cleanName = name.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Illustration";
    const markdown = `\n\n![${cleanName}](${url})\n\n`;

    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      onChange(value.substring(0, start) + markdown + value.substring(end));
    } else {
      onChange(value + markdown);
    }
    setShowR2Modal(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {/* Header with Label and Tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <label className="admin-label" style={{ fontWeight: 600, color: "#fff" }}>
          {label}
        </label>

        <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.06)", borderRadius: "6px", padding: "2px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            style={{
              background: activeTab === "write" ? "var(--admin-accent)" : "transparent",
              color: activeTab === "write" ? "#fff" : "var(--admin-text-muted)",
              border: "none",
              borderRadius: "4px",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            ✏️ Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            style={{
              background: activeTab === "preview" ? "var(--admin-accent)" : "transparent",
              color: activeTab === "preview" ? "#fff" : "var(--admin-text-muted)",
              border: "none",
              borderRadius: "4px",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            👁️ Preview ({value.split(/\s+/).filter(Boolean).length} words)
          </button>
        </div>
      </div>

      {/* Editor Box */}
      <div
        style={{
          border: isDragging ? "2px dashed var(--admin-accent)" : "1px solid var(--admin-border)",
          borderRadius: "8px",
          background: isDragging ? "rgba(47, 91, 255, 0.05)" : "#0d0f14",
          overflow: "hidden",
          transition: "border-color 0.15s ease",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleImageFiles(e.dataTransfer.files);
        }}
      >
        {/* Formatting Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.35rem",
            padding: "0.5rem 0.75rem",
            background: "rgba(255, 255, 255, 0.03)",
            borderBottom: "1px solid var(--admin-border)",
          }}
        >
          {/* Direct File Image Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="admin-btn admin-btn-sm"
            style={{
              background: "rgba(47, 91, 255, 0.2)",
              color: "#8bb2ff",
              border: "1px solid rgba(47, 91, 255, 0.4)",
              fontWeight: 600,
              padding: "0.25rem 0.65rem",
            }}
            title="Upload image directly from computer files and insert into markdown"
          >
            {uploading ? "⏳ Uploading..." : "📷 Add Image from File"}
          </button>

          <button
            type="button"
            onClick={openR2Library}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
            title="Pick from existing Cloudflare R2 assets"
          >
            📁 Browse R2
          </button>

          <span style={{ width: "1px", height: "18px", background: "var(--admin-border)", margin: "0 0.2rem" }} />

          {/* Markdown Action Buttons */}
          <button
            type="button"
            onClick={() => insertFormatting("## ", "", "Heading 2")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("### ", "", "Heading 3")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("**", "**", "bold text")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", fontWeight: "bold" }}
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*", "italic text")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", fontStyle: "italic" }}
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("- ", "", "List item")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("1. ", "", "Ordered item")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
            title="Numbered List"
          >
            1. List
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("> ", "", "Important blockquote or insight")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
            title="Blockquote"
          >
            “ Quote
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("```typescript\n", "\n```", "// write code here")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", fontFamily: "monospace" }}
            title="Code block"
          >
            &lt;/&gt;
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("[", "](https://example.com)", "link title")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
            title="Add Link"
          >
            🔗 Link
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n---\n", "", "")}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
            title="Divider"
          >
            — Line
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleImageFiles(e.target.files)}
          />
        </div>

        {/* Upload Status Banner */}
        {uploadStatus && (
          <div
            style={{
              padding: "0.4rem 0.75rem",
              background: uploadStatus.includes("✓") ? "rgba(16, 185, 129, 0.15)" : "rgba(47, 91, 255, 0.15)",
              color: uploadStatus.includes("✓") ? "var(--admin-green)" : "#8bb2ff",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              borderBottom: "1px solid var(--admin-border)",
            }}
          >
            <span>{uploadStatus}</span>
          </div>
        )}

        {/* Tab Content: Write or Preview */}
        {activeTab === "write" ? (
          <div style={{ position: "relative" }}>
            <textarea
              ref={textareaRef}
              rows={minRows}
              className="admin-textarea"
              style={{
                border: "none",
                borderRadius: 0,
                background: "transparent",
                fontFamily: "var(--admin-font-mono, monospace)",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                padding: "0.85rem",
                resize: "vertical",
                minHeight: "280px",
              }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
            />

            {/* Drop overlay hint when dragging file over */}
            {isDragging && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(47, 91, 255, 0.15)",
                  backdropFilter: "blur(2px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  pointerEvents: "none",
                }}
              >
                📥 Drop image file here to upload directly to R2 and insert into content
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              padding: "1.25rem",
              minHeight: "280px",
              maxHeight: "500px",
              overflowY: "auto",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            {value.trim() ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem", fontStyle: "italic" }}>
                No content entered yet. Switch to the ✏️ Write tab to write the article description and add images.
              </p>
            )}
          </div>
        )}

        {/* Helper footer */}
        <div
          style={{
            padding: "0.4rem 0.85rem",
            background: "rgba(255, 255, 255, 0.015)",
            borderTop: "1px solid var(--admin-border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.725rem",
            color: "var(--admin-text-muted)",
          }}
        >
          <span>
            💡 <strong>Direct File Images:</strong> Drag & drop images into editor or click <em>📷 Add Image from File</em>.
          </span>
          <span>Markdown Supported (## Headings, **bold**, lists, code blocks, images)</span>
        </div>
      </div>

      {/* R2 Media Browser Modal */}
      {showR2Modal && (
        <div className="admin-modal-backdrop" onClick={() => setShowR2Modal(false)}>
          <div
            className="admin-modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "750px", maxHeight: "80vh", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid var(--admin-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span className="admin-label">[Cloudflare R2 Media Library]</span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginTop: "0.15rem" }}>
                  Select an Asset to Insert
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowR2Modal(false)}
                style={{ background: "none", border: "none", color: "var(--admin-text-muted)", fontSize: "1.25rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "1.25rem", overflowY: "auto", flex: 1 }}>
              {loadingR2 ? (
                <p style={{ textAlign: "center", padding: "2rem", color: "var(--admin-text-muted)" }}>
                  Loading storage assets...
                </p>
              ) : r2Items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p style={{ color: "var(--admin-text-muted)", marginBottom: "1rem" }}>
                    No media items found. Use the "Add Image from File" button to upload new images directly from your computer.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowR2Modal(false);
                      fileInputRef.current?.click();
                    }}
                    className="admin-btn admin-btn-primary admin-btn-sm"
                  >
                    Upload from Device
                  </button>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem" }}>
                  {r2Items.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => insertR2Image(item.url, item.key)}
                      style={{
                        border: "1px solid var(--admin-border)",
                        borderRadius: "6px",
                        padding: "0.4rem",
                        background: "rgba(255,255,255,0.02)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.35rem",
                      }}
                      title={`Click to insert ${item.key}`}
                    >
                      <div
                        style={{
                          height: "90px",
                          borderRadius: "4px",
                          overflow: "hidden",
                          background: "#000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={item.url}
                          alt={item.key}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.675rem",
                          color: "var(--admin-text-muted)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.key.split("/").pop()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              style={{
                padding: "0.75rem 1.25rem",
                borderTop: "1px solid var(--admin-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setShowR2Modal(false);
                  fileInputRef.current?.click();
                }}
                className="admin-btn admin-btn-secondary admin-btn-sm"
              >
                + Upload New File from Device
              </button>
              <button
                type="button"
                onClick={() => setShowR2Modal(false)}
                className="admin-btn admin-btn-secondary admin-btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
