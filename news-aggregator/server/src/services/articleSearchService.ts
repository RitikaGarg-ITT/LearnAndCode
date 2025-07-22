import { SearchArticleRepository } from "../repositories/searchArticleRepository";

export class ArticleSearchService {
  static async searchArticles(params: {
    keyword: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
  }) 
  {
    return SearchArticleRepository.searchArticles(params);
  }
}
