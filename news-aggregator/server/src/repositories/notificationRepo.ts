import db from "../config/db";

// Define a Notification interface for strong typing
export interface NotificationInput {
  user_id: number;
  article_id: number;
  is_read: boolean;
}

class NotificationRepo {
  /**
   * Creates a new notification in the database.
   * @param notification - Notification input object
   */
  public static async create(notification: NotificationInput): Promise<void> {
    await db.query(
      `INSERT INTO NOTIFICATIONS 
      (user_id, article_id, is_read) 
      VALUES (?, ?, ?)`,
      [notification.user_id, notification.article_id, notification.is_read]
    );
  }
}

export default NotificationRepo;
