"use client";

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (() => {
            const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
            const root = document.documentElement;
            const theme = read("pg-theme") ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
            root.dataset.theme = theme;
            root.dataset.accent = read("pg-accent") ?? "blue";
            root.classList.add("js");
            let seen = null;
            try { seen = sessionStorage.getItem("pg-preloaded"); } catch {}
            if (seen || matchMedia("(prefers-reduced-motion: reduce)").matches) root.dataset.preloaded = "yes";
          })();
        `,
      }}
    />
  );
}
