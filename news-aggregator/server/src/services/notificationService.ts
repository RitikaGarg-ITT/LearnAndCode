import configureNotificationRepo from "../repositories/configureNotificationRepo";
import keywordRepo from "../repositories/keywordRepo";
import articleRepo from "../repositories/articleRepo";
import notificationRepo, { NotificationInput } from "../repositories/notificationRepo";

class NotificationService {
 
  public static async generateNotifications(): Promise<number> {
    const users: number[] = await configureNotificationRepo.getEnabledUsers();
    let notificationCount = 0;

    for (const userId of users) {
      try {
        const keywords: string[] = await keywordRepo.getByUser(userId);
        if (keywords.length === 0) continue;

        const articles: any[] = await articleRepo.searchByKeywords(keywords, userId);

        for (const article of articles) {
          const notification: NotificationInput = {
            user_id: userId,
            article_id: article.article_id,
            is_read: false,
          };
          await notificationRepo.create(notification);
          notificationCount++;
        }
      } catch (error: any) {
        console.error(`Error processing user ${userId}:`, error.message);
      }
    }

    return notificationCount;
  }
}

export default NotificationService;
