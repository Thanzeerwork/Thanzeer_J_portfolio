import { AGENCY_STATS } from "@/data/stats";

export function AgencyStats() {
  return (
    <section className="section wrap" id="stats">
      <header className="section-head">
        <span className="note note--ink">[01b] Engineering Benchmarks</span>
        <span className="note">Verified metrics · 1999–2026</span>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
          gap: "1px",
          background: "var(--line)",
          border: "1px solid var(--line)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {AGENCY_STATS.map((s, idx) => (
          <div
            key={idx}
            style={{
              background: "var(--bg-raised)",
              padding: "1.75rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
              <span
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              {s.unit && (
                <span className="note note--accent" style={{ fontSize: "0.85rem" }}>
                  {s.unit}
                </span>
              )}
            </div>

            <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--ink)", marginTop: "0.25rem" }}>
              {s.label}
            </div>

            <div className="note" style={{ color: "var(--muted)", fontSize: "0.8rem", lineHeight: 1.4 }}>
              {s.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
