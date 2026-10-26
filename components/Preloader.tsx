"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Monogram } from "./Monogram";
import "./Preloader.css";

export function Preloader() {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  const [mounted, setMounted] = useState(true);
  const [count, setCount] = useState(0);
  const [isLifting, setIsLifting] = useState(false);
  const [playId, setPlayId] = useState(0);

  // Synchronously react to route changes during render to immediately show the preloader over the new page
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (!pathname?.startsWith("/admin")) {
      setMounted(true);
      setCount(0);
      setIsLifting(false);
      setPlayId((p) => p + 1);
    } else {
      setMounted(false);
    }
  }

  const startAnimation = useCallback(() => {
    setMounted(true);
    setCount(0);
    setIsLifting(false);

    const duration = 1100;
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    const liftTimer = setTimeout(() => {
      setIsLifting(true);
    }, 1350);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, 2250);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(liftTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setMounted(false);
      return;
    }

    const cleanup = startAnimation();

    return () => {
      cleanup?.();
    };
  }, [playId, startAnimation, pathname]);

  if (!mounted || pathname?.startsWith("/admin")) return null;

  const displayPath =
    pathname && pathname !== "/"
      ? `thanzeerj.com${pathname.toLowerCase()}`
      : "thanzeerj.com";

  return (
    <div
      key={playId}
      className={`preloader-overlay ${isLifting ? "is-lifting" : ""}`}
      data-preloader
      aria-hidden="true"
    >
      <div className="preloader-meta">
        <span>Plotting {displayPath}</span>
        <span>rev. 2026</span>
      </div>

      <div className="preloader-center">
        <Monogram className="preloader-mark" />
      </div>

      <div className="preloader-meta">
        <span>Thanzeer J · Full-Stack Dev</span>
        <span className="preloader-count">{String(count).padStart(2, "0")}%</span>
      </div>
    </div>
  );
}
