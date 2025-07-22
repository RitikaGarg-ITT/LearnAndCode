import request from "supertest";
import express from "express";
import UserController from "../../src/controllers/userController";

const app = express();
app.use(express.json());
app.post("/signup", UserController.signup);
app.post("/login", UserController.login);

jest.mock("../../src/services/userService", () => ({
  signup: jest.fn(async ({ firstname, lastname, email, password }) => {
    if (email === "duplicate@mail.com") throw new Error("Email already exists");
    return 1;
  }),
  login: jest.fn(async ({ email, password }) => {
    if (email === "fail@mail.com") throw new Error("Invalid credentials");
    return { user_id: 1, role: "user", firstname: "Test", lastname: "User", email };
  }),
}));

describe("UserController", () => {
  describe("Signup", () => {
    it("should return 400 if a field is missing", async () => {
      const res = await request(app).post("/signup").send({ firstname: "a" });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/all fields required/i);
    });

    it("should return 201 and userId on success", async () => {
      const res = await request(app)
        .post("/signup")
        .send({ firstname: "A", lastname: "B", email: "a@b.com", password: "pw" });
      expect(res.status).toBe(201);
      expect(res.body.message).toMatch(/signup successful/i);
      expect(res.body.userId).toBeDefined();
    });

    it("should return 400 if email is duplicate", async () => {
      const res = await request(app)
        .post("/signup")
        .send({ firstname: "A", lastname: "B", email: "duplicate@mail.com", password: "pw" });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/email already exists/i);
    });
  });

  describe("Login", () => {
    it("should return 400 if missing fields", async () => {
      const res = await request(app).post("/login").send({ email: "" });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/email and password required/i);
    });

    it("should return 200 and user on success", async () => {
      const res = await request(app).post("/login").send({ email: "a@b.com", password: "pw" });
      expect(res.status).toBe(200);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.user_id).toBe(1);
    });

    it("should return 400 on failed login", async () => {
      const res = await request(app).post("/login").send({ email: "fail@mail.com", password: "pw" });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/invalid credentials/i);
    });
  });
});
