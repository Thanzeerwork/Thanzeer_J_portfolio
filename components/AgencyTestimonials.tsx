import { TESTIMONIALS } from "@/data/testimonials";

export function AgencyTestimonials() {
  return (
    <section className="section wrap" id="testimonials">
      <header className="section-head">
        <span className="note note--ink">[02b] What Defines My Approach</span>
        <span className="note">Core Principles &amp; Mindset</span>
      </header>

      <div style={{ marginBottom: "2rem" }}>
        <h2 className="h2" style={{ maxWidth: "26ch" }}>
          What defines my approach to building software.
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {TESTIMONIALS.map((t) => (
          <article
            key={t.id}
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="note note--accent">[{t.n}] {t.projectFocus}</span>
              <span className="note">{t.year}</span>
            </div>

            <blockquote
              style={{
                margin: 0,
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "var(--ink)",
                fontStyle: "normal",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <footer
              style={{
                borderTop: "1px solid var(--line)",
                paddingTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <cite
                style={{
                  fontStyle: "normal",
                  fontWeight: 600,
                  color: "var(--ink)",
                  fontSize: "0.95rem",
                }}
              >
                {t.author}
              </cite>
              <div className="note" style={{ color: "var(--muted)" }}>
                {t.role} · <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{t.company}</strong>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
