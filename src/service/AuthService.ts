import { User } from "../model/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as process from "node:process";

export class AuthService {
  async signup(name: string, email: string, password: string) {
    const user = new User({ name, email, password });
    await user.save();
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string);
  }

  async signin(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    await user.comparePassword(password);
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string);
  }
}
