import cron from "node-cron";
import notificationService from "../services/notificationService";

class NotificationScheduler {
  /**
   * Starts the notification scheduler to run every hour at minute 0.
   */
  public static start(): void {
    cron.schedule("0 * * * *", async () => {
      console.log("Starting notification scheduler...");
      try {
        const count = await notificationService.generateNotifications();
        console.log(`Generated ${count} notifications`);
      } catch (error: any) {
        console.error("Notification scheduler failed:", error.message);
      }
    });
  }
}

export default NotificationScheduler;
