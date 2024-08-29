import express, { Request, Response } from "express";
import { IUser } from "../model/Users";

interface AuthRequest extends Request {
  user?: IUser | null;
}
const router = express.Router();

router.get("/", (req: AuthRequest, res: Response) => {
  res.send(`your email ${req.user}`);
});
export default router;
