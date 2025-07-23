import readlineSync from "readline-sync";
import {
  fetchExternalServers,
  fetchExternalServerDetails,
  updateExternalServer,
  addCategory,
  toggleArticleVisibility,
  toggleCategoryVisibility,
} from "../api/adminApi";

export class AdminMenuController {
  constructor(private user: any) {}

  async adminMenuFlow() {
    while (true) {
      console.log(`\nWelcome to the News Aggregator Admin Panel, ${this?.user?.firstname}!`);
      console.log("1. View list of external servers and status");
      console.log("2. View the external server’s details");
      console.log("3. Update/Edit the external server’s details");
      console.log("4. Add new News Category");
      console.log("5. Toggle Article visibility");
      console.log("6. Toggle Category visibility");
      console.log("7. Logout");

      const choice = readlineSync.questionInt("Enter your choice: ");

      if (choice === 1) {
        try {
          const res = await fetchExternalServers();
          console.log("\nList of external servers:");
          res.data.servers.forEach((s: any, i: number) =>
            console.log(
              `${i + 1}. ${s.name} - ${s.is_active ? "Active" : "Not Active"} - last accessed: ${
                s.last_accessed_time || "Never"
              }`
            )
          );
        } catch (err: any) {
          console.log("Failed to fetch servers:", err?.response?.data?.error || err.message);
        }
      } else if (choice === 2) {
        // 2. View external server details
        const id = readlineSync.questionInt("Enter external server ID: ");
        try {
          const res = await fetchExternalServerDetails(id);
          const s = res.data.server;
          console.log(
            `\nName: ${s.name}\nAPI Key: ${s.api_key}\nStatus: ${
              s.is_active ? "Active" : "Not Active"
            }\nLast Accessed: ${s.last_accessed_time || "Never"}`
          );
        } catch (err: any) {
          console.log("Failed to fetch server details:", err?.response?.data?.error || err.message);
        }
      } else if (choice === 3) {
        // 3. Update/Edit external server details
        const id = readlineSync.questionInt("Enter external server ID: ");
        const apiKey = readlineSync.question("Enter updated API key: ");
        try {
          await updateExternalServer(id, apiKey);
          console.log("API key updated successfully.");
        } catch (err: any) {
          console.log("Failed to update API key:", err?.response?.data?.error || err.message);
        }
      } else if (choice === 4) {
        // 4. Add new News Category
        const name = readlineSync.question("Enter new category name: ");
        try {
          await addCategory(name);
          console.log("Category added successfully.");
        } catch (err: any) {
          console.log("Failed to add category:", err?.response?.data?.error || err.message);
        }
      } else if (choice === 5) {
        const articleId = readlineSync.questionInt("Enter Article ID to modify: ");
        const shouldHide = readlineSync.keyInYNStrict("Do you want to hide this article?");
        try {
          await toggleArticleVisibility(articleId, shouldHide);
          console.log(`✅ Article ${shouldHide ? "hidden" : "unhidden"} successfully.`);
        } catch (err: any) {
          console.error("❌ Failed:", err?.response?.data?.error || err.message);
        }
      } else if (choice === 6) {
        const categoryId = readlineSync.questionInt("Enter Category ID to modify: ");
        const shouldHide = readlineSync.keyInYNStrict("Do you want to hide this category?");

        try {
          await toggleCategoryVisibility(categoryId, shouldHide);
          console.log(`✅ Category ${shouldHide ? "hidden" : "unhidden"} successfully.`);
        } catch (err: any) {
          console.error("❌ Failed:", err?.response?.data?.error || err.message);
        }
      } else if (choice === 7) {
        console.log("Logging out...");
        break;
      } else {
        console.log("Invalid choice. Please try again.");
      }
    }
  }
}
