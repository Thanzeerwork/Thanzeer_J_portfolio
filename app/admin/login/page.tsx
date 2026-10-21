"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from "@/lib/firebase/auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState(DEFAULT_ADMIN_PASSWORD);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLive = isFirebaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginAdmin(email, password);
      window.location.href = "/admin";
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        className="admin-card"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "2.25rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              background: "rgba(47, 91, 255, 0.1)",
              border: "1px solid rgba(47, 91, 255, 0.25)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.25rem",
              marginBottom: "1rem",
            }}
          >
            TJ
          </div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>
            Admin Control Center
          </h1>
          <p className="admin-label" style={{ color: "var(--admin-text-muted)" }}>
            [Portfolio & Content Management]
          </p>
        </div>

        {/* Backend Status indicator */}
        <div
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            background: isLive ? "rgba(16, 185, 129, 0.08)" : "rgba(245, 158, 11, 0.08)",
            border: `1px solid ${isLive ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)"}`,
            marginBottom: "1.5rem",
            fontSize: "0.8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              className="admin-dot"
              style={{
                backgroundColor: isLive ? "var(--admin-green)" : "var(--admin-amber)",
              }}
            ></span>
            <span style={{ color: isLive ? "var(--admin-green)" : "var(--admin-amber)", fontWeight: 500 }}>
              {isLive ? "Firebase Connected" : "Local Sandbox Mode"}
            </span>
          </div>
          <span className="admin-label" style={{ fontSize: "0.65rem" }}>
            {isLive ? "Live Cloud Firestore" : "Local State"}
          </span>
        </div>

        {error && (
          <div
            style={{
              padding: "0.75rem",
              borderRadius: "6px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              color: "#f87171",
              fontSize: "0.825rem",
              marginBottom: "1.25rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
              Admin Email
            </label>
            <input
              type="email"
              required
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="thanzeerwork@gmail.com"
            />
          </div>

          <div>
            <label className="admin-label" style={{ display: "block", marginBottom: "0.4rem" }}>
              Password
            </label>
            <input
              type="password"
              required
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            {loading ? "Authenticating..." : "Sign in to Dashboard →"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p className="admin-label" style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
            Tip: Configure Firebase & Cloudflare R2 credentials in <code>.env.local</code>
          </p>
        </div>
      </div>
    </div>
  );
}
