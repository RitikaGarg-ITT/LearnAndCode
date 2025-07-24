import db from "../config/db";

class KeywordRepo {
 
  public static async getByUser(userId: number): Promise<string[]> {
    const [rows] = await db.query("SELECT keyword_name FROM KEYWORD WHERE user_id = ?", [userId]);
    if (!Array.isArray(rows)) throw new Error("Query did not return rows");
    return (rows as Array<{ keyword_name: string }>).map((row) => row.keyword_name);
  }
}

export default KeywordRepo;
