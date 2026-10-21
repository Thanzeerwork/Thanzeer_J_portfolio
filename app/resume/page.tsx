import type { Metadata } from "next";
import Link from "next/link";
import { Monogram } from "@/components/Monogram";

export const metadata: Metadata = {
  title: "Resume | Thanzeer J — Full-Stack Developer",
  description:
    "Curriculum Vitae and professional software development resume of Thanzeer J. B.Tech in CSE, React.js, React Native, Node.js, and modern application development.",
};

export default function ResumePage() {
  return (
    <article className="wrap" style={{ paddingTop: "7rem", paddingBottom: "5rem", maxWidth: "960px", margin: "0 auto" }}>
      {/* Breadcrumbs & Navigation */}
      <nav className="note crumbs" aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <Link href="/" className="link">Home</Link> /{" "}
        <Link href="/about" className="link">About</Link> /{" "}
        <span className="note--ink">Resume</span>
      </nav>

      {/* Header Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem", borderBottom: "1px solid var(--line-strong)", paddingBottom: "2rem" }}>
        <div>
          <span className="note note--accent" style={{ display: "block", marginBottom: "0.5rem" }}>[Curriculum Vitae · rev. 2026]</span>
          <h1 className="h1" style={{ margin: 0, fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}>Thanzeer J</h1>
          <p className="lead" style={{ marginTop: "0.5rem", color: "var(--muted)", maxWidth: "50ch" }}>
            Full-Stack Developer &amp; Software Developer · Computer Science &amp; Engineering graduate specializing in responsive web applications, mobile platforms, and backend integration.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href="/resume.pdf"
            download="Thanzeer_J_Resume.pdf"
            className="btn"
          >
            Download PDF <span className="arrow">↓</span>
          </a>
          <a
            href="mailto:thanzeerwork@gmail.com"
            className="btn btn--ghost"
          >
            Contact <span className="arrow">↗</span>
          </a>
        </div>
      </div>

      {/* Contact & Overview Matrix */}
      <dl className="spec grid-12" style={{ borderBottom: "1px solid var(--line)", paddingBlock: "1.5rem", margin: 0 }}>
        <div style={{ gridColumn: "span 3" }}>
          <dt className="note">Email</dt>
          <dd><a href="mailto:thanzeerwork@gmail.com" className="link">thanzeerwork@gmail.com</a></dd>
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <dt className="note">Location</dt>
          <dd>Kerala, India (Open to Remote)</dd>
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <dt className="note">LinkedIn</dt>
          <dd><a href="https://www.linkedin.com/in/thanzeer-j/" target="_blank" rel="noopener noreferrer" className="link">linkedin.com/in/thanzeer-j ↗</a></dd>
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <dt className="note">GitHub</dt>
          <dd><a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">github.com/Thanzeerwork ↗</a></dd>
        </div>
      </dl>

      {/* Education */}
      <section style={{ marginTop: "3rem" }}>
        <header className="section-head" style={{ marginBottom: "1.5rem" }}>
          <span className="note note--ink">[01] Education</span>
          <span className="note">Academic Degree</span>
        </header>
        <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1.5rem" }}>
          <span className="note note--accent">Graduated · 2021 – 2025</span>
          <h2 className="h3" style={{ margin: "0.25rem 0" }}>Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering</h2>
          <p style={{ color: "var(--muted)", margin: "0.5rem 0 0" }}>
            Comprehensive grounding in software engineering principles, algorithms, data structures, relational and non-relational database design, and object-oriented application architecture.
          </p>
        </div>
      </section>

      {/* Technical Skills */}
      <section style={{ marginTop: "3.5rem" }}>
        <header className="section-head" style={{ marginBottom: "1.5rem" }}>
          <span className="note note--ink">[02] Technical Skills</span>
          <span className="note">Core Competencies</span>
        </header>
        <div className="grid-12" style={{ gap: "1.5rem" }}>
          <div style={{ gridColumn: "span 6", border: "1px solid var(--line)", padding: "1.5rem", borderRadius: "4px" }}>
            <h3 className="note note--ink" style={{ marginBottom: "0.75rem" }}>Frontend &amp; Mobile</h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
              JavaScript (ES6+), TypeScript, React.js, React Native, Tailwind CSS, Vite, HTML5, CSS3, Responsive Design, State Management, UI/UX Ergonomics.
            </p>
          </div>
          <div style={{ gridColumn: "span 6", border: "1px solid var(--line)", padding: "1.5rem", borderRadius: "4px" }}>
            <h3 className="note note--ink" style={{ marginBottom: "0.75rem" }}>Backend &amp; Database</h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
              Node.js, Express.js, RESTful API Design, MongoDB, Cloud Firestore, Supabase, User Authentication (OAuth, JWT).
            </p>
          </div>
          <div style={{ gridColumn: "span 6", border: "1px solid var(--line)", padding: "1.5rem", borderRadius: "4px" }}>
            <h3 className="note note--ink" style={{ marginBottom: "0.75rem" }}>Tools &amp; Workflows</h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
              Git &amp; GitHub, Postman, VS Code, Figma Dev Mode, Vercel, Netlify, npm/yarn, Continuous Integration basics.
            </p>
          </div>
          <div style={{ gridColumn: "span 6", border: "1px solid var(--line)", padding: "1.5rem", borderRadius: "4px" }}>
            <h3 className="note note--ink" style={{ marginBottom: "0.75rem" }}>Systems &amp; Foundations</h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
              Linux Command Line, Server Provisioning, Networking Protocols, Web Application Security, WCAG 2.1 AA Accessibility Standards.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ marginTop: "3.5rem" }}>
        <header className="section-head" style={{ marginBottom: "1.5rem" }}>
          <span className="note note--ink">[03] Key Projects</span>
          <span className="note">Software Engineering Portfolio</span>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Project 1 */}
          <div style={{ border: "1px solid var(--line-strong)", padding: "1.75rem", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <span className="note note--accent">01 · Web Platform · Live</span>
              <span className="note">React.js · Tailwind CSS · Vite</span>
            </div>
            <h3 className="h3" style={{ margin: "0.5rem 0" }}>RyphTech: Technology Brand Platform</h3>
            <p style={{ color: "var(--muted)", margin: "0 0 1rem", maxWidth: "68ch" }}>
              Engineered the official brand website for RyphTech, communicating digital transformation capabilities, technical consulting services, and engineering expertise with a high-performance modern UI.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://ryphtech.in/" target="_blank" rel="noopener noreferrer" className="link" style={{ fontWeight: 600 }}>Live Website ↗</a>
              <Link href="/work/ryphtech" className="link">Detailed Case Study →</Link>
            </div>
          </div>

          {/* Project 2 */}
          <div style={{ border: "1px solid var(--line-strong)", padding: "1.75rem", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <span className="note note--accent">02 · Full-Stack App</span>
              <span className="note">React Native · Firebase · Supabase</span>
            </div>
            <h3 className="h3" style={{ margin: "0.5rem 0" }}>MealHub: Digital Canteen Prebooking System</h3>
            <p style={{ color: "var(--muted)", margin: "0 0 1rem", maxWidth: "68ch" }}>
              Developed a cross-platform mobile and responsive web application designed to eliminate lunch counter bottlenecks, showing live inventory availability and enabling advance ordering workflows.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/work/mealhub" className="link">Detailed Case Study →</Link>
              <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub Repository ↗</a>
            </div>
          </div>

          {/* Project 3 */}
          <div style={{ border: "1px solid var(--line-strong)", padding: "1.75rem", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <span className="note note--accent">03 · Mobile Application</span>
              <span className="note">React Native · Node.js · Cloud Firestore</span>
            </div>
            <h3 className="h3" style={{ margin: "0.5rem 0" }}>Repairro: Doorstep Repair &amp; Service Logistics</h3>
            <p style={{ color: "var(--muted)", margin: "0 0 1rem", maxWidth: "68ch" }}>
              Architected an end-to-end service logistics application connecting users with verified technicians for appliance and electronics servicing, estimate approvals, and doorstep tracking.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/work/repairro" className="link">Detailed Case Study →</Link>
              <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub Repository ↗</a>
            </div>
          </div>

          {/* Project 4 */}
          <div style={{ border: "1px solid var(--line-strong)", padding: "1.75rem", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <span className="note note--accent">04 · Web Application</span>
              <span className="note">React.js · Node.js · Express · MongoDB</span>
            </div>
            <h3 className="h3" style={{ margin: "0.5rem 0" }}>Student Management Portal: Unified Campus Platform</h3>
            <p style={{ color: "var(--muted)", margin: "0 0 1rem", maxWidth: "68ch" }}>
              Built a secure role-based campus portal centralizing academic records, attendance logs, internal assessment grading, and automated placement drive criteria filtering.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/work/student-portal" className="link">Detailed Case Study →</Link>
              <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub Repository ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--line-strong)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="note">Ready for collaboration</span>
          <p className="h3" style={{ margin: "0.25rem 0" }}>Let&apos;s build something together.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="mailto:thanzeerwork@gmail.com" className="btn">Send Email <span className="arrow">↗</span></a>
          <Link href="/contact" className="btn btn--ghost">Contact Form</Link>
        </div>
      </footer>
    </article>
  );
}
