import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";
import { userValidation } from "../validators/user-validation";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signup(req: Request, res: Response) {
    const { error } = userValidation.validate(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    try {
      const token = await this.authService.signup(name, email, password);
      res.status(201).send({ token });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ error: err.message });
      } else {
        res.status(500).send({ error: "An unexpected error occurred." });
      }
    }
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ error: "Must provide an email and password" });
    }

    try {
      const token = await this.authService.signin(email, password);
      res.send({ token });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ error: err.message });
      } else {
        res.status(500).send({ error: "An unexpected error occurred." });
      }
    }
  }
}
