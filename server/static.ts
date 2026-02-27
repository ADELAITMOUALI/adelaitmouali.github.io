import { static as expressStatic } from "express";
import { join } from "path";

export const staticRouter = expressStatic(join(__dirname, "..", "public"));