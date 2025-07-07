import request from "supertest";
import app from "../../src/app"; // Your Express app
import userKeywordService from "../../src/services/userKeywordService";

// Mock the service methods
jest.mock("../../src/services/userKeywordService");

describe("UserKeywordController", () => {
  const mockUserId = 1;
  const mockKeywords = [{ id: 1, user_id: mockUserId, keyword: "tesla" }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/user-keywords", () => {
    it("should return keywords for a valid user", async () => {
      (userKeywordService.getUserKeywords as jest.Mock).mockResolvedValue(mockKeywords);

      const res = await request(app)
        .get("/api/user-keywords")
        .set("user", JSON.stringify({ id: mockUserId }));

      expect(res.status).toBe(200);
      expect(res.body.keywords).toEqual(mockKeywords);
    });

    it("should return 401 if user is not found", async () => {
      const res = await request(app).get("/api/user-keywords");
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("User not found in request");
    });
  });

  describe("POST /api/user-keywords", () => {
    it("should add a keyword for a valid user", async () => {
      (userKeywordService.addKeyword as jest.Mock).mockResolvedValue(undefined);

      const res = await request(app)
        .post("/api/user-keywords")
        .set("user", JSON.stringify({ id: mockUserId }))
        .send({ keyword: "tesla" });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Keyword added.");
    });

    it("should return 400 if keyword is missing", async () => {
      const res = await request(app)
        .post("/api/user-keywords")
        .set("user", JSON.stringify({ id: mockUserId }))
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Keyword is required and must be a non-empty string");
    });
  });

  describe("DELETE /api/user-keywords", () => {
    it("should delete a keyword for a valid user", async () => {
      (userKeywordService.deleteKeyword as jest.Mock).mockResolvedValue(undefined);

      const res = await request(app)
        .delete("/api/user-keywords")
        .set("user", JSON.stringify({ id: mockUserId }))
        .send({ keyword: "tesla" });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Keyword deleted.");
    });

    it("should return 400 if keyword is missing", async () => {
      const res = await request(app)
        .delete("/api/user-keywords")
        .set("user", JSON.stringify({ id: mockUserId }))
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Keyword is required and must be a non-empty string");
    });
  });
});
