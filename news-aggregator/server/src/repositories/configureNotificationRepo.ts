import db from "../config/db";

class ConfigureNotificationRepo {
  /**
   * Retrieves all user IDs with enabled notifications.
   * @returns Array of user IDs (number[])
   */
  public static async getEnabledUsers(): Promise<number[]> {
    const [rows] = await db.query(`SELECT DISTINCT user_id FROM CONFIGURE_NOTIFICATION WHERE is_enabled = TRUE`);
    if (!Array.isArray(rows)) throw new Error("Query did not return rows");
    return (rows as Array<{ user_id: number }>).map((row) => row.user_id);    
  }
}

export default ConfigureNotificationRepo;
