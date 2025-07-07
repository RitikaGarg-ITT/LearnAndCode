import db from "../config/db";
import { UserKeyword } from "../models/userKeyword";

class UserKeywordRepo {
  async getKeywordsByUser(userId: number): Promise<UserKeyword[]> {
    const [rows] = await db.query("SELECT * FROM user_keywords WHERE user_id = ?", [userId]);
    return rows as UserKeyword[];
  }

  async addKeyword(userId: number, keyword: string): Promise<void> {
    await db.query("INSERT INTO user_keywords (user_id, keyword) VALUES (?, ?)", [userId, keyword]);
  }

  async deleteKeyword(userId: number, keyword: string): Promise<void> {
    await db.query("DELETE FROM user_keywords WHERE user_id = ? AND keyword = ?", [userId, keyword]);
  }
}

export default new UserKeywordRepo();
