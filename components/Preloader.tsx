"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Monogram } from "./Monogram";
import "./Preloader.css";

export function Preloader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(true);
  const [count, setCount] = useState(0);
  const [isLifting, setIsLifting] = useState(false);
  const [playId, setPlayId] = useState(0);

  const startAnimation = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMounted(false);
      return;
    }

    setMounted(true);
    setCount(0);
    setIsLifting(false);

    const duration = 1150;
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
    }, 1400);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, 2350);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(liftTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  useEffect(() => {
    const cleanup = startAnimation();

    const handleReplay = () => {
      setPlayId((prev) => prev + 1);
    };

    window.addEventListener("replay-preloader", handleReplay);

    return () => {
      cleanup?.();
      window.removeEventListener("replay-preloader", handleReplay);
    };
  }, [playId, startAnimation]);

  if (!mounted || pathname?.startsWith("/admin")) return null;

  return (
    <div
      key={playId}
      className={`preloader-overlay ${isLifting ? "is-lifting" : ""}`}
      data-preloader
      aria-hidden="true"
    >
      <div className="preloader-meta">
        <span>Plotting thanzeerj.com</span>
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
