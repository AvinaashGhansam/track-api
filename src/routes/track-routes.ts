import express from "express";
import { requireAuth } from "../middleware/require-auth";
import { TrackController } from "../controller/TrackController";

const router = express.Router();
const trackController = new TrackController();

router.use(requireAuth);
router.get("/tracks", (req, res) => trackController.getTracks(req, res));
router.post("/tracks", (req, res) => trackController.createNewTrack(req, res));

export default router;
