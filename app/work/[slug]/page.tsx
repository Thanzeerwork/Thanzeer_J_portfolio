import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { fetchProjects } from "@/lib/firebase/firestore";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let project = PROJECTS.find((p) => p.id === slug);
  if (!project) {
    try {
      const res = await fetchProjects();
      project = res.projects.find((p) => p.id === slug);
    } catch {}
  }

  if (!project) {
    return {
      title: "Case Study Not Found | Thanzeer J",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thanzeer-j.is-a.dev";
  const projectUrl = `${siteUrl}/work/${project.id}`;
  const images = project.imageUrl
    ? [{ url: project.imageUrl, alt: `${project.title} Preview` }]
    : [];

  return {
    title: `${project.title} · Case Study | Thanzeer J`,
    description: project.summary,
    alternates: {
      canonical: projectUrl,
    },
    keywords: [
      project.title,
      ...project.stack,
      "Thanzeer J",
      "Case Study",
      "Full-Stack Development",
      "Software Engineering",
    ],
    openGraph: {
      type: "article",
      title: `${project.title} · Case Study`,
      description: project.summary,
      url: projectUrl,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · Case Study`,
      description: project.summary,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  let project = PROJECTS.find((p) => p.id === slug);
  if (!project) {
    try {
      const res = await fetchProjects();
      project = res.projects.find((p) => p.id === slug);
    } catch {}
  }

  if (!project) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thanzeer-j.is-a.dev";
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Work",
            "item": `${siteUrl}/#work`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": `${siteUrl}/work/${project.id}`,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "name": project.title,
        "headline": project.title,
        "description": project.summary,
        "url": `${siteUrl}/work/${project.id}`,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web, iOS, Android",
        "author": {
          "@type": "Person",
          "name": "Thanzeer J",
          "url": siteUrl,
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        ...(project.imageUrl ? { "image": project.imageUrl } : {}),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <section
        className="wrap"
        style={{
          minHeight: "auto",
          paddingTop: "clamp(5.5rem, 8vw, 7.5rem)",
          paddingBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <nav className="note crumbs" aria-label="Breadcrumb">
          <Link href="/" className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/#work" className="link">
            Work
          </Link>{" "}
          / <span className="note--ink">{project.title}</span>
        </nav>

        <p className="note" style={{ margin: "0.25rem 0" }}>
          [Work / {project.n} · Case study · {project.year}]
        </p>

        <header style={{ marginTop: "0.25rem", marginBottom: "0.75rem" }}>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 3.8vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              margin: "0 0 1rem 0",
              textWrap: "balance",
              maxWidth: "28ch",
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "clamp(1.025rem, 1.6vw, 1.25rem)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "65ch",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {project.summary}
          </p>
        </header>

        <div
          className="hero__foot"
          data-hero-fade
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: "1.5rem",
            marginTop: "0.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "1.5rem 3rem",
          }}
        >
          <p
            className="lead"
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.125rem)",
              maxWidth: "42ch",
              color: "var(--muted)",
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            Delivered for <strong>{project.client}</strong> as <em>{project.role}</em>.
          </p>

          <dl className="spec">
            <div>
              <dt className="note">Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt className="note">Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt className="note">Stack</dt>
              <dd>{project.stack.slice(0, 3).join(" · ")}</dd>
            </div>
            <div>
              <dt className="note">Access</dt>
              <dd>WCAG 2.1 AA</dd>
            </div>
          </dl>
        </div>
      </section>

      {project.imageUrl && (
        <div className="wrap" style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: "4px",
              overflow: "hidden",
              maxHeight: "480px",
              background: "var(--bg-raised)",
            }}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "480px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      )}

      {/* Verified Metrics Ribbon */}
      <section className="section wrap" id="metrics">
        <header className="section-head">
          <span className="note note--ink">[01] Verified Impact</span>
          <span className="note">Measured in production</span>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "1px",
            background: "var(--line)",
            border: "1px solid var(--line)",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--bg-raised)",
                padding: "1.75rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                {m.value}
              </span>
              <span className="note note--ink" style={{ fontSize: "0.85rem" }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section wrap" id="engineering">
        <header className="section-head">
          <span className="note note--ink">[02] Technical Execution</span>
          <span className="note">Challenge → Solution</span>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "2rem",
            }}
          >
            <span className="note note--accent" style={{ display: "block", marginBottom: "0.75rem" }}>
              The Hard Part · Challenge
            </span>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "var(--ink)" }}>
              {project.challenge}
            </p>
          </div>

          <div
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "2rem",
            }}
          >
            <span className="note note--accent" style={{ display: "block", marginBottom: "0.75rem" }}>
              The Engineering · Solution
            </span>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "var(--ink)" }}>
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Deep Dive / Architectural Content (if provided) */}
      {(project.content || project.description) && (
        <section className="section wrap" id="deep-dive">
          <header className="section-head">
            <span className="note note--ink">[03] Case Study &amp; Architectural Breakdown</span>
            <span className="note">In-Depth Walkthrough</span>
          </header>

          <div
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "2.5rem 2rem",
              marginBottom: "3rem",
            }}
          >
            <MarkdownRenderer content={project.content || project.description || ""} />
          </div>
        </section>
      )}

      {/* Deliverables & Stack */}
      <section className="section wrap" id="deliverables">
        <header className="section-head">
          <span className="note note--ink">[{(project.content || project.description) ? "04" : "03"}] Handover Scope</span>
          <span className="note">Deliverables &amp; Stack</span>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <h3 className="h3" style={{ marginBottom: "1rem" }}>
              Project Deliverables
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {project.deliverables.map((d, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "var(--bg-raised)",
                    border: "1px solid var(--line)",
                    borderRadius: "4px",
                    color: "var(--ink)",
                  }}
                >
                  <span className="note note--accent">0{idx + 1}</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="h3" style={{ marginBottom: "1rem" }}>
              Technology Stack
            </h3>
            <ul className="stack" style={{ gap: "0.5rem" }}>
              {project.stack.map((s, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: "2rem",
                padding: "1.5rem",
                background: "var(--bg-raised)",
                border: "1px solid var(--line)",
                borderRadius: "4px",
              }}
            >
              <span className="note note--ink" style={{ display: "block", marginBottom: "0.5rem" }}>
                Engineering &amp; Architecture Note
              </span>
              <p className="note" style={{ color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                Production implementations, architectural diagrams, and code structures reflect real-world builds. Complete repositories, interactive demos, and component breakdowns are available for technical evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next CTA */}
      <section className="section wrap cta">
        <header className="section-head">
          <span className="note note--ink">[04] Collaboration</span>
          <span className="note">Let's build together</span>
        </header>
        <h2 className="display cta__title">Have an idea worth building?</h2>
        <div className="cta__actions">
          <a
            href="mailto:thanzeerwork@gmail.com"
            className="btn"
          >
            Send Me an Email <span className="arrow">↗</span>
          </a>
          <Link href="/#work" className="btn btn--ghost">
            Explore All Projects
          </Link>
        </div>
      </section>
    </>
  );
}
