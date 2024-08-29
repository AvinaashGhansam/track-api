import { Request, NextFunction, Response } from "express";

const loggingMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export default loggingMiddleware;
