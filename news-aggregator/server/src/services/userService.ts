import bcrypt from "bcryptjs";
import userRepo, { UserInput, User } from "../repositories/userRepository";

class UserService {
  public static async signup({ firstname, lastname, email, password }: Omit<UserInput, "role">): Promise<number> {
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: UserInput = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: "user", // Always assign "user"
    };
    return await userRepo.createUser(user);
  }

  /**
   * Logs in a user by validating credentials.
   * @throws Error if user is not found or password is invalid.
   * @returns The user object.
   */
  public static async login({ email, password }: { email: string; password: string }): Promise<User> {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");
    return user; // user.role will be "admin" or "user"
  }
}

export default UserService;
