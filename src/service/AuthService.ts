import { User } from "../model/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async signup(name: string, email: string, password: string) {
    const user = new User({ name, email, password });
    await user.save();
    return jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
  }

  async signin(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    await user.comparePassword(password);
    return jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
  }
}
