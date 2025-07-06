import db from "../config/db";

// Define a Server interface for strong typing
export interface Server {
  source_id: number;
  name: string;
  api_uri: string;
  api_key: string;
}

class ExtServerRepo {
  /**
   * Retrieves all active external servers.
   * @returns Array of Server objects
   */
  public static async getActiveServers(): Promise<Server[]> {
    const [rows] = await db.query("SELECT source_id, name, api_uri, api_key FROM EXT_SERVER WHERE is_active = TRUE");
    if (!Array.isArray(rows)) throw new Error("Query did not return rows");
    return rows as Server[];    
  }

  /**
   * Updates the last accessed time for a given server.
   * @param sourceId The ID of the server to update
   */
  public static async updateLastFetched(sourceId: number): Promise<void> {
    await db.query(
      "UPDATE EXT_SERVER SET last_accessed_time = NOW() WHERE source_id = ?",
      [sourceId]
    );
  }
}

export default ExtServerRepo;
