import React from "react";
import { TOOLBOX } from "@/data/toolbox";

export function ToolboxGrid() {
  return (
    <section className="section wrap" id="toolbox">
      <header className="section-head">
        <span className="note note--ink">[04] Verified Technical Stack</span>
        <span className="note">Production-tested tools · 1999–2026</span>
      </header>

      <div style={{ marginBottom: "2.5rem" }}>
        <h2 className="h2" style={{ maxWidth: "24ch" }}>
          Every tool here earned its place on real production builds.
        </h2>
        <p className="lead" style={{ marginTop: "0.75rem", maxWidth: "60ch" }}>
          No untested packages in production. Battle-hardened frameworks, predictable motion libraries, and rigorously evaluated AI tools.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {TOOLBOX.map((group) => (
          <div
            key={group.category}
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                borderBottom: "1px solid var(--line)",
                paddingBottom: "0.5rem",
              }}
            >
              <h3 className="h3" style={{ fontSize: "1.1rem" }}>
                {group.category}
              </h3>
              <span className="note note--accent">[{group.n}]</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {group.tools.map((t) => (
                <div
                  key={t.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "1px dashed var(--line)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--ink)" }}>
                      {t.name}
                    </span>
                    <span
                      className="note note--accent"
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.1rem 0.4rem",
                        background: "var(--bg)",
                        border: "1px solid var(--line)",
                        borderRadius: "2px",
                      }}
                    >
                      {t.experience}
                    </span>
                  </div>
                  <span className="note" style={{ color: "var(--muted)", fontSize: "0.8rem", lineHeight: 1.4 }}>
                    {t.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="note" style={{ marginTop: "1.5rem" }}>
        Industries so far: healthcare &amp; pharma · luxury retail · manufacturing · e-commerce · generative AI · sport media · corporate
      </p>
    </section>
  );
}
