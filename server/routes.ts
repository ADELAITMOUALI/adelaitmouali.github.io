import { Router } from "express";

const router = Router();

router.get("/api/skills", (req, res) => {
  // Implement logic to get skills
  res.json({ skills: [] });
});

export default router;