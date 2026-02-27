import express from "express";
import { skills } from "./data";
import { setupVite } from "../vite";
import apiRouter from "../routes";
import { staticRouter } from "../static";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const app = express();

  app.use(express.json());

  // Set up Vite middleware in development
  if (process.env.NODE_ENV === "development") {
    await setupVite(app);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "..", "..", "dist")));
  }

  // API routes
  app.use(apiRouter);

  // Catch-all route to serve the client's index.html
  app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
  });

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

main();
