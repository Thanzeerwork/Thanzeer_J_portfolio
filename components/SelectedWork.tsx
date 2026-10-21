"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROJECTS, type Project } from "@/data/projects";
import { fetchProjects } from "@/lib/firebase/firestore";

type ViewMode = "preview" | "architecture" | "metrics";

export function SelectedWork() {
  const [projectList, setProjectList] = useState<Project[]>(PROJECTS);
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchProjects().then((res) => {
      if (res.projects && res.projects.length > 0) {
        setProjectList(res.projects);
      }
    });
  }, []);

  const project: Project = projectList[activeIdx] || projectList[0] || PROJECTS[0];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % projectList.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + projectList.length) % projectList.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projectList.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setMousePos({ x, y });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Project Selector Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          borderBottom: "1px solid var(--line)",
          paddingBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          {projectList.map((p, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setViewMode("preview");
                }}
                className={`note ${isActive ? "note--ink" : ""}`}
                style={{
                  background: isActive ? "var(--bg-raised)" : "transparent",
                  border: isActive ? `1px solid ${p.accent || "var(--line)"}` : "1px solid transparent",
                  borderRadius: "3px",
                  padding: "0.45rem 0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s ease",
                  color: isActive ? "#fff" : "var(--muted)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ color: p.accent || "var(--accent)", fontWeight: 700 }}>
                  [{p.n}]
                </span>
                <span>{p.title.split(":")[0]}</span>
                {isActive && (
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: p.accent || "var(--accent)",
                      boxShadow: `0 0 8px ${p.accent || "var(--accent)"}`,
                      display: "inline-block",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Prev / Next controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={handlePrev}
            className="note"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              color: "var(--ink)",
              borderRadius: "3px",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
            aria-label="Previous project"
          >
            ← Prev
          </button>
          <span className="note" style={{ fontFamily: "var(--font-mono)", padding: "0 0.25rem" }}>
            {project.n} / 0{PROJECTS.length}
          </span>
          <button
            onClick={handleNext}
            className="note"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              color: "var(--ink)",
              borderRadius: "3px",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
            aria-label="Next project"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Main Selected Work Showcase Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
          alignItems: "start",
        }}
      >
        {/* Left Column: Project Details & Technical Specs (5 cols) */}
        <div
          style={{
            gridColumn: "span 12",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
          className="lg-span-5"
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span className="note" style={{ color: project.accent, fontWeight: 600 }}>
                ● Project 0{activeIdx + 1} · {project.client}
              </span>
              <span className="note" style={{ fontFamily: "var(--font-mono)" }}>
                {project.year}
              </span>
            </div>

            <h2
              className="h3"
              style={{
                fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.25,
                marginBottom: "0.6rem",
              }}
            >
              {project.title}
            </h2>

            <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
              {project.summary}
            </p>
          </div>

          {/* Technical Execution Breakdown */}
          <div
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
          >
            <div>
              <span className="note note--ink" style={{ display: "block", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                [The Challenge]
              </span>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                {project.challenge}
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.75rem" }}>
              <span className="note" style={{ color: project.accent, display: "block", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                [Engineered Solution]
              </span>
              <p style={{ fontSize: "0.875rem", color: "var(--ink)", margin: 0, lineHeight: 1.5 }}>
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <span className="note note--ink" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.75rem" }}>
              Technical Stack & Architecture
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="note"
                  style={{
                    background: "var(--bg-raised)",
                    border: "1px solid var(--line)",
                    borderRadius: "3px",
                    padding: "0.25rem 0.6rem",
                    fontSize: "0.75rem",
                    color: "var(--ink)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Metrics Strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
              gap: "1px",
              background: "var(--line)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-raised)",
                  padding: "0.75rem 0.6rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: project.accent || "var(--ink)",
                    lineHeight: 1.1,
                  }}
                >
                  {m.value}
                </div>
                <div className="note" style={{ fontSize: "0.65rem", marginTop: "0.2rem", textTransform: "uppercase" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
            <Link
              href={project.href || `/work/${project.id}`}
              className="btn btn--sm"
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
            >
              Read Full Case Study <span className="arrow">→</span>
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost btn--sm"
                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
              >
                Live Website ↗
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost btn--sm"
                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Architectural Viewport & Live Image Animation (7 cols) */}
        <div
          style={{
            gridColumn: "span 12",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
          className="lg-span-7"
        >
          {/* Viewport Frame Header & HUD Mode Switcher */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              borderBottom: "none",
              borderRadius: "6px 6px 0 0",
              padding: "0.6rem 1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
            }}
          >
            {/* Window Controls & URL bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              </div>
              <span
                style={{
                  background: "rgba(0,0,0,0.4)",
                  padding: "0.15rem 0.65rem",
                  borderRadius: "3px",
                  border: "1px solid var(--line)",
                  color: "var(--muted)",
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <span style={{ color: "#10b981" }}>🔒</span>
                {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "") : `${project.id}.app/production`}
              </span>
            </div>

            {/* View Mode Switcher */}
            <div style={{ display: "flex", gap: "0.25rem", background: "rgba(0,0,0,0.3)", padding: "2px", borderRadius: "4px" }}>
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                style={{
                  background: viewMode === "preview" ? "var(--line)" : "transparent",
                  color: viewMode === "preview" ? "#fff" : "var(--muted)",
                  border: "none",
                  borderRadius: "2px",
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.675rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Viewport
              </button>
              <button
                type="button"
                onClick={() => setViewMode("architecture")}
                style={{
                  background: viewMode === "architecture" ? "var(--line)" : "transparent",
                  color: viewMode === "architecture" ? "#fff" : "var(--muted)",
                  border: "none",
                  borderRadius: "2px",
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.675rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Architecture
              </button>
              <button
                type="button"
                onClick={() => setViewMode("metrics")}
                style={{
                  background: viewMode === "metrics" ? "var(--line)" : "transparent",
                  color: viewMode === "metrics" ? "#fff" : "var(--muted)",
                  border: "none",
                  borderRadius: "2px",
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.675rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Metrics
              </button>
            </div>
          </div>

          {/* Main Visual Display Container */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{
              aspectRatio: "16 / 10",
              background: "#05070a",
              border: "1px solid var(--line)",
              borderRadius: "0 0 6px 6px",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 0 1px ${project.accent}20`,
            }}
          >
            {/* Blueprint Grid Background Pattern */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.12,
                pointerEvents: "none",
                zIndex: 1,
              }}
            >
              <defs>
                <pattern id="viewport-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#viewport-grid)" />
            </svg>

            {/* Mode 1: Real Application Screenshot with interactive scanning & hover zoom */}
            {viewMode === "preview" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease",
                      transform: isHovered ? "scale(1.04)" : "scale(1)",
                      filter: isHovered ? "brightness(1.05) contrast(1.02)" : "brightness(0.96)",
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    [Project Viewport Preview]
                  </div>
                )}

                {/* Subtle blueprint scanline sweeping across */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(180deg, transparent 0%, ${project.accent}15 50%, transparent 100%)`,
                    height: "15%",
                    width: "100%",
                    pointerEvents: "none",
                    animation: "viewportScan 4s linear infinite",
                  }}
                />

                {/* Technical HUD Overlay on hover / viewport */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    insetInline: 0,
                    padding: "0.85rem 1rem",
                    background: "linear-gradient(to top, rgba(5,7,10,0.95) 0%, rgba(5,7,10,0.7) 65%, transparent 100%)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    zIndex: 2,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.2rem" }}>
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#10b981",
                          boxShadow: "0 0 6px #10b981",
                        }}
                      />
                      <span className="note note--ink" style={{ fontSize: "0.685rem", letterSpacing: "0.06em" }}>
                        PRODUCTION VIEWPORT · 1440 × 900
                      </span>
                    </div>
                    <span className="note" style={{ fontSize: "0.75rem", color: "var(--ink)" }}>
                      {project.client}
                    </span>
                  </div>

                  <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.685rem", color: "var(--muted)" }}>
                    <div>x {String(mousePos.x).padStart(4, "0")} · y {String(mousePos.y).padStart(4, "0")}</div>
                    <div style={{ color: project.accent, marginTop: "0.1rem" }}>{project.stack[0]}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: Architectural Breakdown */}
            {viewMode === "architecture" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  zIndex: 2,
                  position: "relative",
                  background: "radial-gradient(circle at 50% 50%, rgba(20, 27, 40, 0.95), rgba(5, 7, 10, 0.98))",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span className="note" style={{ color: project.accent, fontSize: "0.8rem", fontWeight: 700 }}>
                      [ARCHITECTURAL BLUEPRINT · {project.n}]
                    </span>
                    <span className="note note--ink" style={{ fontSize: "0.75rem" }}>
                      SPECIFICATION 2026
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div
                      style={{
                        border: "1px solid var(--line)",
                        borderRadius: "4px",
                        padding: "1rem",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <span className="note note--ink" style={{ display: "block", fontSize: "0.725rem", marginBottom: "0.35rem" }}>
                        APPLICATION DELIVERABLES
                      </span>
                      <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.6 }}>
                        {project.deliverables.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>

                    <div
                      style={{
                        border: "1px solid var(--line)",
                        borderRadius: "4px",
                        padding: "1rem",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <span className="note note--ink" style={{ display: "block", fontSize: "0.725rem", marginBottom: "0.35rem" }}>
                        ENGINEERING STACK
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.4rem" }}>
                        {project.stack.map((s, idx) => (
                          <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.775rem" }}>
                            <span style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{s}</span>
                            <span style={{ color: "var(--muted)", fontSize: "0.7rem" }}>Layer 0{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--line)",
                    paddingTop: "0.75rem",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--muted)",
                  }}
                >
                  <span>ACCENT: {project.accent}</span>
                  <span style={{ color: project.accent }}>STATUS: READY FOR PRODUCTION</span>
                </div>
              </div>
            )}

            {/* Mode 3: Verified Performance & Metrics */}
            {viewMode === "metrics" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  zIndex: 2,
                  position: "relative",
                  background: "radial-gradient(circle at 50% 50%, rgba(20, 27, 40, 0.95), rgba(5, 7, 10, 0.98))",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                    <span className="note" style={{ color: project.accent, fontSize: "0.8rem", fontWeight: 700 }}>
                      [VERIFIED SYSTEM METRICS · {project.n}]
                    </span>
                    <span className="note note--ink" style={{ fontSize: "0.75rem" }}>
                      MEASURED IN PRODUCTION
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`, gap: "1rem" }}>
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        style={{
                          border: `1px solid ${project.accent}40`,
                          borderRadius: "4px",
                          padding: "1.25rem 1rem",
                          background: "rgba(255,255,255,0.02)",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                            fontWeight: 700,
                            fontFamily: "var(--font-mono)",
                            color: project.accent,
                            lineHeight: 1,
                          }}
                        >
                          {m.value}
                        </span>
                        <span className="note note--ink" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid var(--line)",
                    paddingTop: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--muted)",
                  }}
                >
                  <span>TARGET USER PLATFORMS: WEB · RESPONSIVE · MOBILE</span>
                  <span style={{ color: "#10b981" }}>✓ VERIFIED BENCHMARKS</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes viewportScan {
          0% {
            top: -15%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        @media (min-width: 1024px) {
          .lg-span-5 {
            grid-column: span 5 !important;
          }
          .lg-span-7 {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </div>
  );
}
