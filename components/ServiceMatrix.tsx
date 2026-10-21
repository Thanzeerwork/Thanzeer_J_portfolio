import React from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";

export function ServiceMatrix() {
  return (
    <section className="section wrap" id="service-specs">
      <header className="section-head">
        <span className="note note--ink">[01b] Engagement Specifications</span>
        <span className="note">Scope · Timelines · Deliverables</span>
      </header>

      <div style={{ marginBottom: "2.5rem" }}>
        <h2 className="h2" style={{ maxWidth: "26ch" }}>
          How each engagement is scoped and delivered.
        </h2>
        <p className="lead" style={{ marginTop: "0.75rem", maxWidth: "65ch" }}>
          No ambiguity, no hidden hours. Clear handover parameters, guaranteed Lighthouse scores, and agreed milestones from day one.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {SERVICES.map((s) => (
          <article
            key={s.id}
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid var(--line)",
                  paddingBottom: "0.75rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span className="note note--accent">[{s.n}] Scope Sheet</span>
                <span className="note">Turnaround: {s.typicalTimeline}</span>
              </div>

              <h3 className="h3" style={{ fontSize: "1.35rem", marginBottom: "0.5rem" }}>
                <Link href={`/services/${s.slug}`} className="sheet__name-link">
                  {s.title}
                </Link>
              </h3>

              <p className="note note--ink" style={{ marginBottom: "1rem", fontStyle: "italic" }}>
                &ldquo;{s.tagline}&rdquo;
              </p>

              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--ink)", marginBottom: "1.5rem" }}>
                {s.summary}
              </p>

              {/* Scope Breakdown */}
              <div
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--line)",
                  borderRadius: "4px",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                  fontSize: "0.85rem",
                }}
              >
                <div>
                  <span className="note note--ink" style={{ display: "block", marginBottom: "0.2rem" }}>
                    What you provide:
                  </span>
                  <span style={{ color: "var(--ink)" }}>{s.whatYouBring}</span>
                </div>
                <div style={{ borderTop: "1px dashed var(--line)", paddingTop: "0.75rem" }}>
                  <span className="note note--accent" style={{ display: "block", marginBottom: "0.2rem" }}>
                    What I deliver:
                  </span>
                  <span style={{ color: "var(--ink)" }}>{s.whatIGetDone}</span>
                </div>
              </div>

              {/* Deliverables checklist */}
              <div>
                <span className="note note--ink" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Key Deliverables
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {s.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                        lineHeight: 1.4,
                        color: "var(--ink)",
                      }}
                    >
                      <span className="note note--accent" style={{ flexShrink: 0, marginTop: "0.1rem" }}>
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              {/* Stack tags */}
              <ul className="stack" style={{ marginBottom: "1.25rem" }}>
                {s.tags.map((tag, idx) => (
                  <li key={idx}>{tag}</li>
                ))}
              </ul>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href={`/services/${s.slug}`} className="btn btn--ghost" style={{ fontSize: "0.85rem" }}>
                  Detailed Spec <span className="arrow">→</span>
                </Link>
                <a
                  href="mailto:thanzeerwork@gmail.com"
                  target="_blank"
                  rel="noopener"
                  className="link note"
                  style={{ fontSize: "0.85rem" }}
                >
                  Book 30-min call ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
