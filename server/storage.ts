import session from "express-session";
import memorystore from "memorystore";

const MemoryStore = memorystore(session);

export const store = new MemoryStore({
  checkPeriod: 86400000, // prune expired entries every 24h
});
