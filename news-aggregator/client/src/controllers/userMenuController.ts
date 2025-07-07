import readlineSync from "readline-sync";
import { showUserMenu } from "../views/userMenuView";
import { headlinesMenuFlow } from "./headlineController";
import { savedArticlesMenuFlow } from "./savedArticleController";

export async function userMenuFlow(user: any) {
  while (true) {
    showUserMenu(user);
    const choice = readlineSync.question("Enter your choice: ");
    switch (choice) {
      case "1":
        await headlinesMenuFlow();
        break;
      case "2":
        // savedArticlesMenuFlow(user);
        break;
      case "3":
        // Implement showSearchMenu(user);
        break;
      case "4":
        // Implement showNotificationsMenu(user);
        break;
      case "5":
        return; // Logout
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}
