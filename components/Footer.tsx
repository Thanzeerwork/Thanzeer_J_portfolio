"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monogram } from "./Monogram";

export function Footer() {
  const pathname = usePathname();
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="site-footer wrap">
      <div className="footer-top grid-12">
        <div className="footer-claim">
          <h2 className="h2" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", lineHeight: 1.2, margin: 0 }}>
            Thanzeer J <span className="accent">— Full-Stack Developer</span>
          </h2>
          <p className="lead" style={{ marginTop: "1rem", fontSize: "1rem", maxWidth: "42ch", color: "var(--muted)", lineHeight: 1.6 }}>
            Building practical web and mobile applications with modern technologies.
          </p>
        </div>

        <div className="footer-col">
          <span className="note note--ink" style={{ display: "block", marginBottom: "0.5rem" }}>Navigate</span>
          <ul>
            <li><Link href="/#work" className="link">Work</Link></li>
            <li><Link href="/services" className="link">Services</Link></li>
            <li><Link href="/about" className="link">About</Link></li>
            <li><Link href="/blog" className="link">Blog</Link></li>
            <li><Link href="/contact" className="link">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <span className="note note--ink" style={{ display: "block", marginBottom: "0.5rem" }}>Featured</span>
          <ul>
            <li>
              <Link href="/work/ryphtech" className="link">
                RyphTech <span className="arrow" aria-hidden="true" style={{ fontSize: "0.85em" }}>↗</span>
              </Link>
            </li>
            <li>
              <Link href="/work/mealhub" className="link">
                MealHub <span className="arrow" aria-hidden="true" style={{ fontSize: "0.85em" }}>↗</span>
              </Link>
            </li>
            <li>
              <Link href="/work/repairro" className="link">
                Repairro <span className="arrow" aria-hidden="true" style={{ fontSize: "0.85em" }}>↗</span>
              </Link>
            </li>
            <li>
              <Link href="/work/student-portal" className="link">
                Student Portal <span className="arrow" aria-hidden="true" style={{ fontSize: "0.85em" }}>↗</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <span className="note note--ink" style={{ display: "block", marginBottom: "0.5rem" }}>Connect</span>
          <ul>
            <li>
              <a href="mailto:thanzeerwork@gmail.com" className="link">
                Email <span className="arrow" aria-hidden="true" style={{ fontSize: "0.85em" }}>↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/thanzeer-j/"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                LinkedIn <span className="arrow" aria-hidden="true" style={{ fontSize: "0.85em" }}>↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Thanzeerwork"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                GitHub <span className="arrow" aria-hidden="true" style={{ fontSize: "0.85em" }}>↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://ryphtech.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                RyphTech <span className="arrow" aria-hidden="true" style={{ fontSize: "0.85em" }}>↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-sign">
        <div className="footer-mark" aria-hidden="true">
          <Monogram />
        </div>

        <div className="tb note">
          <dl className="tb__cells">
            <div>
              <dt className="note">Degree</dt>
              <dd className="tb__val">
                <span>B.Tech</span>
              </dd>
            </div>
            <div>
              <dt className="note">Focus</dt>
              <dd className="tb__val">
                <span>Web+App</span>
              </dd>
            </div>
            <div>
              <dt className="note">Location</dt>
              <dd className="tb__val">
                <span>Kerala, IN</span>
              </dd>
            </div>
          </dl>
          <div className="tb__cap note">
            <span>Available for new projects &amp; collaborations</span>
            <Link href="/contact" className="tb__link">
              Get in touch →
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom note">
        <div className="copy">
          <span>© {year} Thanzeer J</span>
          <span>Full-Stack Developer</span>
          <span>Kerala, India</span>
        </div>
        <div className="legal-links">
          <Link href="/privacy-policy" className="link">Privacy</Link>
          <Link href="/cookie-policy" className="link">Cookies</Link>
          <Link href="/accessibility" className="link">Accessibility</Link>
        </div>
        <span className="hint">
          Press <kbd>⌘K</kbd> for quick navigation
        </span>
      </div>
    </footer>
  );
}
