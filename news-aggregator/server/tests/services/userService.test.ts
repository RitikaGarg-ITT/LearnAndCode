import bcrypt from "bcryptjs";
import userRepo, { User } from "../../src/repositories/userRepository";
import UserService from "../../src/services/userService";

jest.mock("bcryptjs");
jest.mock("../../src/repositories/userRepository");

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should throw error if email already exists", async () => {
      (userRepo.findByEmail as jest.Mock).mockResolvedValue({ email: "test@example.com" });

      await expect(
        UserService.signup({
          firstname: "Test",
          lastname: "User",
          email: "test@example.com",
          password: "pass123",
        })
      ).rejects.toThrow("Email already registered");

      expect(userRepo.findByEmail).toHaveBeenCalledWith("test@example.com");
    });

    it("should hash password and create new user", async () => {
      (userRepo.findByEmail as jest.Mock).mockResolvedValue(undefined);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPass123");
      (userRepo.createUser as jest.Mock).mockResolvedValue(1001);

      const userId = await UserService.signup({
        firstname: "Jane",
        lastname: "Doe",
        email: "jane@example.com",
        password: "secure",
      });

      expect(bcrypt.hash).toHaveBeenCalledWith("secure", 10);
      expect(userRepo.createUser).toHaveBeenCalledWith({
        firstname: "Jane",
        lastname: "Doe",
        email: "jane@example.com",
        password: "hashedPass123",
        role: "user",
      });

      expect(userId).toBe(1001);
    });
  });

  describe("login", () => {
    const fakeUser: User = {
      user_id: 1,
      firstname: "John",
      lastname: "Smith",
      email: "john@example.com",
      password: "hashedpass",
      role: "user",
    };

    it("should throw error if user not found", async () => {
      (userRepo.findByEmail as jest.Mock).mockResolvedValue(undefined);

      await expect(
        UserService.login({
          email: "unknown@example.com",
          password: "any",
        })
      ).rejects.toThrow("User not found");
    });

    it("should throw error if password is incorrect", async () => {
      (userRepo.findByEmail as jest.Mock).mockResolvedValue(fakeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        UserService.login({
          email: "john@example.com",
          password: "wrongpass",
        })
      ).rejects.toThrow("Invalid password");
    });

    it("should return user if credentials are valid", async () => {
      (userRepo.findByEmail as jest.Mock).mockResolvedValue(fakeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const user = await UserService.login({
        email: "john@example.com",
        password: "correctpass",
      });

      expect(user).toEqual(fakeUser);
      expect(bcrypt.compare).toHaveBeenCalledWith("correctpass", "hashedpass");
    });
  });
});
