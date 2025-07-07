import db from "../config/db";
import { Article } from "../models/articles";
import { Headline } from "../models/headline";

class HeadlineRepository {
  public async getHeadlinesByDate(date: string): Promise<Headline[]> {
    const [rows] = await db.query("SELECT * FROM ARTICLES WHERE DATE(published_at) = ? ORDER BY published_at DESC", [
      date,
    ]);
    return rows as Headline[];
  }

  public async getHeadlineById(news_id: number): Promise<Headline | undefined> {
    const [rows] = await db.query("SELECT * FROM ARTICLES WHERE article_id = ?", [news_id]);
    return (rows as Headline[])[0];
  }

  public async getHeadlinesByFilter(startDate: string, endDate: string, category?: string): Promise<Headline[]> {
    let query = `
      SELECT a.*
      FROM ARTICLES a
      JOIN categories c ON a.category_id = c.category_id
      WHERE DATE(a.published_at) BETWEEN ? AND ?
    `;
    const params: any[] = [startDate, endDate];

    if (category && category.toLowerCase() !== "all") {
      query += " AND c.name = ?";
      params.push(category);
    }
    query += " ORDER BY a.published_at DESC";

    const [rows] = await db.query(query, params);
    return rows as Headline[];
  }
  async searchHeadlines(query: string, startDate?: string, endDate?: string): Promise<Article[]> {
    let sql = `
      SELECT * FROM articles
      WHERE (title LIKE ? OR description LIKE ?)
    `;
    const params: any[] = [`%${query}%`, `%${query}%`];
    if (startDate && endDate) {
      sql += " AND DATE(published_at) BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }
    sql += " ORDER BY likes DESC, dislikes ASC, published_at DESC";
    const [rows] = await db.query(sql, params);
    return rows as Article[];
  }
}

export default new HeadlineRepository();
