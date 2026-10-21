"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Safe dynamic browser import that bypasses server-side / bundler resolution
const importBrowserModule = (url: string) => {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  return new Function("u", "return import(u)")(url);
};

export function MotionController() {
  const pathname = usePathname();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const isShowcase = !pathname.startsWith("/blog");
    root.dataset.motion = isShowcase ? "showcase" : "read";

    try {
      sessionStorage.setItem("pg-preloaded", "1");
    } catch {}
    root.dataset.preloaded = "yes";

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

  return null;
}
