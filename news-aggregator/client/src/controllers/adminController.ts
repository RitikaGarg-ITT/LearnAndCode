import readlineSync from "readline-sync";
import {
  fetchExternalServers,
  fetchExternalServerDetails,
  updateExternalServer,
  addCategory,
  toggleArticleVisibility,
  toggleCategoryVisibility,
  fetchBlockedKeywords,
  blockKeyword,
  unblockKeyword,
} from "../api/adminApi";

import {
  showAdminMainMenu,
  showBlockedKeywordsMenu,
  showBlockedKeywordsList,
  showInvalidChoice,
} from "../views/adminView";

export class AdminMenuController {
  constructor(private user: any) {}

  async adminMenuFlow() {
    while (true) {
      showAdminMainMenu(this.user.firstname);

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
        const id = readlineSync.questionInt("Enter external server ID: ");
        const apiKey = readlineSync.question("Enter updated API key: ");
        try {
          await updateExternalServer(id, apiKey);
          console.log("API key updated successfully.");
        } catch (err: any) {
          console.log("Failed to update API key:", err?.response?.data?.error || err.message);
        }
      } else if (choice === 4) {
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
        await this.blockedKeywordsSubMenu();
      } else if (choice === 8) {
        console.log("Logging out...");
        break;
      } else {
        showInvalidChoice();
      }
    }
  }

  private async blockedKeywordsSubMenu() {
    while (true) {
      showBlockedKeywordsMenu();

      const keywordChoice = readlineSync.questionInt("Choose an option: ");

      if (keywordChoice === 1) {
        try {
          const res = await fetchBlockedKeywords();
          const keywords = res.data.keywords;
          showBlockedKeywordsList(keywords);
        } catch (err: any) {
          console.log("Failed to fetch blocked keywords:", err?.response?.data?.message || err.message);
        }
      } else if (keywordChoice === 2) {
        const keyword = readlineSync.question("Enter keyword to block: ");
        try {
          const res = await blockKeyword(keyword);
          console.log(res.data.message);
        } catch (err: any) {
          console.log("❌ Failed to block keyword:", err?.response?.data?.message || err.message);
        }
      } else if (keywordChoice === 3) {
        const keyword = readlineSync.question("Enter keyword to unblock: ");
        try {
          const res = await unblockKeyword(keyword);
          console.log(res.data.message);
        } catch (err: any) {
          console.log("❌ Failed to unblock keyword:", err?.response?.data?.message || err.message);
        }
      } else if (keywordChoice === 4) {
        break;
      } else {
        showInvalidChoice();
      }
    }
  }
}
