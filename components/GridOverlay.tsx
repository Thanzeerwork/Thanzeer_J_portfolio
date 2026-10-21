"use client";

import { usePathname } from "next/navigation";

export function GridOverlay() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="grid-overlay" aria-hidden="true">
      <div className="grid-12">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}
