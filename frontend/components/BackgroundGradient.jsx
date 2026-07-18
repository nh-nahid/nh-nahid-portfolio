import React from "react";

/* ---------------------------------------------------------------
   BACKGROUND GRADIENT — a light, fixed gradient wash behind the
   whole site (near-black base + a faint lime glow up top), similar
   in feel to the reference but dialed back so text stays crisp.
----------------------------------------------------------------*/
export default function BackgroundGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950" />
      <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-lime-500 bg-opacity-10 blur-3xl" />
      <div className="absolute bottom-[-12rem] right-[-8rem] h-[22rem] w-[22rem] rounded-full bg-lime-500 bg-opacity-5 blur-3xl" />
    </div>
  );
}
