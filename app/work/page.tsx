import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { ProjectsCatalog } from "@/components/ProjectsCatalog";

export const metadata: Metadata = {
  title: "Work & Projects · Full-Stack & Mobile Development | Thanzeer J",
  description:
    "Explore production builds, case studies, and mobile apps created by Thanzeer J, including RyphTech, MealHub, FutureSelf, RationKart, and Website Reaper.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thanzeer-j.is-a.dev";

  const jsonLd = {
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
            "item": `${siteUrl}/work`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/work/#collection`,
        "url": `${siteUrl}/work`,
        "name": "Thanzeer J Projects & Production Case Studies",
        "description":
          "Curated catalog of full-stack web applications, React Native mobile apps, and systems engineering builds by Thanzeer J.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="hero wrap"
        style={{
          paddingTop: "clamp(5.5rem, 8vw, 7.5rem)",
          paddingBottom: "2.5rem",
        }}
      >
        <nav className="note crumbs" aria-label="Breadcrumb">
          <Link href="/" className="link">
            Home
          </Link>{" "}
          / <span className="note--ink">Work</span>
        </nav>

        <p className="note" style={{ margin: "0.25rem 0" }}>
          [Catalog / 01] · 13 Production Builds &amp; Case Studies
        </p>

        <h1
          className="hero__title"
          style={{
            marginTop: "0.5rem",
            marginBottom: "1rem",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
          }}
        >
          <span className="display hero__human" style={{ display: "block" }}>
            Selected Works.
          </span>
          <span
            className="h2 hero__machine"
            style={{
              display: "block",
              fontSize: "clamp(1.15rem, 2vw, 1.6rem)",
              color: "var(--muted)",
              fontWeight: 400,
              marginTop: "0.4rem",
            }}
          >
            Web applications, cross-platform mobile apps, and developer systems.
          </span>
        </h1>

        <div
          className="hero__foot"
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: "1.25rem",
            marginTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p
            className="lead"
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
              color: "var(--muted)",
              maxWidth: "65ch",
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            Explore production builds across Full-Stack Web, React Native Mobile, and developer tooling. Every project includes technical challenges, architecture solutions, and live repository links.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href="https://github.com/Thanzeerwork"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
              style={{ fontSize: "0.85rem" }}
            >
              GitHub Profile ↗
            </a>
            <Link
              href="/contact"
              className="btn"
              style={{ fontSize: "0.85rem" }}
            >
              Start a Project →
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: "0" }}>
        <ProjectsCatalog initialProjects={PROJECTS} />
      </section>

      {/* Bottom CTA */}
      <section className="section wrap cta" style={{ marginTop: "3rem" }}>
        <header className="section-head">
          <span className="note note--ink">[02] Next Steps</span>
          <span className="note">Let&#39;s collaborate</span>
        </header>
        <h2 className="display cta__title">Have an application in mind?</h2>
        <div className="cta__actions">
          <a
            href="mailto:thanzeerwork@gmail.com"
            className="btn"
            target="_blank"
            rel="noopener"
          >
            Send Me an Email <span className="arrow">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/thanzeer-j/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}
