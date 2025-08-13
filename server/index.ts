import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleAIAssistant } from "./routes/ai-assistant";
import { handleFoodScan, handleQuickScan } from "./routes/food-scan";
import {
  handleMoodRecommendations,
  handleGetMoods,
} from "./routes/mood-recommendations";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // AI-powered health tracking endpoints
  app.post("/api/ai-assistant", handleAIAssistant);
  app.post("/api/food-scan", handleFoodScan);
  app.post("/api/quick-scan", handleQuickScan);
  app.post("/api/mood-recommendations", handleMoodRecommendations);
  app.get("/api/moods", handleGetMoods);

  return app;
}
