import express from "express";
import { skills } from "./data";
import { setupVite } from "../vite";
import apiRouter from "../routes";
import { staticRouter } from "../static";

async function main() {
  const app = express();

  app.use(express.json());

  // Set up Vite middleware in development
  if (process.env.NODE_ENV === "development") {
    await setupVite(app);
  } else {
    // Serve static files in production
    app.use(staticRouter);
  }

  // API routes
  app.use(apiRouter);

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

main();
