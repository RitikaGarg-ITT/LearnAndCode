import { ArticleReportService } from "../../src/services/articleReportService";
import { ArticleReportRepository } from "../../src/repositories/articleReportRepository";
import db from "../../src/config/db";

// Mocks
jest.mock("../../src/repositories/articleReportRepository");
jest.mock("../../src/config/db");

describe("ArticleReportService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("reportArticle", () => {
    it("should call repository and autoHide if needed", async () => {
      (ArticleReportRepository.reportArticle as jest.Mock).mockResolvedValue(undefined);
      (db.query as jest.Mock).mockResolvedValue([[{ count: 3 }]]); // trigger auto-hide
      (db.query as jest.Mock).mockResolvedValueOnce([[{ count: 3 }]]).mockResolvedValueOnce([{}]); // count + update

      await ArticleReportService.reportArticle(1, 2, "fake");

      expect(ArticleReportRepository.reportArticle).toHaveBeenCalledWith(1, 2, "fake");

      expect(db.query).toHaveBeenCalledWith("SELECT COUNT(*) as count FROM article_reports WHERE article_id = ?", [1]);

      expect(db.query).toHaveBeenCalledWith(
        "UPDATE articles SET is_hidden = 1 WHERE article_id = ? AND is_hidden = 0",
        [1]
      );
    });
  });

  describe("autoHideArticlesWithReports", () => {
    it("should hide the article when count >= 3", async () => {
      (db.query as jest.Mock).mockResolvedValueOnce([[{ count: 4 }]]).mockResolvedValueOnce([{}]);

      await ArticleReportService.autoHideArticlesWithReports(99);

      expect(db.query).toHaveBeenCalledWith("SELECT COUNT(*) as count FROM article_reports WHERE article_id = ?", [99]);

      expect(db.query).toHaveBeenCalledWith(
        "UPDATE articles SET is_hidden = 1 WHERE article_id = ? AND is_hidden = 0",
        [99]
      );
    });

    it("should NOT update article if report count < 3", async () => {
      (db.query as jest.Mock).mockResolvedValueOnce([[{ count: 2 }]]); // No update

      await ArticleReportService.autoHideArticlesWithReports(55);

      expect(db.query).toHaveBeenCalledTimes(1); // Only SELECT
      expect(db.query).not.toHaveBeenCalledWith(expect.stringContaining("UPDATE articles"), expect.any(Array));
    });
  });
});
