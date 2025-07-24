import readlineSync from "readline-sync";
import { fetchHeadlines } from "../api/headlineApi";
import { showHeadlinesMainMenu, showHeadlinesList } from "../views/headlineView";
import { chooseCategoryMenu } from "./categoryController";
import { likeArticle, dislikeArticle } from "../api/articleReactionApi";
import { saveArticle } from "../api/savedArticleApi";
import { reportArticle } from "../api/articleReportApi";

export async function headlinesMenuFlow(user: any) {
  while (true) {
    showHeadlinesMainMenu(user);
    const mainChoiceNum = readlineSync.questionInt("Enter your choice: ");
    if (mainChoiceNum === 3) break;

    let startDate, endDate;
    if (mainChoiceNum === 1) {
      const today = new Date().toISOString().slice(0, 10);
      startDate = endDate = today;
    } else if (mainChoiceNum === 2) {
      startDate = readlineSync.question("Enter start date (YYYY-MM-DD): ");
      endDate = readlineSync.question("Enter end date (YYYY-MM-DD): ");
    } else {
      console.log("Invalid choice. Try again.");
      continue;
    }

    const category = await chooseCategoryMenu();
    if (!category) continue;

    try {
      let headlinesRes = await fetchHeadlines({ startDate, endDate, category });
      let headlines = headlinesRes.data.headlines || [];
      if (!headlines.length) {
        console.log("\nNo headlines found for the selected filter.");
        continue;
      }

      while (true) {
        showHeadlinesList(headlines);
        console.log("1. Back");
        console.log("2. Logout");
        console.log("3. Save Article");
        console.log("4. Like Article");
        console.log("5. Dislike Article");
        console.log("6. Report Article");
        const menuChoice = readlineSync.questionInt("Enter your choice: ");

        if (menuChoice === 1) break;
        if (menuChoice === 2) process.exit(0);

        if (menuChoice === 3) {
          const articleId = readlineSync.questionInt("Enter Article ID to save: ");
          const articleToSave = headlines.find((a: { article_id: number }) => a.article_id === articleId);
          if (!articleToSave) {
            console.log("Invalid Article ID. Please try again.");
            continue;
          }

          try {
            await saveArticle(user.user_id, articleId);
            console.log("✅ Article saved successfully!");
          } catch (err: any) {
            if (err.response?.status === 409) {
              console.log("⚠️  Article already saved.");
            } else if (err.response?.status === 400) {
              console.log("❌ Invalid request. Please check inputs.");
            } else {
              console.log("❌ Failed to save article:", err.message);
            }
          }
        } else if (menuChoice === 4) {
          const articleId = readlineSync.questionInt("Enter Article ID to like: ");
          await likeArticle(user.user_id, articleId);
          console.log("Article liked.");
          let refreshedRes = await fetchHeadlines({ startDate, endDate, category });
          headlines = refreshedRes.data.headlines || [];
        } else if (menuChoice === 5) {
          const articleId = readlineSync.questionInt("Enter Article ID to dislike: ");
          await dislikeArticle(user.user_id, articleId);
          console.log("Article disliked.");
          let refreshedRes = await fetchHeadlines({ startDate, endDate, category });
          headlines = refreshedRes.data.headlines || [];
        } else if (menuChoice === 6) {
          const articleId = readlineSync.questionInt("Enter Article ID to report: ");
          const articleToReport = headlines.find((a: { article_id: number }) => a.article_id === articleId);
          if (!articleToReport) {
            console.log("Invalid Article ID. Please try again.");
            continue;
          }
          const reason = readlineSync.question("Enter reason for reporting: ");
          try {
            await reportArticle(user.user_id, articleId, reason);
            console.log("Article reported successfully!");
            let refreshedRes = await fetchHeadlines({ startDate, endDate, category });
            headlines = refreshedRes.data.headlines || [];
          } catch (err: any) {
            if (err?.response?.data?.error) {
              console.log("Failed to report article:", err.response.data.error);
            } else {
              console.log("Failed to report article:", err.message);
            }
          }
        } else {
          console.log("Invalid choice. Try again.");
        }
      }
    } catch (err: any) {
      console.log("Error fetching headlines:", err.message);
    }
  }
}
