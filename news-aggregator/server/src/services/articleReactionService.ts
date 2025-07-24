import { ArticleReactionRepository } from "../repositories/articleReactionRepository";

export class ArticleReactionService {
  static async likeArticle(userId: number, articleId: number) {
    return ArticleReactionRepository.likeArticle(userId, articleId);
  }

  static async dislikeArticle(userId: number, articleId: number) {
    return ArticleReactionRepository.dislikeArticle(userId, articleId);
  }

  static async getArticleReactions(articleIds: number[]) {
    return ArticleReactionRepository.getArticleReactions(articleIds);
  }
}
