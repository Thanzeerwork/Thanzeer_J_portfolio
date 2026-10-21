import React from "react";

export function PageTransitionOverlay() {
  return (
    <div data-astro-transition-persist="pt" className="pt" aria-hidden="true">
      <div className="pt__cols grid-12">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="pt__meta note">
        <span>
          Plotting <span className="pt__to"></span>
        </span>
        <span>rev. 2026</span>
      </div>
      <div className="pt__stage">
        <span className="pt__guide pt__guide--h" style={{ top: 0 }}></span>
        <span className="pt__guide pt__guide--h" style={{ bottom: 0 }}></span>
        <span className="pt__guide pt__guide--v" style={{ left: 0 }}></span>
        <span className="pt__guide pt__guide--v" style={{ right: 0 }}></span>
        <div className="pt__box">
          <span className="pt__label note" data-text="TJ · 68×40"></span>
        </div>
        <svg
          className="monogram pt__mark"
          viewBox="0 0 68 40"
          role="img"
          aria-label="Thanzeer J"
        >
          <path
            className="monogram__p"
            d="M6 7h26 M19 7v26"
            pathLength={1}
          ></path>
          <path
            className="monogram__g"
            d="M50 7v20c0 6-5 8-11 5"
            pathLength={1}
          ></path>
          <circle className="monogram__dot" cx="60" cy="33" r="2.6"></circle>
        </svg>
      </div>
      <div className="pt__meta note">
        <span>Thanzeer J · Full-Stack Dev</span>
        <span className="pt__count">0%</span>
      </div>
    </div>
  );
}
