import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book & Tool Reviews | Thanzeer J",
  description: "Honest reviews of books and tools for developers and engineers: software architecture, productivity, and modern tooling.",
};

export default function Page_blog_topic_reviews() {
  return (
    <>
      <section className="bhead wrap" data-astro-cid-ekm3e3ak>
        <div className="bhead__top note" data-astro-cid-ekm3e3ak>
          <nav aria-label="Breadcrumb" data-astro-cid-ekm3e3ak>
            <Link href="/" className="link" data-astro-cid-ekm3e3ak>Home</Link> / <Link href="/blog" className="link" data-astro-cid-ekm3e3ak>Blog</Link> / <span className="note--ink" data-astro-cid-ekm3e3ak>Reviews</span>
          </nav>
          <span data-astro-cid-ekm3e3ak>[Blog / 04]</span>
          <span className="hide-sm" data-astro-cid-ekm3e3ak>Dev · AI · Agencies · Reviews</span>
          <span data-astro-cid-ekm3e3ak>Notes from current work</span>
        </div>
        <h1 className="bhead__title" data-astro-cid-ekm3e3ak>
          <span className="bhead__human display" data-astro-cid-ekm3e3ak>Reviews.</span>
          <span className="bhead__machine h3" data-astro-cid-ekm3e3ak>Books and tools worth your time.</span>
        </h1>
        <span className="bhead__dim note" aria-hidden="true" data-astro-cid-ekm3e3ak>↤ h1 · var(--step-5) · ls −0.055em ↦</span>
        <div className="bhead__foot grid-12" data-astro-cid-ekm3e3ak>
          <p className="bhead__lead lead" data-astro-cid-ekm3e3ak>
            Short, honest reviews of the books and tools that shape how I work: design systems, AI engineering, freelancing.
          </p>
          <dl className="spec" data-astro-cid-ekm3e3ak>
            <div data-astro-cid-ekm3e3ak>
              <dt className="note" data-astro-cid-ekm3e3ak>Entries</dt>
              <dd data-astro-cid-ekm3e3ak>00</dd>
            </div>
            <div data-astro-cid-ekm3e3ak>
              <dt className="note" data-astro-cid-ekm3e3ak>Words</dt>
              <dd data-astro-cid-ekm3e3ak>0</dd>
            </div>
            <div data-astro-cid-ekm3e3ak>
              <dt className="note" data-astro-cid-ekm3e3ak>Since</dt>
              <dd data-astro-cid-ekm3e3ak>2026</dd>
            </div>
            <div data-astro-cid-ekm3e3ak>
              <dt className="note" data-astro-cid-ekm3e3ak>Last entry</dt>
              <dd data-astro-cid-ekm3e3ak>Coming soon</dd>
            </div>
          </dl>
        </div>
        <nav className="topics" aria-label="Topics" data-astro-cid-ekm3e3ak>
          <ul data-astro-cid-ekm3e3ak>
            <li data-astro-cid-ekm3e3ak><Link href="/blog" className="topic" data-astro-cid-ekm3e3ak>All <span className="note" data-astro-cid-ekm3e3ak>7</span></Link></li>
            <li data-astro-cid-ekm3e3ak><Link href="/blog/topic/dev" className="topic" data-astro-cid-ekm3e3ak>Dev <span className="note" data-astro-cid-ekm3e3ak>5</span></Link></li>
            <li data-astro-cid-ekm3e3ak><Link href="/blog/topic/ai-in-practice" className="topic" data-astro-cid-ekm3e3ak>AI in practice <span className="note" data-astro-cid-ekm3e3ak>0</span></Link></li>
            <li data-astro-cid-ekm3e3ak><Link href="/blog/topic/reviews" className="topic" aria-current="page" data-astro-cid-ekm3e3ak>Reviews <span className="note" data-astro-cid-ekm3e3ak>0</span></Link></li>
            <li data-astro-cid-ekm3e3ak><Link href="/blog/topic/freelance" className="topic" data-astro-cid-ekm3e3ak>Freelance <span className="note" data-astro-cid-ekm3e3ak>2</span></Link></li>
          </ul>
        </nav>
      </section>

      <section className="section wrap" data-astro-cid-ekm3e3ak>
        <header className="section-head" data-astro-cid-ekm3e3ak>
          <span className="note note--ink" data-astro-cid-ekm3e3ak>[01] Index</span>
          <span className="note" data-astro-cid-ekm3e3ak>0 entries</span>
        </header>
        <p className="note" style={{ padding: "2.5rem 0", color: "var(--muted)" }}>
          No articles currently published in this topic. New book and tool reviews coming soon.
        </p>
      </section>

      <section className="section wrap subscribe" data-astro-cid-ekm3e3ak>
        <header className="section-head" data-astro-cid-ekm3e3ak>
          <span className="note note--ink" data-astro-cid-ekm3e3ak>[03] Subscribe</span>
          <span className="note" data-astro-cid-ekm3e3ak>LinkedIn · in English</span>
        </header>
        <div className="grid-12" data-astro-cid-ekm3e3ak>
          <h2 className="h2 subscribe__title" data-astro-cid-ekm3e3ak>No schedule. No newsletter spam.</h2>
          <div className="subscribe__body" data-astro-cid-ekm3e3ak>
            <p data-astro-cid-ekm3e3ak>Follow along on LinkedIn, where every post goes out the day it&apos;s published.</p>
            <div className="bhead__actions" data-astro-cid-ekm3e3ak>
              <a href="https://www.linkedin.com/in/thanzeer-j/" className="btn" target="_blank" rel="me noopener" data-astro-cid-ekm3e3ak>LinkedIn <span className="arrow" data-astro-cid-ekm3e3ak>↗</span></a>
              <Link href="/contact" className="btn btn--ghost" data-astro-cid-ekm3e3ak>Suggest a topic</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
