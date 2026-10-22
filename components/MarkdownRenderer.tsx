import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Parses inline markdown:
 * - Images: ![alt](url)
 * - Links: [text](url)
 * - Bold: **text**
 * - Italic: *text*
 * - Code: `code`
 */
function renderInline(text: string): React.ReactNode[] {
  // Regex pattern matching inline elements
  const pattern = /(!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const [fullMatch, , imgAlt, imgUrl, linkText, linkUrl, boldText, italicText, codeText] = match;
    const matchIndex = match.index;

    // Append preceding plain text
    if (matchIndex > lastIndex) {
      nodes.push(text.substring(lastIndex, matchIndex));
    }

    if (imgAlt !== undefined && imgUrl !== undefined) {
      nodes.push(
        <span key={`img-${matchIndex}`} className="markdown-inline-img-wrap" style={{ display: "block", margin: "1.5rem 0" }}>
          <img
            src={imgUrl}
            alt={imgAlt || "Image"}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "6px",
              border: "1px solid var(--line, rgba(255,255,255,0.1))",
              display: "block",
            }}
            loading="lazy"
          />
          {imgAlt && (
            <span
              style={{
                display: "block",
                fontSize: "0.8rem",
                color: "var(--muted, #8a909d)",
                fontFamily: "var(--admin-font-mono, monospace)",
                marginTop: "0.5rem",
              }}
            >
              fig. {imgAlt}
            </span>
          )}
        </span>
      );
    } else if (linkText !== undefined && linkUrl !== undefined) {
      const isExternal = linkUrl.startsWith("http");
      nodes.push(
        <a
          key={`link-${matchIndex}`}
          href={linkUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="link link--accent"
          style={{ color: "var(--admin-accent, #2f5bff)", textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          {linkText}
        </a>
      );
    } else if (boldText !== undefined) {
      nodes.push(<strong key={`bold-${matchIndex}`} style={{ fontWeight: 700, color: "var(--ink, #fff)" }}>{boldText}</strong>);
    } else if (italicText !== undefined) {
      nodes.push(<em key={`italic-${matchIndex}`} style={{ fontStyle: "italic" }}>{italicText}</em>);
    } else if (codeText !== undefined) {
      nodes.push(
        <code
          key={`code-${matchIndex}`}
          style={{
            fontFamily: "var(--admin-font-mono, monospace)",
            background: "rgba(255,255,255,0.08)",
            padding: "0.15rem 0.4rem",
            borderRadius: "4px",
            fontSize: "0.88em",
            color: "var(--ink, #fff)",
          }}
        >
          {codeText}
        </code>
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.substring(lastIndex));
  }

  return nodes;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content || !content.trim()) {
    return null;
  }

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Code block ```
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={`code-block-${i}`}
          style={{
            background: "#0d1117",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            padding: "1.25rem",
            overflowX: "auto",
            margin: "1.5rem 0",
            fontFamily: "var(--admin-font-mono, monospace)",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "#e6edf3",
          }}
        >
          {lang && (
            <div style={{ color: "#8a909d", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              [{lang}]
            </div>
          )}
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Horizontal Rule ---
    if (/^(\*\*\*|---|___)$/.test(trimmed)) {
      elements.push(
        <hr
          key={`hr-${i}`}
          style={{ border: "none", borderTop: "1px solid var(--line, rgba(255,255,255,0.12))", margin: "2rem 0" }}
        />
      );
      i++;
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          style={{ fontSize: "1.25rem", fontWeight: 700, margin: "1.75rem 0 0.75rem", color: "var(--ink, #fff)", lineHeight: 1.3 }}
        >
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          style={{ fontSize: "1.6rem", fontWeight: 700, margin: "2.25rem 0 1rem", color: "var(--ink, #fff)", lineHeight: 1.25 }}
        >
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${i}`}
          style={{ fontSize: "2rem", fontWeight: 700, margin: "2.5rem 0 1.25rem", color: "var(--ink, #fff)", lineHeight: 1.2 }}
        >
          {renderInline(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Blockquote >
    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [trimmed.slice(2)];
      i++;
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={`quote-${i}`}
          style={{
            borderLeft: "3px solid var(--admin-accent, #2f5bff)",
            background: "rgba(47, 91, 255, 0.05)",
            padding: "1rem 1.25rem",
            margin: "1.5rem 0",
            fontStyle: "italic",
            color: "var(--ink, #e2e8f0)",
            borderRadius: "0 6px 6px 0",
          }}
        >
          {quoteLines.map((ql, qidx) => (
            <p key={qidx} style={{ margin: qidx > 0 ? "0.5rem 0 0" : 0 }}>
              {renderInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered List (- or *)
    if (/^[-*]\s+/.test(trimmed)) {
      const listItems: string[] = [trimmed.replace(/^[-*]\s+/, "")];
      i++;
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          style={{
            margin: "1rem 0 1.5rem 1.5rem",
            padding: 0,
            listStyleType: "disc",
            color: "var(--ink, #e2e8f0)",
            lineHeight: 1.7,
          }}
        >
          {listItems.map((item, idx) => (
            <li key={idx} style={{ marginBottom: "0.35rem" }}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List (1. )
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [trimmed.replace(/^\d+\.\s+/, "")];
      i++;
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${i}`}
          style={{
            margin: "1rem 0 1.5rem 1.5rem",
            padding: 0,
            listStyleType: "decimal",
            color: "var(--ink, #e2e8f0)",
            lineHeight: 1.7,
          }}
        >
          {listItems.map((item, idx) => (
            <li key={idx} style={{ marginBottom: "0.35rem" }}>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Standalone Image: ![alt](url)
    if (/^!\[([^\]]*)\]\(([^)]+)\)$/.test(trimmed)) {
      const m = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (m) {
        const alt = m[1];
        const src = m[2];
        elements.push(
          <figure key={`fig-${i}`} style={{ margin: "2rem 0" }}>
            <img
              src={src}
              alt={alt || "Article illustration"}
              style={{
                width: "100%",
                maxHeight: "560px",
                objectFit: "cover",
                borderRadius: "6px",
                border: "1px solid var(--line, rgba(255,255,255,0.12))",
                display: "block",
              }}
              loading="lazy"
            />
            {alt && (
              <figcaption
                style={{
                  fontSize: "0.8rem",
                  color: "var(--muted, #8a909d)",
                  fontFamily: "var(--admin-font-mono, monospace)",
                  marginTop: "0.5rem",
                  textAlign: "center",
                }}
              >
                fig. {alt}
              </figcaption>
            )}
          </figure>
        );
        i++;
        continue;
      }
    }

    // Normal Paragraph
    elements.push(
      <p
        key={`p-${i}`}
        style={{
          margin: "0 0 1.25rem",
          lineHeight: 1.75,
          color: "var(--ink, #cbd5e1)",
          fontSize: "1.05rem",
        }}
      >
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className={`prose-rendered ${className}`}>{elements}</div>;
}
