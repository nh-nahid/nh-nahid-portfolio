import React from "react";

/* ---------------------------------------------------------------
   GLOBAL STYLES — fonts + keyframe animations used across the
   portfolio (soft float, orbit spin, skill marquee). Mounted once
   at the top of the app.
----------------------------------------------------------------*/
export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

      .font-display { font-family: 'Space Grotesk', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      .font-mono-custom { font-family: 'JetBrains Mono', monospace; }

      html { scroll-behavior: smooth; }

      @keyframes floatSoft {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .float-soft { animation: floatSoft 5s ease-in-out infinite; }

      @keyframes orbitSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes orbitSpinReverse {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); }
      }
      .orbit-ring { animation: orbitSpin 32s linear infinite; }
      .orbit-counter { animation: orbitSpinReverse 32s linear infinite; }

      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .marquee-track { animation: marquee 40s linear infinite; }
      .marquee-mask {
        -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
      }

      @media (prefers-reduced-motion: reduce) {
        .orbit-ring, .orbit-counter, .marquee-track, .float-soft {
          animation: none !important;
        }
      }
    `}</style>
  );
}
