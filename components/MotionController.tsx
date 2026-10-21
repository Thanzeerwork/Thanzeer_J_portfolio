"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// Safe dynamic browser import that bypasses server-side / bundler resolution
const importBrowserModule = (url: string) => {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  return new Function("u", "return import(u)")(url);
};

export function MotionController() {
  const pathname = usePathname();
  const router = useRouter();
  const cleanupRef = useRef<(() => void) | null>(null);
  const transitionRef = useRef<{ cover: (url: URL) => Promise<void>; reveal: () => Promise<void> } | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const isShowcase = !pathname.startsWith("/blog");
    root.dataset.motion = isShowcase ? "showcase" : "read";

    // Ensure preloaded state is set to prevent repetitive preloader delay
    try {
      sessionStorage.setItem("pg-preloaded", "1");
    } catch {}
    root.dataset.preloaded = "yes";

    // Retrigger monogram drafting animation on header
    const mono = document.querySelector(".site-header .monogram");
    if (mono && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mono.classList.remove("is-plotting");
      void mono.getBoundingClientRect();
      mono.classList.add("is-plotting");
    }

    // Preload page transition module
    importBrowserModule("/_astro/transition.CSvsZsY3.js")
      .then((mod: any) => {
        transitionRef.current = mod;
        // If a transition was active, reveal it
        mod.reveal();
      })
      .catch(() => {});

    let active = true;

    if (isShowcase) {
      // Small timeout to allow DOM and fonts to settle
      const timer = setTimeout(() => {
        if (!active) return;
        importBrowserModule("/_astro/motion.DTpMruWt.js")
          .then(({ initMotion }: any) => {
            if (!active) return;
            if (cleanupRef.current) {
              cleanupRef.current();
              cleanupRef.current = null;
            }
            cleanupRef.current = initMotion();
          })
          .catch((err: unknown) => {
            console.warn("Motion initialization notice:", err);
          });
      }, 50);

      return () => {
        active = false;
        clearTimeout(timer);
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = null;
        }
        root.dataset.preloaded = "yes";
      };
    } else {
      root.classList.add("motion-ready");
      return () => {
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = null;
        }
      };
    }
  }, [pathname]);

  // Intercept internal link clicks to trigger the architectural blueprint transition cover
  useEffect(() => {
    const handleLinkClick = async (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target || !target.href || target.target || target.hasAttribute("download")) return;

      const url = new URL(target.href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      // Skip hash-only anchor jumps on the same page
      if (url.pathname === window.location.pathname && url.hash) return;

      // Skip palette or custom action buttons
      if (target.dataset.action) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      try {
        const transition = transitionRef.current || (await importBrowserModule("/_astro/transition.CSvsZsY3.js"));
        if (transition && transition.cover) {
          await transition.cover(url);
        }
      } catch (err) {
        console.warn("Transition cover notice:", err);
      }

      router.push(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [router]);

  return null;
}
