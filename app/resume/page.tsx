import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume | Thanzeer J — Full-Stack & Mobile Developer",
  description:
    "Curriculum Vitae and professional software development resume of Thanzeer J. B.Tech in CSE, React.js, Next.js, React Native, Node.js, and modern application development.",
};

export default function ResumePage() {
  return (
    <article
      className="wrap"
      style={{
        paddingTop: "7rem",
        paddingBottom: "5rem",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      {/* Breadcrumbs & Navigation */}
      <nav
        className="note crumbs"
        aria-label="Breadcrumb"
        style={{ marginBottom: "1.5rem" }}
      >
        <Link href="/" className="link">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/about" className="link">
          About
        </Link>{" "}
        / <span className="note--ink">Resume</span>
      </nav>

      {/* Header Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1.5rem",
          borderBottom: "1px solid var(--line-strong)",
          paddingBottom: "2rem",
        }}
      >
        <div>
          <span
            className="note note--accent"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            [Curriculum Vitae · rev. 2026]
          </span>
          <h1
            className="h1"
            style={{
              margin: 0,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Thanzeer J
          </h1>
          <p
            className="lead"
            style={{
              marginTop: "0.5rem",
              color: "var(--muted)",
              maxWidth: "52ch",
              lineHeight: 1.6,
            }}
          >
            Full-Stack Web &amp; Mobile Application Developer · B.Tech in Computer Science and Engineering specializing in Next.js, React Native, Node.js, and cloud backend architectures.
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
      <dl
        className="spec grid-12"
        style={{
          borderBottom: "1px solid var(--line)",
          paddingBlock: "1.5rem",
          margin: 0,
        }}
      >
        <div style={{ gridColumn: "span 3" }}>
          <dt className="note">Email</dt>
          <dd>
            <a href="mailto:thanzeerwork@gmail.com" className="link">
              thanzeerwork@gmail.com
            </a>
          </dd>
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <dt className="note">Mobile / Phone</dt>
          <dd>+91 98956 54031</dd>
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <dt className="note">LinkedIn</dt>
          <dd>
            <a
              href="https://www.linkedin.com/in/thanzeer-j/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              linkedin.com/in/thanzeer-j ↗
            </a>
          </dd>
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <dt className="note">GitHub</dt>
          <dd>
            <a
              href="https://github.com/Thanzeerwork"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              github.com/Thanzeerwork ↗
            </a>
          </dd>
        </div>
      </dl>

      {/* Education */}
      <section style={{ marginTop: "3rem" }}>
        <header className="section-head" style={{ marginBottom: "1.5rem" }}>
          <span className="note note--ink">[01] Education &amp; Training</span>
          <span className="note">Academic Degrees &amp; Specializations</span>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <div
            style={{
              borderLeft: "2px solid var(--accent)",
              paddingLeft: "1.5rem",
            }}
          >
            <span className="note note--accent">Aug 2022 – June 2026 · Kollam, Kerala, India</span>
            <h2 className="h3" style={{ margin: "0.25rem 0" }}>
              Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering
            </h2>
            <p className="note" style={{ color: "var(--ink)", fontWeight: 500, margin: "0.2rem 0" }}>
              Younus College of Engineering and Technology
            </p>
            <p style={{ color: "var(--muted)", margin: "0.5rem 0 0", lineHeight: 1.6 }}>
              Rigorous curriculum spanning software engineering, algorithm design, distributed computing, database systems, and full-stack software development.
            </p>
          </div>

          <div
            style={{
              borderLeft: "2px solid var(--line-strong)",
              paddingLeft: "1.5rem",
            }}
          >
            <span className="note note--accent">Jan 01, 2025 – Jan 17, 2026 · Kerala, India</span>
            <h2 className="h3" style={{ margin: "0.25rem 0" }}>
              Full Stack Web Development (MERN Specialization)
            </h2>
            <p className="note" style={{ color: "var(--ink)", fontWeight: 500, margin: "0.2rem 0" }}>
              Entri Elevate
            </p>
            <p style={{ color: "var(--muted)", margin: "0.5rem 0 0", lineHeight: 1.6 }}>
              Intensive, project-driven software development training covering full-stack MERN engineering, RESTful API architecture, state management, and production deployments.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section style={{ marginTop: "3.5rem" }}>
        <header className="section-head" style={{ marginBottom: "1.5rem" }}>
          <span className="note note--ink">[02] Skills Summary</span>
          <span className="note">Core Competencies</span>
        </header>

        <div className="grid-12" style={{ gap: "1.25rem" }}>
          <div
            style={{
              gridColumn: "span 6",
              border: "1px solid var(--line)",
              padding: "1.5rem",
              borderRadius: "4px",
              background: "var(--bg-raised)",
            }}
          >
            <h3 className="note note--ink" style={{ marginBottom: "0.5rem" }}>
              Domains &amp; Languages
            </h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
              <strong>Domains:</strong> Web Development, Cross-Platform Mobile App Development, Systems Tooling<br />
              <strong>Languages:</strong> JavaScript, TypeScript, C, Java, Python, HTML5, CSS3
            </p>
          </div>

          <div
            style={{
              gridColumn: "span 6",
              border: "1px solid var(--line)",
              padding: "1.5rem",
              borderRadius: "4px",
              background: "var(--bg-raised)",
            }}
          >
            <h3 className="note note--ink" style={{ marginBottom: "0.5rem" }}>
              Frameworks &amp; Libraries
            </h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
              React.js, Next.js 16 (App Router), React-Native, Node.js, Express.js, MongoDB, Tailwind CSS v4, Three.js, GSAP, Radix UI / shadcn/ui
            </p>
          </div>

          <div
            style={{
              gridColumn: "span 6",
              border: "1px solid var(--line)",
              padding: "1.5rem",
              borderRadius: "4px",
              background: "var(--bg-raised)",
            }}
          >
            <h3 className="note note--ink" style={{ marginBottom: "0.5rem" }}>
              Platforms &amp; Cloud Infrastructure
            </h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
              Google Firebase (Auth, Firestore, Storage), Supabase (PostgreSQL), Cloudflare R2, AWS S3, Vercel, Render, Railway, Git &amp; GitHub
            </p>
          </div>

          <div
            style={{
              gridColumn: "span 6",
              border: "1px solid var(--line)",
              padding: "1.5rem",
              borderRadius: "4px",
              background: "var(--bg-raised)",
            }}
          >
            <h3 className="note note--ink" style={{ marginBottom: "0.5rem" }}>
              AI Tooling &amp; Coding Agents
            </h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
              Google Antigravity, Claude Code, Codex, Google Gemini 1.5, Genkit AI, Prompt Engineering, Agentic Workflows
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section style={{ marginTop: "3.5rem" }}>
        <header
          className="section-head"
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="note note--ink">[03] Projects &amp; Software Builds</span>
          <Link href="/work" className="note link">
            Browse All 13 Projects in Catalog →
          </Link>
        </header>

        {/* Category 1: Full-Stack Web & Modern Frontends */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h3
            className="note note--accent"
            style={{ fontSize: "0.95rem", marginBottom: "1rem" }}
          >
            ◆ Full-Stack Web &amp; Modern Frontends
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Thanzeer J Portfolio */}
            <div
              style={{
                border: "1px solid var(--line)",
                padding: "1.5rem",
                borderRadius: "4px",
                background: "var(--bg-raised)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <h4 className="h3" style={{ margin: 0, fontSize: "1.2rem" }}>
                  Thanzeer J (Developer Portfolio &amp; Headless CMS)
                </h4>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a href="https://thanzeer-j.is-a.dev/" target="_blank" rel="noopener noreferrer" className="link">Live Site ↗</a>
                  <a href="https://github.com/Thanzeerwork/Thanzeer_J_portfolio" target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
                  <Link href="/work/thanzeer-portfolio" className="link" style={{ fontWeight: 600 }}>Case Study →</Link>
                </div>
              </div>
              <p className="note" style={{ color: "var(--muted)", marginBottom: "0.75rem" }}>
                <strong>Tech Stack:</strong> Next.js 16 (App Router), React 19, TypeScript, Firebase (Auth &amp; Firestore), Cloudflare R2, Three.js, GSAP, Lenis, Tailwind CSS
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--ink)", lineHeight: 1.6, fontSize: "0.925rem" }}>
                <li>Architected a high-performance developer portfolio and headless CMS using Next.js 16 App Router, React 19, and TypeScript, achieving 98+ Lighthouse scores across 40+ prerendered routes.</li>
                <li>Engineered an authenticated admin control center with Firebase Auth and Cloud Firestore, alongside Cloudflare R2 object storage integration for zero-egress media uploads and live case study CRUD management.</li>
                <li>Constructed tactile UI experiences utilizing Three.js 3D physics simulations, Lenis smooth scrolling, a global ⌘K command palette, and machine-readable JSON-LD/llms.txt protocols for search and AI engine discovery.</li>
              </ul>
            </div>

            {/* RyphTech */}
            <div
              style={{
                border: "1px solid var(--line)",
                padding: "1.5rem",
                borderRadius: "4px",
                background: "var(--bg-raised)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <h4 className="h3" style={{ margin: 0, fontSize: "1.2rem" }}>
                  RyphTech (Agency Portal &amp; Headless CMS)
                </h4>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a href="https://ryphtech.in/" target="_blank" rel="noopener noreferrer" className="link">Live Site ↗</a>
                  <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
                  <Link href="/work/ryphtech" className="link" style={{ fontWeight: 600 }}>Case Study →</Link>
                </div>
              </div>
              <p className="note" style={{ color: "var(--muted)", marginBottom: "0.75rem" }}>
                <strong>Tech Stack:</strong> Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Radix UI / shadcn/ui, Recharts, Zod, React Hook Form
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--ink)", lineHeight: 1.6, fontSize: "0.925rem" }}>
                <li>Built a high-performance corporate portal and internal CMS using Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS.</li>
                <li>Engineered secure admin REST API endpoints for project lifecycle management, media uploads, and dynamic portfolio catalog management.</li>
                <li>Constructed accessible UI components leveraging Radix UI primitives and shadcn/ui with client analytics visualization.</li>
              </ul>
            </div>

            {/* Ila Kochi */}
            <div
              style={{
                border: "1px solid var(--line)",
                padding: "1.5rem",
                borderRadius: "4px",
                background: "var(--bg-raised)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <h4 className="h3" style={{ margin: 0, fontSize: "1.2rem" }}>
                  Ila Kochi (Restaurant &amp; Reservation Web App) <span className="note note--accent" style={{ fontSize: "0.75rem" }}>(Ongoing)</span>
                </h4>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
                  <Link href="/work/ila-kochi" className="link" style={{ fontWeight: 600 }}>Case Study →</Link>
                </div>
              </div>
              <p className="note" style={{ color: "var(--muted)", marginBottom: "0.75rem" }}>
                <strong>Tech Stack:</strong> React 19, TypeScript, Vite, Tailwind CSS v4, GSAP + ScrollTrigger, Three.js, AWS S3 / Cloudflare R2, Firebase
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--ink)", lineHeight: 1.6, fontSize: "0.925rem" }}>
                <li>Crafted an immersive experiential web application using React 19, TypeScript, Tailwind CSS, GSAP ScrollTrigger, and Three.js.</li>
                <li>Engineered high-throughput cloud media delivery pipelines using Cloudflare R2 / AWS S3 for streaming culinary video backgrounds without layout shifts.</li>
                <li>Integrated a direct WhatsApp reservation and pre-order engine, streamlining customer conversions with dynamic dietary filtering.</li>
              </ul>
            </div>

            {/* Lavender Aquafarm */}
            <div
              style={{
                border: "1px solid var(--line)",
                padding: "1.5rem",
                borderRadius: "4px",
                background: "var(--bg-raised)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <h4 className="h3" style={{ margin: 0, fontSize: "1.2rem" }}>
                  Lavender Aquafarm (Specialized E-Commerce &amp; Farm Management)
                </h4>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
                  <Link href="/work/lavender-aquafarm" className="link" style={{ fontWeight: 600 }}>Case Study →</Link>
                </div>
              </div>
              <p className="note" style={{ color: "var(--muted)", marginBottom: "0.75rem" }}>
                <strong>Tech Stack:</strong> React 19, Vite, Tailwind CSS, Supabase (Auth &amp; PostgreSQL), Framer Motion, OGL (WebGL 3D), React Router 7
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--ink)", lineHeight: 1.6, fontSize: "0.925rem" }}>
                <li>Developed an e-commerce and inventory portal for an aquaculture enterprise with React 19, Supabase, and Tailwind CSS.</li>
                <li>Created an interactive 3D WebGL species visualizer utilizing OGL and Framer Motion for smooth cylindrical browsing.</li>
                <li>Built a real-time admin management portal for live inventory CRUD operations, order status transitions, and customer inquiry management.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Category 2: Cross-Platform Mobile Applications */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h3
            className="note note--accent"
            style={{ fontSize: "0.95rem", marginBottom: "1rem" }}
          >
            ◆ Cross-Platform Mobile Applications
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* FutureSelf */}
            <div
              style={{
                border: "1px solid var(--line)",
                padding: "1.5rem",
                borderRadius: "4px",
                background: "var(--bg-raised)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <h4 className="h3" style={{ margin: 0, fontSize: "1.2rem" }}>
                  FutureSelf (AI-Powered Career &amp; Placement Readiness Ecosystem)
                </h4>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
                  <Link href="/work/futureself" className="link" style={{ fontWeight: 600 }}>Case Study →</Link>
                </div>
              </div>
              <p className="note" style={{ color: "var(--muted)", marginBottom: "0.75rem" }}>
                <strong>Tech Stack:</strong> React Native, Expo (SDK 54), Firebase, Google Gemini 1.5, Genkit AI, Judge0 REST API, Monaco Editor, Victory Native
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--ink)", lineHeight: 1.6, fontSize: "0.925rem" }}>
                <li>Implemented end-to-end LLM workflows leveraging Google Gemini API to analyze user performance data, identify skill deficiencies, and generate personalized learning roadmaps with Coursera/Udemy resource matching.</li>
                <li>Integrated a remote sandboxed code execution engine utilizing Monaco Editor and Judge0 API supporting JavaScript, Python, Java, and C++ with real-time test-case validation and execution feedback.</li>
                <li>Architected real-time analytics dashboards visualizing student readiness indices, peer benchmarks, and interview diagnostics using SVG radial gauges and Victory Native chart visualizations.</li>
              </ul>
            </div>

            {/* StudyVault */}
            <div
              style={{
                border: "1px solid var(--line)",
                padding: "1.5rem",
                borderRadius: "4px",
                background: "var(--bg-raised)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <h4 className="h3" style={{ margin: 0, fontSize: "1.2rem" }}>
                  StudyVault / YCET Portal (College ERP &amp; Academic Analytics Platform)
                </h4>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
                  <Link href="/work/studyvault" className="link" style={{ fontWeight: 600 }}>Case Study →</Link>
                </div>
              </div>
              <p className="note" style={{ color: "var(--muted)", marginBottom: "0.75rem" }}>
                <strong>Tech Stack:</strong> React Native, Expo, React Navigation, Firebase (Auth &amp; Firestore), Supabase, React Native Paper, Victory Native, React Native Skia
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--ink)", lineHeight: 1.6, fontSize: "0.925rem" }}>
                <li>Developed an enterprise College ERP mobile application with React Native and Firebase, supporting 5 user roles with dynamic role-based access control (RBAC).</li>
                <li>Implemented batch-write data pipelines for class-wide attendance marking and CIA grade computations, cutting faculty administrative logging time significantly.</li>
                <li>Constructed an interactive placement recruitment portal enabling placement coordinators to filter candidate databases by CGPA, department, and eligibility criteria in real time.</li>
              </ul>
            </div>

            {/* RationKart */}
            <div
              style={{
                border: "1px solid var(--line)",
                padding: "1.5rem",
                borderRadius: "4px",
                background: "var(--bg-raised)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <h4 className="h3" style={{ margin: 0, fontSize: "1.2rem" }}>
                  RationKart (Digital Public Distribution System with Doorstep Delivery)
                </h4>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
                  <Link href="/work/rationkart" className="link" style={{ fontWeight: 600 }}>Case Study →</Link>
                </div>
              </div>
              <p className="note" style={{ color: "var(--muted)", marginBottom: "0.75rem" }}>
                <strong>Tech Stack:</strong> React Native, Expo (SDK 54/57), Expo Router, Firebase, Expo Location, React Native Reanimated
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--ink)", lineHeight: 1.6, fontSize: "0.925rem" }}>
                <li>Architected RationKart, a 4-role civic mobile application (Customer, Merchant, Delivery Agent, Government Admin) digitizing subsidized food grain distribution and home delivery using React Native and Expo.</li>
                <li>Engineered statutory entitlement calculation algorithms matching household ration card classifications (AAY, PHH, NPHH) to calculate monthly subsidized commodity quotas.</li>
                <li>Integrated end-to-end logistics with real-time Firestore synchronization, featuring turn-by-turn GPS navigation integration, batch inventory allocation, and OTP-authenticated delivery handoffs.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Category 3: Developer Tools & Systems */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h3
            className="note note--accent"
            style={{ fontSize: "0.95rem", marginBottom: "1rem" }}
          >
            ◆ Developer Tools &amp; Systems
          </h3>

          <div
            style={{
              border: "1px solid var(--line)",
              padding: "1.5rem",
              borderRadius: "4px",
              background: "var(--bg-raised)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <h4 className="h3" style={{ margin: 0, fontSize: "1.2rem" }}>
                Website Reaper (Autonomous Full-Fidelity Web Scraper &amp; Offline Packager)
              </h4>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
                <Link href="/work/website-reaper" className="link" style={{ fontWeight: 600 }}>Case Study →</Link>
              </div>
            </div>
            <p className="note" style={{ color: "var(--muted)", marginBottom: "0.75rem" }}>
              <strong>Tech Stack:</strong> Node.js, Express, Puppeteer-Core (Chromium), Cheerio, Wget, PostCSS, Server-Sent Events (SSE), Archiver
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--ink)", lineHeight: 1.6, fontSize: "0.925rem" }}>
              <li>Architected an autonomous full-fidelity website cloning and offline packaging engine combining headless Chromium automation (puppeteer-core) and multi-threaded network mirroring.</li>
              <li>Engineered a 4-layer runtime immune shield that neutralizes React/Next.js hydration crashes, rewrites client-side fetch pipelines, and serves offline 3D WebGL/WASM assets with 100% fidelity.</li>
              <li>Built real-time telemetry and AST DOM pruning tools utilizing Server-Sent Events (SSE) and Cheerio, allowing users to inspect and selectively harvest modular sections of complex single-page apps.</li>
            </ul>
          </div>
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/work" className="btn btn--ghost">
            View Complete Catalog with All 13 Builds →
          </Link>
        </div>
      </section>

      {/* Certifications Section */}
      <section style={{ marginTop: "3.5rem" }}>
        <header className="section-head" style={{ marginBottom: "1.5rem" }}>
          <span className="note note--ink">[04] Certifications &amp; Workshops</span>
          <span className="note">Verified Accreditations</span>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div
            style={{
              border: "1px solid var(--line)",
              padding: "1.25rem 1.5rem",
              borderRadius: "4px",
              background: "var(--bg-raised)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <span className="note note--accent">July 11 – August 30, 2024 · ICT Academy of Kerala</span>
              <span className="note note--ink">Certified</span>
            </div>
            <h4 className="h3" style={{ margin: "0.35rem 0 0.5rem", fontSize: "1.15rem" }}>
              Machine Learning Workshop (ICT Academy of Kerala)
            </h4>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6, fontSize: "0.9rem" }}>
              Developed practical skills in machine learning, focusing on advanced data analysis and model optimization. Engaged in hands-on projects and interactive sessions with key algorithms and machine learning tools.
            </p>
          </div>

          <div
            style={{
              border: "1px solid var(--line)",
              padding: "1.25rem 1.5rem",
              borderRadius: "4px",
              background: "var(--bg-raised)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <span className="note note--accent">July 2 – July 4, 2024 · IEDC</span>
              <span className="note note--ink">Certified</span>
            </div>
            <h4 className="h3" style={{ margin: "0.35rem 0 0.5rem", fontSize: "1.15rem" }}>
              Python Programming Workshop (IEDC)
            </h4>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6, fontSize: "0.9rem" }}>
              Developed strong proficiency in Python programming, including advanced concepts and best practices. Gained hands-on experience with real-world projects, focusing on problem-solving and software development skills.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer
        style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--line-strong)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <span className="note">Ready for collaboration</span>
          <p className="h3" style={{ margin: "0.25rem 0" }}>
            Let&apos;s build something together.
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="mailto:thanzeerwork@gmail.com" className="btn">
            Send Email <span className="arrow">↗</span>
          </a>
          <Link href="/contact" className="btn btn--ghost">
            Contact Form
          </Link>
        </div>
      </footer>
    </article>
  );
}
