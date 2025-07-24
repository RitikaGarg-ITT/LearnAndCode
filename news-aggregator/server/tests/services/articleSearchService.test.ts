import { ArticleSearchService } from "../../src/services/articleSearchService";
import { SearchArticleRepository } from "../../src/repositories/searchArticleRepository";

// Mock the repository
jest.mock("../../src/repositories/searchArticleRepository");

describe("ArticleSearchService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return articles from repository with correct params", async () => {
    const mockArticles = [
      { title: "Tesla rises", category: "Business", likes: 5, dislikes: 2 },
      { title: "Elon Musk tweets", category: "Technology", likes: 3, dislikes: 1 },
    ];

    const searchParams = {
      keyword: "Tesla",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      sortBy: "likes",
    };

    (SearchArticleRepository.searchArticles as jest.Mock).mockResolvedValue(mockArticles);

    const result = await ArticleSearchService.searchArticles(searchParams);

    expect(SearchArticleRepository.searchArticles).toHaveBeenCalledWith(searchParams);
    expect(result).toEqual(mockArticles);
  });

  test("should throw error if repository throws", async () => {
    const searchParams = { keyword: "error" };
    (SearchArticleRepository.searchArticles as jest.Mock).mockRejectedValue(new Error("DB fail"));

    await expect(ArticleSearchService.searchArticles(searchParams)).rejects.toThrow("DB fail");
  });
});
