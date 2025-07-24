import db from "../config/db";

class BlockedKeywordService {
  async isKeywordBlocked(keyword: string): Promise<boolean> {
    const [rows]: any = await db.query("SELECT keyword FROM blocked_keywords WHERE LOWER(keyword) = LOWER(?)", [
      keyword,
    ]);
    return rows.length > 0;
  }

  async getBlockedKeywords(): Promise<string[]> {
    const [rows]: any = await db.query("SELECT keyword FROM blocked_keywords");
    return rows.map((r: any) => r.keyword.toLowerCase());
  }
}

export default new BlockedKeywordService();
