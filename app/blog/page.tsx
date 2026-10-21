"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BLOG_POSTS, type BlogPostMeta } from "@/data/blog";
import { fetchBlogPosts } from "@/lib/firebase/firestore";

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPostMeta[]>(BLOG_POSTS);

  useEffect(() => {
    fetchBlogPosts().then((res) => {
      if (res.posts && res.posts.length > 0) {
        setPosts(res.posts);
      }
    });
  }, []);

  const featured = posts[0] || BLOG_POSTS[0];
  const remaining = posts.slice(1);

  const posts2025 = remaining.filter((p) => p.date.startsWith("2025"));
  const posts2024 = remaining.filter((p) => p.date.startsWith("2024"));

  const devCount = posts.filter((p) => p.topicSlug === "dev").length;
  const aiCount = posts.filter((p) => p.topicSlug === "ai-in-practice").length;
  const reviewsCount = posts.filter((p) => p.topicSlug === "reviews").length;
  const freelanceCount = posts.filter((p) => p.topicSlug === "freelance").length;

  return (
    <>
      <section className="bhead wrap" data-astro-cid-ekm3e3ak>
        <div className="bhead__top note" data-astro-cid-ekm3e3ak>
          <nav aria-label="Breadcrumb" data-astro-cid-ekm3e3ak>
            <Link href="/" className="link" data-astro-cid-ekm3e3ak>Home</Link> / <span className="note--ink" data-astro-cid-ekm3e3ak>Blog</span>
          </nav>
          <span data-astro-cid-ekm3e3ak>[Blog / 04]</span>
          <span className="hide-sm" data-astro-cid-ekm3e3ak>Dev · AI · Agencies · Reviews</span>
          <span data-astro-cid-ekm3e3ak>Notes from current work</span>
        </div>

        <h1 className="bhead__title" data-astro-cid-ekm3e3ak>
          <span className="bhead__human display" data-astro-cid-ekm3e3ak>Field notes.</span>
          <span className="bhead__machine h3" data-astro-cid-ekm3e3ak>A web development &amp; AI blog, written from real agency projects.</span>
        </h1>

        <span className="bhead__dim note" aria-hidden="true" data-astro-cid-ekm3e3ak>
          ↤ h1 · var(--step-5) · ls −0.055em ↦
        </span>

        <div className="bhead__foot grid-12" data-astro-cid-ekm3e3ak>
          <p className="bhead__lead lead" data-astro-cid-ekm3e3ak>
            Notes on web development and applied AI from 25 years of building for creative agencies: Astro, GSAP, WordPress, n8n, LLM integrations: what worked, what broke, and why.
          </p>

          <dl className="spec" data-astro-cid-ekm3e3ak>
            <div data-astro-cid-ekm3e3ak>
              <dt className="note" data-astro-cid-ekm3e3ak>Entries</dt>
              <dd data-astro-cid-ekm3e3ak>{posts.length < 10 ? `0${posts.length}` : posts.length}</dd>
            </div>
            <div data-astro-cid-ekm3e3ak>
              <dt className="note" data-astro-cid-ekm3e3ak>Words</dt>
              <dd data-astro-cid-ekm3e3ak>12,450</dd>
            </div>
            <div data-astro-cid-ekm3e3ak>
              <dt className="note" data-astro-cid-ekm3e3ak>Since</dt>
              <dd data-astro-cid-ekm3e3ak>2024</dd>
            </div>
            <div data-astro-cid-ekm3e3ak>
              <dt className="note" data-astro-cid-ekm3e3ak>Last entry</dt>
              <dd data-astro-cid-ekm3e3ak>{featured?.formattedDate || "Recent"}</dd>
            </div>
          </dl>
        </div>

        <nav className="topics" aria-label="Topics" data-astro-cid-ekm3e3ak>
          <ul data-astro-cid-ekm3e3ak>
            <li data-astro-cid-ekm3e3ak>
              <Link href="/blog" className="topic" aria-current="page" data-astro-cid-ekm3e3ak>
                All <span className="note" data-astro-cid-ekm3e3ak>{posts.length}</span>
              </Link>
            </li>
            <li data-astro-cid-ekm3e3ak>
              <Link href="/blog/topic/dev" className="topic" data-astro-cid-ekm3e3ak>
                Dev <span className="note" data-astro-cid-ekm3e3ak>{devCount}</span>
              </Link>
            </li>
            <li data-astro-cid-ekm3e3ak>
              <Link href="/blog/topic/ai-in-practice" className="topic" data-astro-cid-ekm3e3ak>
                AI in practice <span className="note" data-astro-cid-ekm3e3ak>{aiCount}</span>
              </Link>
            </li>
            <li data-astro-cid-ekm3e3ak>
              <Link href="/blog/topic/reviews" className="topic" data-astro-cid-ekm3e3ak>
                Reviews <span className="note" data-astro-cid-ekm3e3ak>{reviewsCount}</span>
              </Link>
            </li>
            <li data-astro-cid-ekm3e3ak>
              <Link href="/blog/topic/freelance" className="topic" data-astro-cid-ekm3e3ak>
                Freelance <span className="note" data-astro-cid-ekm3e3ak>{freelanceCount}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </section>

      {featured && (
        <section className="section wrap featured" data-astro-cid-ekm3e3ak>
          <header className="section-head" data-astro-cid-ekm3e3ak>
            <span className="note note--ink" data-astro-cid-ekm3e3ak>Latest entry</span>
            <span className="note" data-astro-cid-ekm3e3ak>#00{posts.length}</span>
          </header>

          <Link href={`/blog/${featured.slug}`} className="feat grid-12" data-astro-cid-ekm3e3ak>
            {featured.image && (
              <figure className="feat__cover" data-astro-cid-ekm3e3ak>
                <img
                  src={featured.image}
                  alt={featured.title}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  loading="eager"
                  fetchPriority="high"
                  data-astro-cid-ekm3e3ak="true"
                  decoding="async"
                  width="2227"
                  height="1673"
                />
                <figcaption className="note" data-astro-cid-ekm3e3ak>
                  fig. 01 · {featured.title}
                </figcaption>
              </figure>
            )}

            <div className="feat__body" data-astro-cid-ekm3e3ak>
              <span className="note note--accent" data-astro-cid-ekm3e3ak>{featured.topic}</span>
              <h2 className="feat__title h2" data-astro-cid-ekm3e3ak>{featured.title}</h2>
              <p className="feat__desc" data-astro-cid-ekm3e3ak>{featured.excerpt}</p>
              <dl className="feat__meta" data-astro-cid-ekm3e3ak>
                <div data-astro-cid-ekm3e3ak>
                  <dt className="note" data-astro-cid-ekm3e3ak>Published</dt>
                  <dd data-astro-cid-ekm3e3ak>{featured.formattedDate}</dd>
                </div>
                <div data-astro-cid-ekm3e3ak>
                  <dt className="note" data-astro-cid-ekm3e3ak>Reading</dt>
                  <dd data-astro-cid-ekm3e3ak>{featured.readingTime}</dd>
                </div>
              </dl>
              <span className="feat__cta" data-astro-cid-ekm3e3ak>
                Read the entry <span className="arrow" aria-hidden="true" data-astro-cid-ekm3e3ak>→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="section wrap" data-astro-cid-ekm3e3ak>
        <header className="section-head" data-astro-cid-ekm3e3ak>
          <span className="note note--ink" data-astro-cid-ekm3e3ak>[01] Index</span>
          <span className="note" data-astro-cid-ekm3e3ak>{remaining.length} entries · newest first</span>
        </header>

        {posts2025.length > 0 && (
          <div className="year" data-astro-cid-ekm3e3ak>
            <h2 className="year__head" data-astro-cid-ekm3e3ak>
              <span className="year__n outline-text" data-astro-cid-ekm3e3ak>2025</span>
              <span className="note" data-astro-cid-ekm3e3ak>{posts2025.length} entries</span>
            </h2>
            <ol className="entries" data-astro-cid-ekm3e3ak>
              {posts2025.map((post, i) => {
                const entryNum = remaining.length - i;
                return (
                  <li key={post.slug} data-astro-cid-ekm3e3ak>
                    <Link href={`/blog/${post.slug}`} className="entry grid-12" data-astro-cid-ekm3e3ak>
                      <span className="entry__n note" data-astro-cid-ekm3e3ak>
                        #00{entryNum}
                      </span>
                      <time className="entry__date note" dateTime={post.date} data-astro-cid-ekm3e3ak>
                        {post.formattedDate}
                      </time>
                      <span className="entry__main" data-astro-cid-ekm3e3ak>
                        <span className="entry__title" data-astro-cid-ekm3e3ak>{post.title}</span>
                        <span className="entry__desc" data-astro-cid-ekm3e3ak>{post.excerpt}</span>
                      </span>
                      <span className="entry__meta note" data-astro-cid-ekm3e3ak>
                        <span data-astro-cid-ekm3e3ak>{post.topic}</span>
                        <span data-astro-cid-ekm3e3ak>{post.readingTime}</span>
                      </span>
                      <span className="entry__arrow" aria-hidden="true" data-astro-cid-ekm3e3ak>→</span>
                      {post.image && (
                        <span className="entry__thumb" aria-hidden="true" data-astro-cid-ekm3e3ak>
                          <img
                            src={post.image}
                            alt=""
                            loading="lazy"
                            data-astro-cid-ekm3e3ak="true"
                            decoding="async"
                            width="420"
                            height="300"
                          />
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {posts2024.length > 0 && (
          <div className="year" data-astro-cid-ekm3e3ak>
            <h2 className="year__head" data-astro-cid-ekm3e3ak>
              <span className="year__n outline-text" data-astro-cid-ekm3e3ak>2024</span>
              <span className="note" data-astro-cid-ekm3e3ak>{posts2024.length} entries</span>
            </h2>
            <ol className="entries" data-astro-cid-ekm3e3ak>
              {posts2024.map((post, i) => {
                const entryNum = posts2024.length - i;
                return (
                  <li key={post.slug} data-astro-cid-ekm3e3ak>
                    <Link href={`/blog/${post.slug}`} className="entry grid-12" data-astro-cid-ekm3e3ak>
                      <span className="entry__n note" data-astro-cid-ekm3e3ak>
                        #00{entryNum}
                      </span>
                      <time className="entry__date note" dateTime={post.date} data-astro-cid-ekm3e3ak>
                        {post.formattedDate}
                      </time>
                      <span className="entry__main" data-astro-cid-ekm3e3ak>
                        <span className="entry__title" data-astro-cid-ekm3e3ak>{post.title}</span>
                        <span className="entry__desc" data-astro-cid-ekm3e3ak>{post.excerpt}</span>
                      </span>
                      <span className="entry__meta note" data-astro-cid-ekm3e3ak>
                        <span data-astro-cid-ekm3e3ak>{post.topic}</span>
                        <span data-astro-cid-ekm3e3ak>{post.readingTime}</span>
                      </span>
                      <span className="entry__arrow" aria-hidden="true" data-astro-cid-ekm3e3ak>→</span>
                      {post.image && (
                        <span className="entry__thumb" aria-hidden="true" data-astro-cid-ekm3e3ak>
                          <img
                            src={post.image}
                            alt=""
                            loading="lazy"
                            data-astro-cid-ekm3e3ak="true"
                            decoding="async"
                            width="420"
                            height="300"
                          />
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </section>

      <section className="section wrap" data-astro-cid-ekm3e3ak>
        <header className="section-head" data-astro-cid-ekm3e3ak>
          <span className="note note--ink" data-astro-cid-ekm3e3ak>[02] What I write about</span>
          <span className="note" data-astro-cid-ekm3e3ak>Four themes · written between projects</span>
        </header>

        <ul className="pillars grid-12" data-astro-cid-ekm3e3ak>
          <li className="pillar" data-astro-cid-ekm3e3ak>
            <span className="note" data-astro-cid-ekm3e3ak>01</span>
            <h3 className="pillar__title" data-astro-cid-ekm3e3ak>Dev</h3>
            <p className="pillar__body" data-astro-cid-ekm3e3ak>
              Astro, GSAP, WordPress and Drupal, performance budgets and accessibility: what actually works when an agency design has to ship. Plus the occasional homelab experiment.
            </p>
            <Link href="/blog/topic/dev" className="note note--ink link pillar__link" data-astro-cid-ekm3e3ak>
              {devCount} entries →
            </Link>
          </li>

          <li className="pillar" data-astro-cid-ekm3e3ak>
            <span className="note" data-astro-cid-ekm3e3ak>02</span>
            <h3 className="pillar__title" data-astro-cid-ekm3e3ak>AI in practice</h3>
            <p className="pillar__body" data-astro-cid-ekm3e3ak>
              How I put language models into sites and products: RAG on existing content, agents, n8n workflows, real costs and pitfalls, and the AI-assisted setup I use every day.
            </p>
            <Link href="/blog/topic/ai-in-practice" className="note note--ink link pillar__link" data-astro-cid-ekm3e3ak>
              {aiCount} {aiCount === 1 ? "entry" : "entries"} →
            </Link>
          </li>

          <li className="pillar" data-astro-cid-ekm3e3ak>
            <span className="note" data-astro-cid-ekm3e3ak>03</span>
            <h3 className="pillar__title" data-astro-cid-ekm3e3ak>AI for agencies</h3>
            <p className="pillar__body" data-astro-cid-ekm3e3ak>
              Use cases, workflows and adoption notes for agency owners and producers: what to automate, what to keep human, how to brief an AI feature.
            </p>
            <span className="note pillar__link" data-astro-cid-ekm3e3ak>First entry coming soon</span>
          </li>

          <li className="pillar" data-astro-cid-ekm3e3ak>
            <span className="note" data-astro-cid-ekm3e3ak>04</span>
            <h3 className="pillar__title" data-astro-cid-ekm3e3ak>Reviews</h3>
            <p className="pillar__body" data-astro-cid-ekm3e3ak>
              Short, honest reviews of the books and tools that shape how I work: design systems, AI engineering, freelancing.
            </p>
            <Link href="/blog/topic/reviews" className="note note--ink link pillar__link" data-astro-cid-ekm3e3ak>
              {reviewsCount} {reviewsCount === 1 ? "entry" : "entries"} →
            </Link>
          </li>
        </ul>
      </section>

      <section className="section wrap subscribe" data-astro-cid-ekm3e3ak>
        <header className="section-head" data-astro-cid-ekm3e3ak>
          <span className="note note--ink" data-astro-cid-ekm3e3ak>[03] Subscribe</span>
          <span className="note" data-astro-cid-ekm3e3ak>LinkedIn · in English</span>
        </header>
        <div className="grid-12" data-astro-cid-ekm3e3ak>
          <h2 className="h2 subscribe__title" data-astro-cid-ekm3e3ak>No schedule. No newsletter spam.</h2>
          <div className="subscribe__body" data-astro-cid-ekm3e3ak>
            <p data-astro-cid-ekm3e3ak>
              Follow along on LinkedIn, where every post goes out the day it's published. Got a topic you'd like me to dig into, or a project behind the question? Write me.
            </p>
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
