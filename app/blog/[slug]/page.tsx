import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, type BlogPostMeta } from "@/data/blog";
import { fetchBlogPosts } from "@/lib/firebase/firestore";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

async function getPost(slug: string): Promise<BlogPostMeta | undefined> {
  const local = BLOG_POSTS.find((p) => p.slug === slug);
  if (local) return local;

  try {
    const res = await fetchBlogPosts();
    return res.posts.find((p) => p.slug === slug);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | Thanzeer J",
    };
  }

  return {
    title: `${post.title} | Thanzeer J`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const wordCount = (post.content || post.excerpt || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <>
      <article className="article wrap" data-astro-cid-zg7dkzxc>
        <header className="article__head" data-astro-cid-zg7dkzxc>
          <nav className="note crumbs" aria-label="Breadcrumb" data-astro-cid-zg7dkzxc>
            <Link href="/" className="link" data-astro-cid-zg7dkzxc>
              Home
            </Link>{" "}
            /{" "}
            <Link href="/blog" className="link" data-astro-cid-zg7dkzxc>
              Blog
            </Link>{" "}
            /{" "}
            <Link
              href={`/blog/topic/${post.topicSlug || "dev"}`}
              className="link note--ink"
              data-astro-cid-zg7dkzxc
            >
              {post.topic}
            </Link>
          </nav>

          <h1 className="h1 article__title" data-astro-cid-zg7dkzxc>
            {post.title}
          </h1>

          <p className="lead article__desc" data-astro-cid-zg7dkzxc>
            {post.excerpt}
          </p>

          <dl className="article__meta grid-12" data-astro-cid-zg7dkzxc>
            <div data-astro-cid-zg7dkzxc>
              <dt className="note" data-astro-cid-zg7dkzxc>
                Pillar
              </dt>
              <dd data-astro-cid-zg7dkzxc>{post.topic}</dd>
            </div>
            <div data-astro-cid-zg7dkzxc>
              <dt className="note" data-astro-cid-zg7dkzxc>
                Published
              </dt>
              <dd data-astro-cid-zg7dkzxc>{post.formattedDate || post.date}</dd>
            </div>
            <div data-astro-cid-zg7dkzxc>
              <dt className="note" data-astro-cid-zg7dkzxc>
                Reading
              </dt>
              <dd data-astro-cid-zg7dkzxc>{post.readingTime}</dd>
            </div>
            <div data-astro-cid-zg7dkzxc>
              <dt className="note" data-astro-cid-zg7dkzxc>
                Words
              </dt>
              <dd data-astro-cid-zg7dkzxc>{wordCount}</dd>
            </div>
          </dl>
        </header>

        {post.image && (
          <figure className="article__cover" data-astro-cid-zg7dkzxc>
            <img
              src={post.image}
              alt={post.title}
              sizes="(min-width: 1024px) 80vw, 100vw"
              loading="eager"
              fetchPriority="high"
              data-astro-cid-zg7dkzxc="true"
              decoding="async"
              width="1920"
              height="1272"
              style={{ maxHeight: "580px", objectFit: "cover", width: "100%", borderRadius: "6px" }}
            />
            <figcaption className="note" data-astro-cid-zg7dkzxc>
              fig. 01 · {post.title}
            </figcaption>
          </figure>
        )}

        <div className="article__body grid-12" data-astro-cid-zg7dkzxc>
          <div className="prose" data-astro-cid-zg7dkzxc style={{ maxWidth: "800px" }}>
            {post.content ? (
              <MarkdownRenderer content={post.content} />
            ) : (
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>{post.excerpt}</p>
            )}
          </div>
        </div>

        <footer className="article__foot grid-12" data-astro-cid-zg7dkzxc>
          <div className="author" data-astro-cid-zg7dkzxc>
            <p className="note" data-astro-cid-zg7dkzxc>
              Written by
            </p>
            <p className="h3" data-astro-cid-zg7dkzxc>
              Thanzeer J
            </p>
            <p className="author__bio" data-astro-cid-zg7dkzxc>
              Full-Stack Developer &amp; Software Developer based in Kerala, India. Building modern web and mobile applications.
            </p>
            <Link href="/contact" className="btn" data-astro-cid-zg7dkzxc>
              Work with me <span className="arrow" data-astro-cid-zg7dkzxc>→</span>
            </Link>
          </div>

          <Link href="/blog" className="next" data-astro-cid-zg7dkzxc>
            <span className="note" data-astro-cid-zg7dkzxc>Back to Blog</span>
            <span className="h2 next__title" data-astro-cid-zg7dkzxc>Explore All Articles &amp; Insights</span>
          </Link>
        </footer>
      </article>
    </>
  );
}
