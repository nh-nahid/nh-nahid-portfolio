"use client";

import { useEffect } from "react";

export default function ContinuousKeepAlive() {
  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5050";
    const pingEndpoint = `${serverUrl.replace(/\/$/, "")}/ping`;

    const sendPing = () => {
      fetch(pingEndpoint, { cache: "no-store", mode: "no-cors" }).catch(() => {});
    };

    // 1. Immediate initial ping on load
    sendPing();

    // 2. Continuous ping every 3 minutes (180,000 ms)
    const interval = setInterval(sendPing, 3 * 60 * 1000);

    // 3. Ping on tab visibility change (e.g. user comes back to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendPing();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
