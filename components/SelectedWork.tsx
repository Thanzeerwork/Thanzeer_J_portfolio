"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROJECTS, type Project } from "@/data/projects";
import { fetchProjects } from "@/lib/firebase/firestore";

export function SelectedWork() {
  const [projectList, setProjectList] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    fetchProjects().then((res) => {
      if (res.projects && res.projects.length > 0) {
        // Merge to guarantee all 4 foundational projects are always present
        const merged = PROJECTS.map((def) => {
          const found = res.projects.find((p) => p.id === def.id);
          return found ? { ...def, ...found } : def;
        });
        const extras = res.projects.filter(
          (p) => !PROJECTS.some((def) => def.id === p.id)
        );
        setProjectList([...merged, ...extras]);
      }
    });
  }, []);

  const totalCount = String(projectList.length).padStart(2, "0");

  return (
    <div className="ws" data-work-stage data-astro-cid-sc2poqau>
      <div className="ws__count" aria-hidden="true" data-astro-cid-sc2poqau>
        <span className="ws__n" data-ws-n style={{ display: "inline-block" }} data-astro-cid-sc2poqau>
          01
        </span>
        <span className="ws__of outline-text" data-astro-cid-sc2poqau>
          /{totalCount}
        </span>
      </div>

      <div className="ws__stages note" aria-hidden="true" data-astro-cid-sc2poqau>
        <ol data-astro-cid-sc2poqau>
          <li data-ws-stage data-astro-cid-sc2poqau>
            <span data-astro-cid-sc2poqau>01</span>
            <b data-astro-cid-sc2poqau>Plot</b>
            <i data-ws-bar data-astro-cid-sc2poqau />
          </li>
          <li data-ws-stage data-astro-cid-sc2poqau>
            <span data-astro-cid-sc2poqau>02</span>
            <b data-astro-cid-sc2poqau>Build</b>
            <i data-ws-bar data-astro-cid-sc2poqau />
          </li>
          <li data-ws-stage data-astro-cid-sc2poqau>
            <span data-astro-cid-sc2poqau>03</span>
            <b data-astro-cid-sc2poqau>Live</b>
            <i data-ws-bar data-astro-cid-sc2poqau />
          </li>
        </ol>
        <div className="ws__rail" data-astro-cid-sc2poqau>
          {projectList.map((p, idx) => (
            <i
              key={p.id || idx}
              data-ws-dot
              data-astro-cid-sc2poqau
              data-on={idx === 0 ? "" : undefined}
            />
          ))}
        </div>
      </div>

      {projectList.map((p: Project, idx: number) => {
        const itemNumber = String(idx + 1).padStart(2, "0");
        const isFirst = idx === 0;

        return (
          <div
            key={p.id}
            className="ws__item"
            data-ws-item={p.id === "repairro" ? "repairro" : p.id}
            data-astro-cid-sc2poqau
            data-current={isFirst ? "" : undefined}
          >
            <div className="ws__text" data-astro-cid-sc2poqau>
              <div className="ws__meta" data-astro-cid-sc2poqau>
                <span className="note" data-astro-cid-sc2poqau>
                  {itemNumber} / {p.year}
                </span>
                <span className="note" data-astro-cid-sc2poqau>
                  {p.stack?.slice(0, 3).join(" · ")}
                </span>
              </div>

              <h2 className="h3 ws__title" data-astro-cid-sc2poqau>
                <Link href={p.href || `/work/${p.id}`} className="ws__link" data-astro-cid-sc2poqau>
                  {p.title}
                </Link>
              </h2>

              <p className="ws__client note" data-astro-cid-sc2poqau>
                {p.client}
              </p>

              <p className="ws__summary" data-astro-cid-sc2poqau>
                {p.summary}
              </p>

              <div className="ws__actions" data-astro-cid-sc2poqau>
                <Link
                  href={p.href || `/work/${p.id}`}
                  className="btn"
                  data-astro-cid-sc2poqau
                >
                  Read the case study <span className="arrow" aria-hidden="true" data-astro-cid-sc2poqau>→</span>
                </Link>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                    data-astro-cid-sc2poqau
                  >
                    Live site <span aria-hidden="true" data-astro-cid-sc2poqau>↗</span>
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                    data-astro-cid-sc2poqau
                  >
                    GitHub <span aria-hidden="true" data-astro-cid-sc2poqau>↗</span>
                  </a>
                )}
              </div>
            </div>

            <div className="ws__art" aria-hidden="true" data-astro-cid-sc2poqau>
              {p.id === "repairro" ? (
                /* Interactive 3D Hill Terrain Artwork (Pier Gorelli Authentic Signature) */
                <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" data-astro-cid-sc2poqau>
                  <defs>
                    <pattern id={`wsg-${p.id}`} width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M25 0H0V25" fill="none" stroke="currentColor" strokeOpacity=".09" />
                    </pattern>
                  </defs>
                  <rect width="800" height="500" fill={`url(#wsg-${p.id})`} />

                  <g className="plot" data-astro-cid-sc2poqau>
                    <path d="M230 0V500M570 0V500M0 130H800M0 330H800" className="guide" data-p-in data-b-dim data-astro-cid-sc2poqau />
                    <rect x="230" y="130" width="340" height="200" className="wire" pathLength="1" data-p-draw data-b-dim data-astro-cid-sc2poqau />
                    <text x="230" y="118" className="lbl lbl--a" data-p-in data-b-dim data-astro-cid-sc2poqau>
                      REPAIRRO · SERVICE LOGISTICS
                    </text>
                    <text x="570" y="354" textAnchor="end" className="lbl lbl--a" data-p-in data-b-dim data-astro-cid-sc2poqau>
                      Doorstep Pickup &amp; Tracking
                    </text>
                  </g>

                  <g className="build" data-astro-cid-sc2poqau>
                    <rect x="30" y="30" width="740" height="440" className="wire" pathLength="1" data-b-draw data-astro-cid-sc2poqau />
                    <text x="30" y="22" className="lbl lbl--a" data-b-in data-astro-cid-sc2poqau>
                      viewport · mobile app &amp; dispatch
                    </text>
                    <path d="M30 80H770" className="wire" pathLength="1" data-b-draw data-astro-cid-sc2poqau />
                    <rect x="300" y="48" width="56" height="14" className="guide" data-b-in data-astro-cid-sc2poqau />
                    <rect x="380" y="48" width="56" height="14" className="guide" data-b-in data-astro-cid-sc2poqau />
                    <rect x="460" y="48" width="56" height="14" className="guide" data-b-in data-astro-cid-sc2poqau />
                    <rect x="540" y="48" width="56" height="14" className="guide" data-b-in data-astro-cid-sc2poqau />

                    <path d="M0 330.0L20 331.3L40 332.5L60 333.4L80 333.9L100 334.0L120 333.6L140 332.9L160 331.8L180 330.6L200 329.2L220 328.0L240 327.0L260 326.3L280 326.0L300 326.1L320 326.6L340 327.3L360 327.8L380 327.7L400 326.3L420 322.4L440 315.3L460 304.3L480 289.8L500 273.2L520 257.4L540 245.6L560 240.4L580 243.0L600 252.5L620 266.5L640 282.0L660 296.4L680 308.1L700 316.7L720 322.6L740 326.6L760 329.3L780 331.3L800 332.6" className="hill" data-b-in data-astro-cid-sc2poqau />
                    <path d="M0 349.4L20 349.9L40 350.0L60 349.6L80 348.9L100 347.8L120 346.6L140 345.2L160 344.0L180 343.0L200 342.3L220 342.0L240 342.2L260 342.7L280 343.7L300 344.8L320 346.1L340 347.1L360 347.6L380 347.2L400 345.0L420 340.4L440 332.6L460 321.1L480 306.4L500 290.1L520 274.7L540 263.5L560 258.8L580 261.9L600 271.7L620 285.9L640 301.6L660 316.2L680 328.1L700 336.9L720 342.8L740 346.5L760 348.6L780 349.6L800 349.8" className="hill" data-b-in data-astro-cid-sc2poqau />
                    <path d="M0 365.6L20 364.9L40 363.8L60 362.6L80 361.2L100 360.0L120 359.0L140 358.3L160 358.0L180 358.2L200 358.7L220 359.7L240 360.9L260 362.2L280 363.5L300 364.6L320 365.3L340 365.6L360 365.0L380 363.4L400 360.2L420 354.8L440 346.6L460 335.4L480 321.5L500 306.6L520 292.9L540 283.4L560 280.2L580 284.3L600 294.6L620 308.8L640 324.1L660 338.0L680 349.0L700 356.7L720 361.4L740 363.8L760 364.5L780 364.2L800 363.3" className="hill" data-b-in data-astro-cid-sc2poqau />
                    <path d="M0 378.6L20 377.2L40 376.0L60 375.0L80 374.3L100 374.0L120 374.2L140 374.7L160 375.7L180 376.9L200 378.2L220 379.5L240 380.6L260 381.5L280 381.9L300 381.9L320 381.4L340 380.4L360 378.8L380 376.4L400 372.9L420 367.7L440 360.3L460 350.5L480 338.6L500 326.0L520 314.6L540 307.0L560 305.1L580 309.5L600 319.4L620 332.5L640 346.2L660 358.3L680 367.4L700 373.3L720 376.4L740 377.5L760 377.3L780 376.5L800 375.5" className="hill" data-b-in data-astro-cid-sc2poqau />
                    <path d="M0 391.0L20 390.3L40 390.0L60 390.2L80 390.7L100 391.7L120 392.9L140 394.2L160 395.5L180 396.6L200 397.5L220 397.9L240 398.0L260 397.5L280 396.7L300 395.6L320 394.3L340 392.7L360 391.0L380 389.0L400 386.4L420 382.5L440 376.9L460 369.1L480 359.4L500 348.8L520 339.2L540 332.5L560 330.8L580 334.4L600 342.7L620 353.7L640 365.0L660 374.9L680 382.1L700 386.7L720 389.0L740 389.9L760 390.0L780 389.8L800 389.9" className="hill hill--a" data-b-in data-astro-cid-sc2poqau />
                    <path d="M0 406.2L20 406.7L40 407.7L60 408.9L80 410.2L100 411.5L120 412.6L140 413.5L160 413.9L180 414.0L200 413.5L220 412.8L240 411.6L260 410.4L280 409.0L300 407.8L320 406.7L340 405.9L360 405.3L380 404.6L400 403.4L420 401.1L440 397.0L460 390.6L480 382.2L500 372.6L520 363.3L540 356.6L560 353.9L580 356.1L600 362.4L620 371.2L640 380.7L660 389.1L680 395.5L700 399.9L720 402.7L740 404.4L760 405.6L780 406.7L800 407.9" className="hill" data-b-in data-astro-cid-sc2poqau />
                    <path d="M0 424.9L20 426.2L40 427.5L60 428.6L80 429.5L100 429.9L120 430.0L140 429.5L160 428.8L180 427.6L200 426.4L220 425.0L240 423.8L260 422.8L280 422.2L300 422.0L320 422.1L340 422.6L360 423.2L380 423.6L400 423.3L420 421.6L440 417.9L460 411.8L480 403.4L500 393.7L520 384.2L540 376.9L560 373.5L580 374.5L600 379.6L620 387.5L640 396.2L660 404.4L680 411.1L700 416.2L720 419.9L740 422.6L760 424.6L780 426.4L800 427.8" className="hill" data-b-in data-astro-cid-sc2poqau />
                    <path d="M0 444.6L20 445.5L40 445.9L60 446.0L80 445.5L100 444.8L120 443.6L140 442.4L160 441.0L180 439.8L200 438.8L220 438.2L240 438.0L260 438.2L280 438.9L300 439.8L320 441.0L340 442.2L360 443.1L380 443.5L400 442.8L420 440.5L440 436.2L460 429.7L480 421.0L500 411.3L520 402.0L540 394.9L560 391.7L580 392.8L600 398.0L620 405.8L640 414.7L660 423.2L680 430.3L700 435.8L720 439.8L740 442.5L760 444.4L780 445.4L800 445.9" className="hill" data-b-in data-astro-cid-sc2poqau />
                    <path d="M0 462.0L20 461.5L40 460.8L60 459.6L80 458.4L100 457.0L120 455.8L140 454.8L160 454.2L180 454.0L200 454.2L220 454.9L240 455.9L260 457.1L280 458.4L300 459.7L320 460.7L340 461.4L360 461.5L380 460.8L400 459.0L420 455.8L440 451.0L460 444.3L480 436.2L500 427.5L520 419.6L540 414.0L560 412.0L580 414.1L600 419.8L620 427.9L640 436.6L660 444.8L680 451.4L700 456.2L720 459.2L740 460.8L760 461.4L780 461.2L800 460.4" className="hill" data-b-in data-astro-cid-sc2poqau />
                  </g>

                  <g className="live" data-live data-astro-cid-sc2poqau>
                    <clipPath id={`ws-live-${p.id}`} data-astro-cid-sc2poqau>
                      <rect width="800" height="500" data-live-clip data-astro-cid-sc2poqau />
                    </clipPath>
                    <g clipPath={`url(#ws-live-${p.id})`} data-astro-cid-sc2poqau>
                      <rect width="800" height="500" className="paper" data-astro-cid-sc2poqau />

                      <path d="M0 330.0L20 331.3L40 332.5L60 333.4L80 333.9L100 334.0L120 333.6L140 332.9L160 331.8L180 330.6L200 329.2L220 328.0L240 327.0L260 326.3L280 326.0L300 326.1L320 326.6L340 327.3L360 327.8L380 327.7L400 326.3L420 322.4L440 315.3L460 304.3L480 289.8L500 273.2L520 257.4L540 245.6L560 240.4L580 243.0L600 252.5L620 266.5L640 282.0L660 296.4L680 308.1L700 316.7L720 322.6L740 326.6L760 329.3L780 331.3L800 332.6" className="hill hill--live" data-ws-hill data-astro-cid-sc2poqau />
                      <path d="M0 349.4L20 349.9L40 350.0L60 349.6L80 348.9L100 347.8L120 346.6L140 345.2L160 344.0L180 343.0L200 342.3L220 342.0L240 342.2L260 342.7L280 343.7L300 344.8L320 346.1L340 347.1L360 347.6L380 347.2L400 345.0L420 340.4L440 332.6L460 321.1L480 306.4L500 290.1L520 274.7L540 263.5L560 258.8L580 261.9L600 271.7L620 285.9L640 301.6L660 316.2L680 328.1L700 336.9L720 342.8L740 346.5L760 348.6L780 349.6L800 349.8" className="hill hill--live" data-ws-hill data-astro-cid-sc2poqau />
                      <path d="M0 365.6L20 364.9L40 363.8L60 362.6L80 361.2L100 360.0L120 359.0L140 358.3L160 358.0L180 358.2L200 358.7L220 359.7L240 360.9L260 362.2L280 363.5L300 364.6L320 365.3L340 365.6L360 365.0L380 363.4L400 360.2L420 354.8L440 346.6L460 335.4L480 321.5L500 306.6L520 292.9L540 283.4L560 280.2L580 284.3L600 294.6L620 308.8L640 324.1L660 338.0L680 349.0L700 356.7L720 361.4L740 363.8L760 364.5L780 364.2L800 363.3" className="hill hill--live" data-ws-hill data-astro-cid-sc2poqau />
                      <path d="M0 378.6L20 377.2L40 376.0L60 375.0L80 374.3L100 374.0L120 374.2L140 374.7L160 375.7L180 376.9L200 378.2L220 379.5L240 380.6L260 381.5L280 381.9L300 381.9L320 381.4L340 380.4L360 378.8L380 376.4L400 372.9L420 367.7L440 360.3L460 350.5L480 338.6L500 326.0L520 314.6L540 307.0L560 305.1L580 309.5L600 319.4L620 332.5L640 346.2L660 358.3L680 367.4L700 373.3L720 376.4L740 377.5L760 377.3L780 376.5L800 375.5" className="hill hill--live" data-ws-hill data-astro-cid-sc2poqau />
                      <path d="M0 391.0L20 390.3L40 390.0L60 390.2L80 390.7L100 391.7L120 392.9L140 394.2L160 395.5L180 396.6L200 397.5L220 397.9L240 398.0L260 397.5L280 396.7L300 395.6L320 394.3L340 392.7L360 391.0L380 389.0L400 386.4L420 382.5L440 376.9L460 369.1L480 359.4L500 348.8L520 339.2L540 332.5L560 330.8L580 334.4L600 342.7L620 353.7L640 365.0L660 374.9L680 382.1L700 386.7L720 389.0L740 389.9L760 390.0L780 389.8L800 389.9" className="hill hill--a hill--live" data-ws-hill data-astro-cid-sc2poqau />
                      <path d="M0 406.2L20 406.7L40 407.7L60 408.9L80 410.2L100 411.5L120 412.6L140 413.5L160 413.9L180 414.0L200 413.5L220 412.8L240 411.6L260 410.4L280 409.0L300 407.8L320 406.7L340 405.9L360 405.3L380 404.6L400 403.4L420 401.1L440 397.0L460 390.6L480 382.2L500 372.6L520 363.3L540 356.6L560 353.9L580 356.1L600 362.4L620 371.2L640 380.7L660 389.1L680 395.5L700 399.9L720 402.7L740 404.4L760 405.6L780 406.7L800 407.9" className="hill hill--live" data-ws-hill data-astro-cid-sc2poqau />

                      <text x="40" y="60" className="txt txt--lead" data-astro-cid-sc2poqau>
                        Repairro: Doorstep Logistics Platform
                      </text>
                      <text x="40" y="90" className="txt txt--muted" data-astro-cid-sc2poqau>
                        React Native · Cloud Firestore · Express
                      </text>

                      {p.imageUrl && (
                        <g clipPath="url(#ws-preview-repairro-clip)">
                          <clipPath id="ws-preview-repairro-clip">
                            <rect x="420" y="40" width="340" height="230" rx="4" />
                          </clipPath>
                          <image
                            href={p.imageUrl}
                            x="420"
                            y="40"
                            width="340"
                            height="230"
                            preserveAspectRatio="xMidYMid slice"
                          />
                        </g>
                      )}

                      <text x="40" y="468" className="lbl" data-astro-cid-sc2poqau>
                        Logistics metrics · 6 lifecycle stages · 4 roles
                      </text>
                      <g transform="translate(420 446)" data-astro-cid-sc2poqau>
                        <circle cx="16" cy="16" r="15" className="score" data-astro-cid-sc2poqau />
                        <text x="16" y="20" textAnchor="middle" className="lbl lbl--ink lbl--xs" data-astro-cid-sc2poqau>
                          100
                        </text>
                      </g>
                      <g transform="translate(464 446)" data-astro-cid-sc2poqau>
                        <circle cx="16" cy="16" r="15" className="score" data-astro-cid-sc2poqau />
                        <text x="16" y="20" textAnchor="middle" className="lbl lbl--ink lbl--xs" data-astro-cid-sc2poqau>
                          100
                        </text>
                      </g>
                      <g transform="translate(508 446)" data-astro-cid-sc2poqau>
                        <circle cx="16" cy="16" r="15" className="score" data-astro-cid-sc2poqau />
                        <text x="16" y="20" textAnchor="middle" className="lbl lbl--ink lbl--xs" data-astro-cid-sc2poqau>
                          100
                        </text>
                      </g>
                    </g>
                    <path d="M0 0V500" className="scan" data-live-scan data-astro-cid-sc2poqau />
                  </g>
                </svg>
              ) : (
                /* Authentic Blueprint & Interactive Preview Artwork */
                <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" data-astro-cid-sc2poqau>
                  <defs>
                    <pattern id={`wsg-${p.id}`} width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M25 0H0V25" fill="none" stroke="currentColor" strokeOpacity=".09" />
                    </pattern>
                  </defs>
                  <rect width="800" height="500" fill={`url(#wsg-${p.id})`} />

                  <g className="plot" data-astro-cid-sc2poqau>
                    <path d="M60 470L480 50M290 20L760 490" className="guide" data-p-in data-astro-cid-sc2poqau />
                    <rect x="40" y="60" width="225" height="160" className="wire" pathLength="1" data-p-draw data-astro-cid-sc2poqau />
                    <path d="M60 200l60-70 40 40 30-22 75 52" className="wire" pathLength="1" data-p-draw data-astro-cid-sc2poqau />
                    <circle cx="230" cy="95" r="12" className="dot" data-p-in data-astro-cid-sc2poqau />
                    <text x="40" y="248" className="lbl lbl--a" data-p-in data-b-dim data-astro-cid-sc2poqau>
                      {p.id.toUpperCase()} · MODULE 01
                    </text>
                    <rect x="40" y="290" width="170" height="6" rx="3" className="bar" data-p-in data-astro-cid-sc2poqau />

                    <rect x="285" y="60" width="225" height="160" className="wire" pathLength="1" data-p-draw data-astro-cid-sc2poqau />
                    <path d="M305 200l60-70 40 40 30-22 75 52" className="wire" pathLength="1" data-p-draw data-astro-cid-sc2poqau />
                    <circle cx="475" cy="95" r="12" className="acc" data-p-in data-astro-cid-sc2poqau />
                    <text x="285" y="248" className="lbl lbl--a" data-p-in data-b-dim data-astro-cid-sc2poqau>
                      SYSTEM ARCHITECTURE
                    </text>
                    <rect x="285" y="290" width="200" height="6" rx="3" className="bar" data-p-in data-astro-cid-sc2poqau />

                    <rect x="530" y="60" width="225" height="160" className="wire" pathLength="1" data-p-draw data-astro-cid-sc2poqau />
                    <circle cx="720" cy="95" r="12" className="dot" data-p-in data-astro-cid-sc2poqau />
                    <text x="530" y="248" className="lbl lbl--a" data-p-in data-b-dim data-astro-cid-sc2poqau>
                      PRODUCTION READY
                    </text>
                    <rect x="530" y="290" width="150" height="6" rx="3" className="bar" data-p-in data-astro-cid-sc2poqau />

                    <path d="M40 340H760" className="wire" pathLength="1" data-p-draw data-astro-cid-sc2poqau />
                    <text x="40" y="380" className="lbl lbl--a" data-p-in data-astro-cid-sc2poqau>
                      stack · {p.stack?.join(" · ")}
                    </text>
                    <text x="40" y="408" className="lbl lbl--a" data-p-in data-astro-cid-sc2poqau>
                      role · {p.role || "Full-Stack Development"}
                    </text>
                    <text x="40" y="460" className="lbl lbl--a" data-p-in data-astro-cid-sc2poqau>
                      $ build › {p.id} · passed ✓
                    </text>
                  </g>

                  <g className="build" data-astro-cid-sc2poqau>
                    <rect x="40" y="60" width="225" height="160" fill={p.accent || "#2f5bff"} data-b-wipe data-astro-cid-sc2poqau />
                    <text x="55" y="145" className="lbl lbl--light" data-b-in data-astro-cid-sc2poqau>
                      {p.n} · Component View
                    </text>
                    <rect x="40" y="290" width="200" height="6" rx="3" className="acc" data-b-wipe data-astro-cid-sc2poqau />
                    <text x="40" y="318" className="lbl" data-b-in data-astro-cid-sc2poqau>
                      wireframe ✓ · state ✓
                    </text>

                    <rect x="285" y="60" width="225" height="160" fill="#1e293b" data-b-wipe data-astro-cid-sc2poqau />
                    <text x="300" y="145" className="lbl lbl--light" data-b-in data-astro-cid-sc2poqau>
                      Backend &amp; Database
                    </text>
                    <rect x="285" y="290" width="200" height="6" rx="3" className="acc" data-b-wipe data-astro-cid-sc2poqau />
                    <text x="285" y="318" className="lbl" data-b-in data-astro-cid-sc2poqau>
                      schema ✓ · apis ✓
                    </text>

                    <rect x="530" y="60" width="225" height="160" fill="#334155" data-b-wipe data-astro-cid-sc2poqau />
                    <text x="545" y="145" className="lbl lbl--light" data-b-in data-astro-cid-sc2poqau>
                      Live Deployment
                    </text>
                    <rect x="530" y="290" width="200" height="6" rx="3" className="acc" data-b-wipe data-astro-cid-sc2poqau />
                    <text x="530" y="318" className="lbl" data-b-in data-astro-cid-sc2poqau>
                      responsive 100% ✓
                    </text>
                  </g>

                  <g className="live" data-live data-astro-cid-sc2poqau>
                    <clipPath id={`ws-live-${p.id}`} data-astro-cid-sc2poqau>
                      <rect width="800" height="500" data-live-clip data-astro-cid-sc2poqau />
                    </clipPath>
                    <g clipPath={`url(#ws-live-${p.id})`} data-astro-cid-sc2poqau>
                      <rect
                        x="40"
                        y="40"
                        width="720"
                        height="420"
                        rx="6"
                        fill="#0d1117"
                        stroke="var(--line-strong)"
                        strokeWidth="1"
                        data-astro-cid-sc2poqau
                      />
                      {/* Browser Mockup Top Bar */}
                      <circle cx="65" cy="62" r="4" fill="#ef4444" opacity=".8" />
                      <circle cx="80" cy="62" r="4" fill="#f59e0b" opacity=".8" />
                      <circle cx="95" cy="62" r="4" fill="#10b981" opacity=".8" />
                      <rect x="120" y="52" width="280" height="20" rx="4" fill="rgba(255,255,255,0.08)" />
                      <text x="135" y="66" className="lbl lbl--sm" fill="#94a3b8">
                        {p.liveUrl ? p.liveUrl.replace("https://", "").replace(/\/$/, "") : `${p.id}.dev · production`}
                      </text>

                      {p.imageUrl && (
                        <g clipPath={`url(#ws-preview-${p.id}-clip)`}>
                          <clipPath id={`ws-preview-${p.id}-clip`}>
                            <rect x="40" y="82" width="720" height="378" rx="0 0 6 6" />
                          </clipPath>
                          <image
                            href={p.imageUrl}
                            x="40"
                            y="82"
                            width="720"
                            height="378"
                            preserveAspectRatio="xMidYMid slice"
                          />
                        </g>
                      )}

                      <rect x="48" y="440" width="220" height="3" fill="#f4f4f0" fillOpacity=".35" data-astro-cid-sc2poqau />
                      <rect
                        x="48"
                        y="440"
                        width={String(55 * (idx + 1))}
                        height="3"
                        fill={p.accent || "var(--accent)"}
                        data-astro-cid-sc2poqau
                      />
                      <text x="290" y="447" className="lbl lbl--light" data-astro-cid-sc2poqau>
                        {itemNumber} / {totalCount}
                      </text>
                    </g>
                    <path d="M0 0V500" className="scan" data-live-scan data-astro-cid-sc2poqau />
                  </g>
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
