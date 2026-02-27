import { static as expressStatic } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const staticRouter = expressStatic(join(__dirname, "..", "..", "dist"));