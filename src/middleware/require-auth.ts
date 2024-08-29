import { Response, NextFunction } from "express";
import { CustomRequest } from "customTypes";
import jwt from "jsonwebtoken";
import { User } from "../model/Users"; // Ensure this path is correct

export const requireAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "").trim();
  jwt.verify(token, "MY_SECRET_KEY", async (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const userId = (decoded as jwt.JwtPayload).userId as string; // Cast appropriately based on your payload structure
    if (userId) {
      req.user = await User.findById(userId);
      next();
    } else {
      return res.status(401).send({ error: "You must be logged in." });
    }
  });
};
