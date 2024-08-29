import express from "express";
import { AuthController } from "../controller/AuthController";

const router = express.Router();
const authController = new AuthController();

router.post("/signup", (req, res) => authController.signup(req, res));
router.post("/signin", (req, res) => authController.signin(req, res));

export default router;
