"use client";

import React, { useEffect, useRef } from "react";

/* ---------------------------------------------------------------
   NETWORK MESH — a canvas of soft nodes that drift slowly and
   draw a line to any neighbor within range. As the nodes float,
   connections form and break, so the mesh shape keeps reforming.

   Pure canvas (no dependency), respects prefers-reduced-motion,
   and sits fixed behind the content at a low opacity so it reads
   as texture rather than noise.
----------------------------------------------------------------*/
export default function NetworkMesh({
  density = 70, // particles per ~1,000,000px² of viewport
  maxDistance = 150, // px within which two nodes connect
  speed = 0.25, // drift speed
  color = "163, 230, 53", // lime-400 as an "r, g, b" string
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles = [];
    let frameId;
    let w = 0;
    let h = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      const count = Math.max(24, Math.round((w * h * density) / 1000000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.4 + 0.8,
      }));
    }

    function drawFrame() {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.55)`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      drawFrame();
      frameId = requestAnimationFrame(loop);
    }

    function handleResize() {
      resize();
      seed();
    }

    resize();
    seed();

    if (reduceMotion) {
      drawFrame(); // one static frame, no animation loop
    } else {
      loop();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [density, maxDistance, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full opacity-60"
      style={{ zIndex: -5 }}
    />
  );
}
