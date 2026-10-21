"use client";

import React, { useEffect, useState } from "react";
import { fetchSiteSettings, saveSiteSettings, SiteSettings, DEFAULT_SETTINGS } from "@/lib/firebase/firestore";
import { isFirebaseConfigured, getFirebaseConfig } from "@/lib/firebase/config";
import { isR2Configured, getR2Config } from "@/lib/r2/client";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const fbLive = isFirebaseConfigured();
  const fbConfig = getFirebaseConfig();
  const r2Live = isR2Configured();
  const r2Config = getR2Config();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchSiteSettings();
        setSettings(res.settings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);

    try {
      await saveSiteSettings(settings);
      setNotice(
        fbLive
          ? "Site & profile settings successfully saved to Firebase Firestore!"
          : "Settings updated in local admin storage. Set Firebase credentials in .env.local to persist directly to live Firestore."
      );
    } catch (err: any) {
      alert("Error saving settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="admin-label">[Configuration / 04]</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginTop: "0.25rem" }}>
            Site & Profile Settings
          </h1>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Configure bio, developer credentials, contact information, and storage settings.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn admin-btn-primary"
        >
          {saving ? "Saving to Firestore..." : "Save Settings ✓"}
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

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.75rem", alignItems: "start" }}>
        {/* Main Settings Form */}
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Identity Section */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="admin-label">01. Identity & Role</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Professional Tagline
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                  Developer Bio / About Description
                </label>
                <textarea
                  className="admin-textarea"
                  rows={4}
                  required
                  value={settings.bio}
                  onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Contact & Availability */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="admin-label">02. Contact & Availability</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="admin-input"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Location & Time Zone
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={settings.location}
                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Availability Status
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={settings.status}
                    onChange={(e) => setSettings({ ...settings, status: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels & Resume Asset */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="admin-label">03. Social Channels & Resume Asset</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    required
                    className="admin-input"
                    value={settings.linkedinUrl}
                    onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    required
                    className="admin-input"
                    value={settings.githubUrl}
                    onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Company Website URL
                  </label>
                  <input
                    type="url"
                    required
                    className="admin-input"
                    value={settings.companyUrl}
                    onChange={(e) => setSettings({ ...settings, companyUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Resume PDF Asset URL (R2 URL or /resume.pdf)
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={settings.resumePdfUrl}
                    onChange={(e) => setSettings({ ...settings, resumePdfUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={saving}
              className="admin-btn admin-btn-primary"
              style={{ minWidth: "160px" }}
            >
              {saving ? "Saving to Firestore..." : "Save Settings ✓"}
            </button>
          </div>
        </form>

        {/* Sidebar Status Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Environment Status Card */}
          <div className="admin-card">
            <span className="admin-label">Services Status</span>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--admin-text)" }}>Firebase Firestore</span>
                <span className={`admin-pill ${fbLive ? "admin-pill--live" : "admin-pill--demo"}`} style={{ fontSize: "0.65rem" }}>
                  {fbLive ? "Connected" : "Local State"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--admin-text)" }}>Cloudflare R2 S3 API</span>
                <span className={`admin-pill ${r2Live ? "admin-pill--live" : "admin-pill--demo"}`} style={{ fontSize: "0.65rem" }}>
                  {r2Live ? "Active" : "Local Mock"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Setup Instructions */}
          <div className="admin-card">
            <span className="admin-label">Environment Setup</span>
            <p style={{ fontSize: "0.8rem", color: "var(--admin-text-muted)", marginTop: "0.5rem", lineHeight: 1.5 }}>
              Add your Firebase and Cloudflare R2 credentials to <code>.env.local</code> to link real cloud services:
            </p>

            <pre
              style={{
                marginTop: "0.75rem",
                padding: "0.75rem",
                background: "#08090c",
                borderRadius: "6px",
                fontFamily: "var(--admin-font-mono)",
                fontSize: "0.675rem",
                color: "#7094ff",
                overflowX: "auto",
                border: "1px solid var(--admin-border-subtle)",
              }}
            >
{`# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...

# Cloudflare R2
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=...
NEXT_PUBLIC_R2_PUBLIC_DOMAIN=...`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
