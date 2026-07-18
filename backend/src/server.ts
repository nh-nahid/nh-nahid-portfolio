import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDB from "./app/config/db.js";
import { env } from "./app/config/env.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${env.PORT}`
      );
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

startServer();