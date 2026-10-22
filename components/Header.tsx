"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monogram } from "./Monogram";

const ACCENTS = ["blue", "orange", "lime"] as const;

export function Header() {
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  const triggerPlot = useCallback(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.querySelector<HTMLElement>(".site-header .monogram");
    if (!el) return;
    el.classList.remove("is-plotting");
    void el.offsetWidth;
    el.classList.add("is-plotting");
  }, []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    triggerPlot();
  }, [pathname, triggerPlot]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("pg-theme", next); } catch {}
  }, []);

  const cycleAccent = useCallback(() => {
    const root = document.documentElement;
    const current = root.dataset.accent as (typeof ACCENTS)[number];
    const idx = ACCENTS.indexOf(current);
    const next = ACCENTS[(idx + 1) % ACCENTS.length];
    root.dataset.accent = next;
    try { localStorage.setItem("pg-accent", next); } catch {}
  }, []);

  const openPalette = useCallback(() => {
    const el = document.querySelector<HTMLDialogElement>(".palette");
    if (el && !el.open) el.showModal();
  }, []);

  const navLinks = [
    { href: "/#work", label: "Work", n: "01" },
    { href: "/services", label: "Services", n: "02" },
    { href: "/about", label: "About", n: "03" },
    { href: "/blog", label: "Blog", n: "04" },
  ];

  return (
    <header className="site-header wrap">
      <Link
        href="/"
        className="brand"
        aria-label="Thanzeer J, home"
        onClick={() => {
          if (pathname === "/") {
            triggerPlot();
          }
        }}
      >
        <Monogram className="brand__mark is-plotting" />
        <span className="brand__name note note--ink">
          Thanzeer J
          <span className="brand__role"> / Full-Stack Dev</span>
        </span>
      </Link>

      <nav className="nav" aria-label="Main">
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav__link"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                <span className="note" aria-hidden="true">
                  {link.n}
                </span>
                <span className="nav__label" data-label={link.label}>
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="tools">
        <button
          className="tool"
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle light / dark theme"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="7.25" />
            <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" />
          </svg>
        </button>

        <button
          className="tool"
          type="button"
          onClick={cycleAccent}
          aria-label="Change accent colour"
        >
          <span className="swatch" aria-hidden="true" />
        </button>

        <button
          className="tool tool--kbd note"
          type="button"
          onClick={openPalette}
          aria-label="Open command palette (⌘K)"
        >
          ⌘K
        </button>

        <button
          className="tool tool--menu note"
          type="button"
          onClick={openPalette}
          aria-label="Open menu"
        >
          Menu
        </button>

        <Link href="/contact" className="btn header-cta">
          Let&apos;s talk
        </Link>
      </div>

      <div className="hd-rule" aria-hidden="true">
        <span className="hd-rule__fill">
          <span className="hd-rule__tag note" />
        </span>
      </div>
    </header>
  );
}
