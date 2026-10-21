export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`monogram ${className}`}
      viewBox="0 0 68 40"
      width="68"
      height="40"
      role="img"
      aria-label="Thanzeer J"
      style={{ width: "auto", height: "1em", display: "inline-block", overflow: "visible" }}
    >
      <path
        className="monogram__p monogram__t"
        d="M6 7h26 M19 7v26"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        className="monogram__g monogram__j"
        d="M50 7v20c0 6-5 8-11 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <circle
        className="monogram__dot"
        cx="60"
        cy="33"
        r="2.6"
        fill="var(--accent, #2f5bff)"
      />
    </svg>
  );
}

