import { Request } from "express";
import { IUser } from "../model/Users";

export interface CustomRequest extends Request {
  user?: IUser | null; // This ensures that user is either of IUser type or null
}
