import { ArticleReactionService } from "../services/articleReactionService";

export class ArticleReactionController {
  static async likeArticle(req: any, res: any): Promise< void> {
    const { userId, articleId } = req.body;
    if (!userId || !articleId) return res.status(400).json({ error: "userId and articleId required" });

    await ArticleReactionService.likeArticle(userId, articleId);
    return res.json({ message: "Article liked." });
  }

  static async dislikeArticle(req: any, res: any): Promise< void> {
    const { userId, articleId } = req.body;
    if (!userId || !articleId) return res.status(400).json({ error: "userId and articleId required" });

    await ArticleReactionService.dislikeArticle(userId, articleId);
    return res.json({ message: "Article disliked." });
  }

  static async getArticleReactions(req: any, res: any): Promise< void> {
    const { articleIds } = req.body;
    if (!Array.isArray(articleIds)) return res.status(400).json({ error: "articleIds required" });

    const reactions = await ArticleReactionService.getArticleReactions(articleIds);
    return res.json({ reactions });
  }
}
