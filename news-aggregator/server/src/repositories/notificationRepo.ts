import db from "../config/db";

export interface NotificationInput {
  user_id: number;
  article_id: number;
  is_read: boolean;
}

class NotificationRepo {
 
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
