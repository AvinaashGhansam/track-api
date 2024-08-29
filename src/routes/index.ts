import express from "express";
import trackRoutes from "./track-routes";

const router = express.Router();
router.use("/api/v1", trackRoutes);
