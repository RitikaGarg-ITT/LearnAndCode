import { ArticleReportController } from "../../src/controllers/articleReportController";
import { Request, Response } from "express";

// Mock the service
jest.mock("../../src/services/articleReportService", () => ({
  ArticleReportService: {
    reportArticle: jest.fn(),
  },
}));

// Import the mocked service
import { ArticleReportService } from "../../src/services/articleReportService";

// Mock logger to suppress console during test
jest.mock("../../src/utils/logger", () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("ArticleReportController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if fields are missing", async () => {
    const req = {
      body: { userId: 1, reason: "spam" }, // missing articleId
    } as Request;

    const res = mockResponse();

    await ArticleReportController.reportArticle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "articleId, userId, and reason are required",
    });
  });

  test("should return 200 on successful report", async () => {
    const req = {
      body: { articleId: 123, userId: 1, reason: "spam" },
    } as Request;

    const res = mockResponse();

    (ArticleReportService.reportArticle as jest.Mock).mockResolvedValue(undefined);

    await ArticleReportController.reportArticle(req, res);

    expect(ArticleReportService.reportArticle).toHaveBeenCalledWith(123, 1, "spam");
    expect(res.json).toHaveBeenCalledWith({
      message: "Article reported successfully!",
    });
  });

  test("should return 500 on unexpected error", async () => {
    const req = {
      body: { articleId: 123, userId: 1, reason: "spam" },
    } as Request;

    const res = mockResponse();

    (ArticleReportService.reportArticle as jest.Mock).mockRejectedValue(new Error("DB Error"));

    await ArticleReportController.reportArticle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "DB Error",
    });
  });
});
