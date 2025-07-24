// __tests__/authFlows.test.ts

import readlineSync from "readline-sync";
import * as userApi from "../src/api/userApi";
import { signupFlow, loginFlow } from "../src/controllers/authController"; // adjust path as needed

jest.mock("readline-sync");
jest.mock("../api/userApi");

describe("Signup and Login Flows", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("signupFlow", () => {
    test("should perform successful signup and log success message", async () => {
      // Mock user inputs
      (readlineSync.question as jest.Mock)
        .mockReturnValueOnce("John") // First Name
        .mockReturnValueOnce("Doe") // Last Name
        .mockReturnValueOnce("john@example.com"); // Email
      (readlineSync.questionEMail as jest.Mock).mockReturnValue("john@example.com");
      (readlineSync.question as jest.Mock).mockReturnValueOnce("password123"); // Password

      // Mock signup API success response
      (userApi.signup as jest.Mock).mockResolvedValue({ data: { message: "User created successfully" } });

      await signupFlow();

      expect(userApi.signup).toHaveBeenCalledWith({
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        password: "password123",
      });
      expect(console.log).toHaveBeenCalledWith("\n✅ Signup successful:", "User created successfully");
    });

    test("should handle signup API error with server response", async () => {
      // Mock inputs as above
      (readlineSync.question as jest.Mock).mockReturnValueOnce("John").mockReturnValueOnce("Doe");
      (readlineSync.questionEMail as jest.Mock).mockReturnValue("john@example.com");
      (readlineSync.question as jest.Mock).mockReturnValueOnce("password123");

      // Mock API error with response
      const error = {
        response: { status: 400, data: { message: "Email already exists" } },
        message: "Bad Request",
      };
      (userApi.signup as jest.Mock).mockRejectedValue(error);

      await signupFlow();

      expect(console.log).toHaveBeenCalledWith("\n❌ Signup failed.");
      expect(console.error).toHaveBeenCalledWith("Status:", 400);
      expect(console.error).toHaveBeenCalledWith("Server error:", "Email already exists");
    });

    test("should handle network error", async () => {
      (readlineSync.question as jest.Mock).mockReturnValueOnce("John").mockReturnValueOnce("Doe");
      (readlineSync.questionEMail as jest.Mock).mockReturnValue("john@example.com");
      (readlineSync.question as jest.Mock).mockReturnValueOnce("password123");

      const networkError = { code: "ECONNREFUSED", message: "Connection refused" };
      (userApi.signup as jest.Mock).mockRejectedValue(networkError);

      await signupFlow();

      expect(console.error).toHaveBeenCalledWith("⚠️ Network error:", "ECONNREFUSED");
    });
  });

  describe("loginFlow", () => {
    test("should perform successful login and return the user", async () => {
      (readlineSync.questionEMail as jest.Mock).mockReturnValue("john@example.com");
      (readlineSync.question as jest.Mock).mockReturnValueOnce("password123");

      const mockUser = { id: 1, firstname: "John", role: "user" };
      (userApi.login as jest.Mock).mockResolvedValue({ data: { message: "Login successful", user: mockUser } });

      const user = await loginFlow();

      expect(userApi.login).toHaveBeenCalledWith({
        email: "john@example.com",
        password: "password123",
      });
      expect(console.log).toHaveBeenCalledWith("\n✅ Login successful:", "Login successful");
      expect(user).toEqual(mockUser);
    });

    test("should handle login failure with server response and return null", async () => {
      (readlineSync.questionEMail as jest.Mock).mockReturnValue("john@example.com");
      (readlineSync.question as jest.Mock).mockReturnValueOnce("wrongpassword");

      const error = {
        response: { status: 401, data: { message: "Invalid credentials" } },
        message: "Unauthorized",
      };
      (userApi.login as jest.Mock).mockRejectedValue(error);

      const user = await loginFlow();

      expect(console.log).toHaveBeenCalledWith("\n❌ Login failed.");
      expect(console.error).toHaveBeenCalledWith("Status:", 401);
      expect(console.error).toHaveBeenCalledWith("Server error:", "Invalid credentials");
      expect(user).toBeNull();
    });

    test("should handle network errors in login and return null", async () => {
      (readlineSync.questionEMail as jest.Mock).mockReturnValue("john@example.com");
      (readlineSync.question as jest.Mock).mockReturnValueOnce("password123");

      const networkError = { code: "ECONNRESET", message: "Connection reset" };
      (userApi.login as jest.Mock).mockRejectedValue(networkError);

      const user = await loginFlow();

      expect(console.error).toHaveBeenCalledWith("⚠️ Network error:", "ECONNRESET");
      expect(user).toBeNull();
    });
  });
});
