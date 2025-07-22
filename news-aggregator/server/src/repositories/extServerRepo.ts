import db from "../config/db";

export interface Server {
  source_id: number;
  name: string;
  api_uri: string;
  api_key: string;
}

class ExtServerRepo {
 
  public static async getActiveServers(): Promise<Server[]> {
    const [rows] = await db.query("SELECT source_id, name, api_uri, api_key FROM EXT_SERVER WHERE is_active = TRUE");
    if (!Array.isArray(rows)) throw new Error("Query did not return rows");
    return rows as Server[];    
  }

 
  public static async updateLastFetched(sourceId: number): Promise<void> {
    await db.query(
      "UPDATE EXT_SERVER SET last_accessed_time = NOW() WHERE source_id = ?",
      [sourceId]
    );
  }
}

export default ExtServerRepo;
