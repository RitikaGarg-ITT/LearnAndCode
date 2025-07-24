import db from "../../src/config/db";
import UserRepository, { UserInput, User } from "../../src/repositories/userRepository";


jest.mock("../../src/config/db");

describe("UserRepository", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("createUser", () => {
    it("should insert user and return generated insertId", async () => {
      const fakeInsertId = 101;
      const user: UserInput = {
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: "user",
      };

      (db.query as jest.Mock).mockResolvedValue([{ insertId: fakeInsertId }]);

      const result = await UserRepository.createUser(user);
      expect(result).toBe(fakeInsertId);

      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO USERS (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [user.firstname, user.lastname, user.email, user.password, user.role]
      );
    });
  });

  describe("findByEmail", () => {
    it("should return user object if found", async () => {
      const mockUser: User = {
        user_id: 1,
        firstname: "Alice",
        lastname: "Wonder",
        email: "alice@example.com",
        password: "passwordHash",
        role: "user",
      };

      (db.query as jest.Mock).mockResolvedValue([[mockUser]]);

      const result = await UserRepository.findByEmail("alice@example.com");

      expect(db.query).toHaveBeenCalledWith("SELECT * FROM USERS WHERE email = ?", ["alice@example.com"]);
      expect(result).toEqual(mockUser);
    });

    it("should return undefined if user not found", async () => {
      (db.query as jest.Mock).mockResolvedValue([[]]);

      const result = await UserRepository.findByEmail("notfound@example.com");

      expect(result).toBeUndefined();
    });

    it("should throw error if rows are not an array", async () => {
      (db.query as jest.Mock).mockResolvedValue([undefined]);

      await expect(UserRepository.findByEmail("test@example.com")).rejects.toThrow("Query did not return rows");
    });
  });
});
