"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import "./404-8.css";

export interface TerminalRoute {
  path: string;
  label: string;
}

export interface Terminal404Props {
  title?: string;
  description?: string;
  homeLink?: string;
  homeText?: string;
  contactLink?: string;
  contactText?: string;
  host?: string;
  routes?: TerminalRoute[];
  className?: string;
}

const DEFAULT_ROUTES: TerminalRoute[] = [
  { path: "/", label: "home" },
  { path: "/#work", label: "projects & case studies" },
  { path: "/services", label: "technical capabilities" },
  { path: "/about", label: "about & background" },
  { path: "/contact", label: "contact support" },
];

export function Block404_8({
  title = "Confirmed: this page is gone.",
  description = "We ran the request ourselves: no redirect, no cache, no luck. Pick a live route from the printout, or head back home.",
  homeLink = "/",
  homeText = "Back home",
  contactLink = "/contact",
  contactText = "Contact support",
  host = "thanzeer-j.is-a.dev",
  routes = DEFAULT_ROUTES,
  className,
}: Terminal404Props) {
  const pathname = usePathname() || "/requested-route";
  const [copied, setCopied] = useState(false);
  const [requestId, setRequestId] = useState("01J9ZK4W7QD8");

  useEffect(() => {
    // Generate a reproducible pseudo-ULID / request ID
    const chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    let id = "01J";
    for (let i = 0; i < 9; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRequestId(id);
  }, []);

  const curlCommand = `curl -I https://${host}${pathname}`;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(curlCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className={cn("terminal-404-container", className)} aria-label="Page not found">
      {/* Ambient background glow */}
      <div className="terminal-404-glow" aria-hidden="true" />

      <div className="terminal-404-inner">
        {/* Title */}
        <h1 className="terminal-404-title">{title}</h1>

        {/* Description */}
        <p className="terminal-404-desc">{description}</p>

        {/* Action Buttons */}
        <div className="terminal-404-actions">
          <Link href={homeLink} className="terminal-404-btn-primary">
            <svg
              className="terminal-404-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>{homeText}</span>
          </Link>

          <Link href={contactLink} className="terminal-404-btn-secondary">
            <svg
              className="terminal-404-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <span>{contactText}</span>
          </Link>
        </div>

        {/* Terminal Window */}
        <div className="terminal-window" role="region" aria-label="Diagnostic terminal">
          {/* Title Bar */}
          <div className="terminal-header">
            {/* Traffic Light Dots */}
            <div className="terminal-dots" aria-hidden="true">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>

            {/* Terminal Title */}
            <div className="terminal-title">portfolio: check-route</div>

            {/* Header Right (Copy button & BASH badge) */}
            <div className="terminal-header-right">
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy curl command"
                title="Copy curl command"
                className="terminal-copy-btn"
              >
                {copied ? (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ color: "#4ade80" }}>copied</span>
                  </>
                ) : (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <span>copy</span>
                  </>
                )}
              </button>
              <span className="terminal-badge">BASH</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="terminal-body">
            {/* Curl Command */}
            <div className="terminal-cmd-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-cmd-name">curl -I</span>
              <span className="terminal-cmd-target">https://{host}{pathname}</span>
            </div>

            {/* HTTP Response */}
            <div className="terminal-http-response">
              <div className="terminal-status-line">
                <span>HTTP/2</span>
                <span className="terminal-status-badge">404</span>
              </div>
              <div className="terminal-meta-line">content-type: text/html; charset=utf-8</div>
              <div className="terminal-meta-line">
                x-request-id: <span>{requestId}</span>
              </div>
            </div>

            {/* ASCII Numeral 404 */}
            <div className="terminal-ascii-wrapper">
              <pre className="terminal-ascii" aria-label="404 numeral in ASCII art">
{`  _  _    ___   _  _  
 | || |  / _ \\ | || | 
 | || |_| | | || || |_
 |__   _| | | ||__   _|
    | | | |_| |   | | 
    |_|  \\___/    |_| `}
              </pre>
            </div>

            {/* Nearest routes printout */}
            <div className="terminal-routes">
              <div className="terminal-routes-label">
                route not found, nearest live routes:
              </div>
              <ul className="terminal-routes-list">
                {routes.map((r) => (
                  <li key={r.path} className="terminal-route-item">
                    <Link href={r.path} className="terminal-route-link">
                      <span className="terminal-route-arrow" aria-hidden="true">→</span>
                      <span className="terminal-route-path">{r.path}</span>
                      <span className="terminal-route-desc">{r.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Prompt & Blinking Cursor */}
            <div className="terminal-prompt-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-cursor" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Block404_8;
