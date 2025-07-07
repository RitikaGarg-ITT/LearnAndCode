import readlineSync from "readline-sync";
import { fetchCategories, fetchHeadlines, fetchHeadlineById } from "../api/headlineApi";
import { showHeadlinesMainMenu, showCategoryMenu, showHeadlinesList, showHeadlineDetails } from "../views/headlineView";
import { chooseCategoryMenu } from "./categoryController";

// Helper: prompt for category and return the selected category or null (for Back)

export async function headlinesMenuFlow(user?: any) {
  while (true) {
    showHeadlinesMainMenu(user);
    const mainChoiceNum = readlineSync.questionInt("Enter your choice: ");
    if (mainChoiceNum === 3) break; // Back
    let startDate: string, endDate: string;
    if (mainChoiceNum === 1) {
      // Today
      const today = new Date().toISOString().slice(0, 10);
      startDate = endDate = today;
    } else if (mainChoiceNum === 2) {
      // Date range
      startDate = readlineSync.question("Enter start date (YYYY-MM-DD): ");
      endDate = readlineSync.question("Enter end date (YYYY-MM-DD): ");
    } else {
      console.log("Invalid choice. Try again.");
      continue;
    }
   
    // Category selection (dynamic)
    const category = await chooseCategoryMenu();
    console.log(" category from menu", category);
    if (!category) continue; // User chose Back

    try {
      const res = await fetchHeadlines({ startDate, endDate, category });
     
      const headlines = res.data.headlines|| [];
      console.log("headlines", headlines.length);
      if (!headlines.length) {
        console.log("\n No headlines found for the selected filter.");
        continue;
      }
      while (true) {
        showHeadlinesList(headlines);
        console.log("testing");
        const articleChoice = readlineSync.questionInt("Select a headline to view details or Back: ");
        if (articleChoice === headlines.length + 1) break;
        if (articleChoice > 0 && articleChoice <= headlines.length) {
          const headline = headlines[articleChoice - 1];
          const detailRes = await fetchHeadlineById(headline.article_id);
          showHeadlineDetails(detailRes.data.headline);
          readlineSync.question("Press Enter to go back to headlines list...");
        } else {
          console.log("Invalid choice. Try again.");
        }
      }
    } catch (err: any) {
      console.log("Error fetching headlines:", err.message);
    }
  }
}
