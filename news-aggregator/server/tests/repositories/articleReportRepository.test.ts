import db from "../../src/config/db";
import { ArticleReportRepository } from "../../src/repositories/articleReportRepository";

jest.mock("../../src/config/db");

describe("ArticleReportRepository", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should insert a new article report and return insertId", async () => {
    const fakeInsertId = 101;
    const mockResult = [{ insertId: fakeInsertId }];

    (db.query as jest.Mock).mockResolvedValue(mockResult);

    const articleId = 1;
    const userId = 2;
    const reason = "Fake News";

    const result = await ArticleReportRepository.reportArticle(articleId, userId, reason);

    expect(db.query).toHaveBeenCalledWith(
      `INSERT INTO article_reports (article_id, user_id, reason) VALUES (?, ?, ?)`,
      [articleId, userId, reason]
    );

    expect(result).toBe(fakeInsertId);
  });

  it("should throw error if DB insert fails", async () => {
    const error = new Error("DB Insert failed");
    (db.query as jest.Mock).mockRejectedValue(error);

    const articleId = 1;
    const userId = 2;
    const reason = "Violation";

    await expect(ArticleReportRepository.reportArticle(articleId, userId, reason)).rejects.toThrow("DB Insert failed");
  });
});
