'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Lanyard = dynamic(() => import('@/components/Lanyard'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 70%), var(--bg-raised, #0e1217)',
        borderRadius: '12px',
        border: '1px solid var(--line, rgba(255,255,255,0.08))',
        color: 'var(--muted, #8b949e)',
        fontSize: '0.85rem',
        gap: '0.5rem',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          border: '2px solid rgba(255,255,255,0.15)',
          borderTopColor: 'var(--accent, #ff5722)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span>Loading 3D badge...</span>
    </div>
  ),
});

interface AboutLanyardProps {
  className?: string;
  style?: React.CSSProperties;
}

export function AboutLanyard({ className = '', style }: AboutLanyardProps) {
  const [finish, setFinish] = useState<'holographic' | 'glossy' | 'metallic'>('metallic');
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={`about-lanyard-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Structural horizontal connecting line that the lanyard strap hangs from */}
      <div
        className="lanyard-hang-line"
        style={{
          width: '100%',
          height: '1px',
          background: 'var(--line-strong, rgba(0, 0, 0, 0.25))',
          position: 'relative',
        }}
      >
        {/* Metal clamp fixture mounted on the line */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: isMobile ? '28px' : '24px',
            height: '6px',
            background: 'var(--ink, #111)',
            borderRadius: '2px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            zIndex: 3,
          }}
        />
      </div>

      {/* Transparent canvas container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '440px' : '500px',
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          overflow: 'hidden',
        }}
      >
        <Lanyard
          frontImage="/images/thanzeer.jpg"
          backImage="/images/thanzeer-id-back.png"
          imageFit="cover"
          cardColor="#0c0e12"
          orientation="portrait"
          finish={finish}
          cornerRadius={0.2}
          size={isMobile ? 0.98 : 0.88}
          anchor="center"
          strapLength={isMobile ? 0.25 : 0.32}
          strapColor="#111317"
          strapWidth={isMobile ? 0.75 : 0.7}
          metal="silver"
          gravity={1}
          damping={0.55}
          elasticity={0.45}
          breeze={0.3}
          interactive={true}
          intro={true}
        />

        {/* Finish toggle pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            gap: '4px',
            background: 'rgba(12, 16, 22, 0.75)',
            backdropFilter: 'blur(8px)',
            padding: '3px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 10,
          }}
        >
          {(['metallic', 'holographic', 'glossy'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFinish(mode)}
              style={{
                background: finish === mode ? 'var(--accent, #ff5722)' : 'transparent',
                color: finish === mode ? '#fff' : 'rgba(255,255,255,0.6)',
                border: 'none',
                borderRadius: '14px',
                padding: '3px 8px',
                fontSize: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'all 0.15s ease',
              }}
            >
              {mode === 'metallic' ? 'Metal' : mode === 'holographic' ? 'Holo' : 'Gloss'}
            </button>
          ))}
        </div>
      </div>

      <div
        className="note"
        style={{
          marginTop: '0.65rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: 'var(--muted, #8b949e)',
          padding: '0 4px',
        }}
      >
        <span>fig. 01 · Thanzeer J · ID badge</span>
        <span style={{ color: 'var(--accent-text, #ff5722)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
          drag · swing · click to flip
        </span>
      </div>
    </div>
  );
}

export default AboutLanyard;
