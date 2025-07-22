import db from "../config/db";

export interface ArticleInput {
  source_id: number;
  title: string;
  description: string;
  content: string;
  url: string;
  image_url: string;
  category_id: number;
  published_at: Date;
}

class ArticleRepo {

  public static async createArticle(article: ArticleInput): Promise<number> {
    const [result]: any = await db.query(
      `INSERT INTO ARTICLES 
      (source_id, title, description, content, url, image_url, category_id, published_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        article.source_id,
        article.title,
        article.description,
        article.content,
        article.url,
        article.image_url,
        article.category_id,
        article.published_at,
      ]
    );
    return result.insertId;
  }


  public static async articleExists(url: string): Promise<boolean> {
    const [rows]: any = await db.query("SELECT 1 FROM ARTICLES WHERE url = ?", [url]);
    return rows.length > 0;
  }

 
  public static async searchByKeywords(keywords: string[], userId: number): Promise<any[]> {
    if (keywords.length === 0) return [];

    const keywordConditions = keywords.map(() => "(title LIKE ? OR content LIKE ?)").join(" OR ");
    const params = keywords.flatMap((kw) => [`%${kw}%`, `%${kw}%`]);

    const [rows]: any = await db.query(
      `SELECT a.* FROM ARTICLES a
       WHERE (${keywordConditions})
       AND NOT EXISTS (
         SELECT 1 FROM NOTIFICATIONS n
         WHERE n.article_id = a.article_id AND n.user_id = ?
       )`,
      [...params, userId]
    );
    return rows;
  }
}

export default ArticleRepo;
