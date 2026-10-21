"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BLOG_POSTS, type BlogPostMeta } from "@/data/blog";
import { fetchBlogPosts } from "@/lib/firebase/firestore";

export function HomeBlogSection() {
  const [posts, setPosts] = useState<BlogPostMeta[]>(BLOG_POSTS.slice(0, 3));

  useEffect(() => {
    fetchBlogPosts().then((res) => {
      if (res.posts && res.posts.length > 0) {
        setPosts(res.posts.slice(0, 3));
      }
    });
  }, []);

  return (
    <section className="section wrap" id="blog">
      <header className="section-head">
        <span className="note note--ink">[05] From the blog</span>
        <Link href="/blog" className="note link">All posts →</Link>
      </header>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="post grid-12">
              <span className="post__date note">{post.formattedDate}</span>
              <span className="post__title h3">{post.title}</span>
              <span className="post__pillar note">{post.topic}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
