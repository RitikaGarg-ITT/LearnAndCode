import BlockedKeywordService from "./blockedKeywordService";
import { SearchArticleRepository } from "../repositories/searchArticleRepository";
import { AppError } from "../exceptions/appError";

export class ArticleSearchService {
  static async searchArticles(params: { keyword: string; startDate?: string; endDate?: string; sortBy?: string }) {
    // Check if keyword is blocked
    const isBlocked = await BlockedKeywordService.isKeywordBlocked(params.keyword);
    if (isBlocked) {
      throw new AppError("The keyword you are searching is blocked or not relevant.", 403);
    }

    // If not blocked, proceed with search
    return SearchArticleRepository.searchArticles(params);
  }
}
