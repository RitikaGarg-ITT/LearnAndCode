import db from "../config/db";

export interface Category {
  category_id: number;
  name: string;
}

class CategoryRepo {
 
  public static async getCategories(): Promise<Category[]> {
    const [rows] = await db.query("SELECT * FROM CATEGORIES");
    if (!Array.isArray(rows)) throw new Error("Query did not return rows");
    return rows as Category[];
  }
}

export default CategoryRepo;
