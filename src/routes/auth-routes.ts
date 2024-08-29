import express from "express";
import { AuthController } from "../controller/AuthController";

const router = express.Router();
const authController = new AuthController();

router.post("/api/v1/signup", (req, res) => authController.signup(req, res));
router.post("/api/v1/signin", (req, res) => authController.signin(req, res));

export default router;
