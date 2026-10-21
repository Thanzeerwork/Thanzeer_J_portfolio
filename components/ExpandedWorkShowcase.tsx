"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PROJECTS, type Project } from "@/data/projects";
import { fetchProjects } from "@/lib/firebase/firestore";

export function ExpandedWorkShowcase() {
  const [projectList, setProjectList] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    fetchProjects().then((res) => {
      if (res.projects && res.projects.length > 0) {
        setProjectList(res.projects);
      }
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <header className="section-head" data-astro-cid-lcdefpme>
        <span className="note note--ink" data-astro-cid-lcdefpme>[04] Featured Projects Portfolio</span>
        <span className="note" data-astro-cid-lcdefpme>4 Core Applications · Production & Architecture</span>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: "1.75rem",
        }}
      >
        {projectList.map((p: Project) => (
          <article
            key={p.id}
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <span className="note note--accent">[{p.n}] {p.client}</span>
                <span className="note">{p.year}</span>
              </div>

              {p.imageUrl && (
                <Link
                  href={p.href || `/work/${p.id}`}
                  style={{
                    display: "block",
                    borderRadius: "4px",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    height: "170px",
                    marginBottom: "1rem",
                    background: "var(--bg)",
                    position: "relative",
                  }}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </Link>
              )}

              <h3 className="h3" style={{ marginTop: "0.25rem", marginBottom: "0.75rem", fontSize: "1.25rem" }}>
                <Link href={p.href || `/work/${p.id}`} className="sheet__name-link">
                  {p.title}
                </Link>
              </h3>

              <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                {p.summary}
              </p>

              <div style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="note"
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--line)",
                      borderRadius: "2px",
                      padding: "0.2rem 0.5rem",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  borderTop: "1px solid var(--line)",
                  paddingTop: "1rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                }}
              >
                {p.metrics.map((m, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)" }}>{m.value}</span>
                    <span className="note" style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{m.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem" }}>
                <Link href={p.href || `/work/${p.id}`} className="btn btn--ghost" style={{ fontSize: "0.85rem" }}>
                  Case Study <span className="arrow">→</span>
                </Link>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="note link"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Live Site ↗
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="note link"
                      style={{ fontSize: "0.85rem" }}
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
