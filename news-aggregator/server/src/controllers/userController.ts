import userService from "../services/userService";
import { Request, Response } from "express";
import logger from "../utils/logger";

class UserController {
  public static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, password } = req.body;
      if (!firstname || !lastname || !email || !password) {
        res.status(400).json({ message: "All fields required" });
        return;
      }
      const userId = await userService.signup({ firstname, lastname, email, password });
      res.status(201).json({ message: "Signup successful", userId });
    } catch (err: any) {
      logger.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password required" });
        return;
      }
      const user = await userService.login({ email, password });
      res.status(200).json({
        message: "Login successful",
        user: {
          user_id: user.user_id,
          role: user.role,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default UserController;
