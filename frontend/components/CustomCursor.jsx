"use client";

import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------
   CUSTOM CURSOR — a small lime dot that tracks the mouse exactly,
   plus a larger ring that eases toward it (lerp), growing and
   glowing when hovering anything clickable. Automatically stays
   off on touch devices and respects prefers-reduced-motion.
----------------------------------------------------------------*/
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frameId;

    function handleMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    }

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(animateRing);
    }

    function handleDown() {
      ringRef.current?.classList.add("cursor-ring--down");
    }
    function handleUp() {
      ringRef.current?.classList.remove("cursor-ring--down");
    }
    function handleLeaveWindow() {
      dotRef.current?.classList.add("cursor--hidden");
      ringRef.current?.classList.add("cursor--hidden");
    }
    function handleEnterWindow() {
      dotRef.current?.classList.remove("cursor--hidden");
      ringRef.current?.classList.remove("cursor--hidden");
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeaveWindow);
    document.addEventListener("mouseenter", handleEnterWindow);
    animateRing();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeaveWindow);
      document.removeEventListener("mouseenter", handleEnterWindow);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
