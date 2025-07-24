import { SearchArticleRepository } from "../../src/repositories/searchArticleRepository";
import db from "../../src/config/db";
import logger from "../../src/utils/logger";

jest.mock("../../src/config/db");
jest.mock("../../src/utils/logger", () => ({
  error: jest.fn(),
}));

describe("SearchArticleRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return articles with only keyword search", async () => {
    const fakeArticles = [{ article_id: 1, title: "Tesla", likes: 5, dislikes: 0 }];
    (db.query as jest.Mock).mockResolvedValue([fakeArticles]);

    const searchParams = {
      keyword: "Tesla",
      sortBy: "likes",
    };

    const result = await SearchArticleRepository.searchArticles(searchParams);

    expect(db.query).toHaveBeenCalled();
    const [[sql], params] = (db.query as jest.Mock).mock.calls[0];

    expect(sql).toContain("WHERE (a.title LIKE ? OR a.description LIKE ?)");
    expect(sql).toContain("ORDER BY likes DESC");
    expect(params).toEqual(["%Tesla%", "%Tesla%"]);

    expect(result).toEqual(fakeArticles);
  });

  it("should apply date filter and sort by dislikes", async () => {
    const resultSet = [{ article_id: 2, title: "Market fall", likes: 1, dislikes: 12 }];
    (db.query as jest.Mock).mockResolvedValue([resultSet]);

    const searchParams = {
      keyword: "Market",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      sortBy: "dislikes",
    };

    const result = await SearchArticleRepository.searchArticles(searchParams);

    expect(db.query).toHaveBeenCalled();
    const [[sql], params] = (db.query as jest.Mock).mock.calls[0];

    expect(sql).toContain("a.published_at BETWEEN ? AND ?");
    expect(sql).toContain("ORDER BY dislikes DESC");
    expect(params).toEqual(["%Market%", "%Market%", "2024-01-01", "2024-12-31"]);

    expect(result).toEqual(resultSet);
  });

  it("should log and rethrow DB errors", async () => {
    const dbError = new Error("DB connection error");
    (db.query as jest.Mock).mockRejectedValue(dbError);

    const searchParams = {
      keyword: "Fail",
      sortBy: "likes",
    };

    await expect(SearchArticleRepository.searchArticles(searchParams)).rejects.toThrow("DB connection error");

    expect(logger.error).toHaveBeenCalledWith("DB Error in searchArticles:", dbError);
  });
});
