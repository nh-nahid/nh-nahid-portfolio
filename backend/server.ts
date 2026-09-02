import app from "./app.js";
import connectDB from "./config/db.js";
import { startKeepAlive } from "./utils/keepAlive.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("Address:", server.address());
      // Start keep-alive service to prevent Render free instance from sleeping
      startKeepAlive();
    });

  } catch (error) {
    console.error("❌ Server failed to start");
    console.error(error);

    process.exit(1);
  }
};

startServer();
