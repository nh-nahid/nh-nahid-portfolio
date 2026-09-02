import https from "https";
import http from "http";
/**
 * Periodically sends a lightweight GET request to the public endpoint
 * to prevent the Render free tier instance from spinning down due to inactivity.
 */
export const startKeepAlive = () => {
    // Determine target URL
    const targetUrl = process.env.KEEP_ALIVE_URL ||
        process.env.RENDER_EXTERNAL_URL ||
        (process.env.NODE_ENV === "production"
            ? "https://nh-nahid.onrender.com"
            : null);
    if (!targetUrl) {
        console.log("ℹ️ [KeepAlive] No external URL configured. Skipping self-ping in local development.");
        return;
    }
    // Ping every 10 minutes (Render sleeps after 15 minutes of inactivity)
    const PING_INTERVAL_MS = 10 * 60 * 1000;
    const pingUrl = `${targetUrl.replace(/\/$/, "")}/ping`;
    const sendPing = () => {
        try {
            const client = pingUrl.startsWith("https") ? https : http;
            const req = client.get(pingUrl, (res) => {
                if (res.statusCode === 200) {
                    console.log(`[KeepAlive] 🟢 Ping successful: ${pingUrl} (Status: ${res.statusCode})`);
                }
                else {
                    console.warn(`[KeepAlive] ⚠️ Ping returned status: ${res.statusCode}`);
                }
                // Consume response data to free up memory
                res.resume();
            });
            req.on("error", (err) => {
                console.error(`[KeepAlive] ❌ Ping failed to ${pingUrl}:`, err.message);
            });
            req.setTimeout(15000, () => {
                req.destroy();
                console.warn(`[KeepAlive] ⏱️ Ping request timed out.`);
            });
        }
        catch (err) {
            console.error("[KeepAlive] Unexpected error during ping:", err.message);
        }
    };
    console.log(`[KeepAlive] 🚀 Service initialized. Pinging ${pingUrl} every 10 minutes.`);
    // First ping after 30 seconds to let the server finish boot sequence
    setTimeout(sendPing, 30 * 1000);
    // Periodic recurring ping
    const interval = setInterval(sendPing, PING_INTERVAL_MS);
    // Prevent this timer from blocking process exit
    if (interval.unref) {
        interval.unref();
    }
};
