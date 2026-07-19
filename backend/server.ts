import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("Address:", server.address());
    });

  } catch (error) {
    console.error("❌ Server failed to start");
    console.error(error);

    process.exit(1);
  }
};

startServer();
