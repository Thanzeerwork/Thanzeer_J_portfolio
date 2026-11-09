"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { type Project } from "@/data/projects";
import { fetchProjects } from "@/lib/firebase/firestore";

interface Props {
  initialProjects: Project[];
}

const CATEGORIES = [
  "All",
  "Full-Stack Web & Frontends",
  "Cross-Platform Mobile",
  "Developer Tools & Systems",
] as const;

export function ProjectsCatalog({ initialProjects }: Props) {
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchProjects()
      .then((res) => {
        if (res.projects && res.projects.length > 0) {
          const merged = initialProjects.map((def) => {
            const found = res.projects.find((p) => p.id === def.id);
            return found ? { ...def, ...found } : def;
          });
          const extras = res.projects.filter(
            (p) => !initialProjects.some((def) => def.id === p.id)
          );
          setProjectList([...merged, ...extras]);
        }
      })
      .catch(() => {});
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return projectList.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.stack.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projectList, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Category Filter & Search Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2.5rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid var(--line)",
        }}
      >
        {/* Category Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? projectList.length
                : projectList.filter((p) => p.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "0.45rem 0.9rem",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: isActive
                    ? "1px solid var(--ink)"
                    : "1px solid var(--line)",
                  background: isActive ? "var(--ink)" : "var(--bg-raised)",
                  color: isActive ? "var(--bg)" : "var(--muted)",
                }}
              >
                {cat}{" "}
                <span
                  style={{
                    opacity: 0.7,
                    fontSize: "0.75rem",
                    marginLeft: "2px",
                  }}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", minWidth: "min(100%, 260px)" }}>
          <input
            type="text"
            placeholder="Search by tech, name, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 0.85rem",
              borderRadius: "4px",
              border: "1px solid var(--line-strong)",
              background: "var(--bg-raised)",
              color: "var(--ink)",
              fontSize: "0.85rem",
              fontFamily: "var(--font-sans)",
              outline: "none",
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "var(--muted)",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            background: "var(--bg-raised)",
            borderRadius: "4px",
            border: "1px solid var(--line)",
            color: "var(--muted)",
          }}
        >
          <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            No projects found matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="btn btn--ghost"
            style={{ marginTop: "0.75rem" }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 390px), 1fr))",
            gap: "2rem",
          }}
        >
          {filteredProjects.map((p, idx) => {
            const itemNumber = String(idx + 1).padStart(2, "0");

            return (
              <article
                key={p.id}
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--line)",
                  borderRadius: "6px",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="project-card"
              >
                {/* Accent line top indicator */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: p.accent || "var(--accent)",
                  }}
                />

                <div>
                  {/* Top Metadata */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span
                      className="note"
                      style={{
                        color: "var(--accent-text, #2a52f0)",
                        fontWeight: 600,
                      }}
                    >
                      [{p.n || itemNumber}] {p.category || "Project"}
                    </span>
                    <span className="note">{p.year}</span>
                  </div>

                  {/* Title */}
                  <h2
                    className="h3"
                    style={{
                      marginTop: "0.25rem",
                      marginBottom: "0.6rem",
                      fontSize: "1.3rem",
                      lineHeight: 1.3,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <Link
                      href={p.href || `/work/${p.id}`}
                      className="sheet__name-link"
                      style={{ color: "var(--ink)" }}
                    >
                      {p.title}
                    </Link>
                  </h2>

                  {/* Client / Role */}
                  <p
                    className="note"
                    style={{
                      color: "var(--muted)",
                      marginBottom: "0.85rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    {p.client} · <em>{p.role}</em>
                  </p>

                  {/* Summary */}
                  <p
                    style={{
                      color: "var(--ink)",
                      opacity: 0.88,
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {p.summary}
                  </p>

                  {/* Verified Metrics Ribbon */}
                  {p.metrics && p.metrics.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "1.25rem",
                        padding: "0.65rem 0.85rem",
                        background: "var(--bg)",
                        borderRadius: "4px",
                        border: "1px solid var(--line)",
                      }}
                    >
                      {p.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "0.35rem",
                            fontSize: "0.8rem",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              color: "var(--ink)",
                            }}
                          >
                            {m.value}
                          </span>
                          <span className="note" style={{ fontSize: "0.75rem" }}>
                            {m.label}
                          </span>
                          {mIdx < p.metrics.length - 1 && (
                            <span style={{ color: "var(--line-strong)" }}>•</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stack Badges */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "3px",
                          background: "var(--bg)",
                          border: "1px solid var(--line)",
                          color: "var(--muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    borderTop: "1px solid var(--line)",
                    paddingTop: "1rem",
                  }}
                >
                  <Link
                    href={p.href || `/work/${p.id}`}
                    className="btn"
                    style={{
                      fontSize: "0.85rem",
                      padding: "0.45rem 0.9rem",
                    }}
                  >
                    Case Study <span aria-hidden="true">→</span>
                  </Link>

                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost"
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.45rem 0.85rem",
                      }}
                    >
                      Live Site <span aria-hidden="true">↗</span>
                    </a>
                  )}

                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost"
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.45rem 0.85rem",
                      }}
                    >
                      GitHub <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProjectsCatalog;
