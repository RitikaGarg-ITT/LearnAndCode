import readlineSync from "readline-sync";
import { searchHeadlines } from "../api/headlineApi";
import { showHeadlinesList } from "../views/headlineView";

export async function searchMenuFlow(user: any) {
  while (true) {
    const query = readlineSync.question("Enter search query (or 'back' to return): ");
    if (query.toLowerCase() === "back") break;

    const filterByDate = readlineSync.keyInYNStrict("Filter by date range?");
    let startDate: string | undefined, endDate: string | undefined;
    if (filterByDate) {
      startDate = readlineSync.question("Enter start date (YYYY-MM-DD): ");
      endDate = readlineSync.question("Enter end date (YYYY-MM-DD): ");
    }

    try {
      const res = await searchHeadlines(query, startDate, endDate);
      const headlines = res.data.headlines || [];
      if (!headlines.length) {
        console.log("No search results found.");
        continue;
      }
      while (true) {
        showHeadlinesList(headlines);
        const articleChoice = readlineSync.questionInt("Select a headline to view details or Back: ");
        if (articleChoice === headlines.length + 1) break;
        if (articleChoice > 0 && articleChoice <= headlines.length) {
          const headline = headlines[articleChoice - 1];
          // You can add Save Article logic here as well
          // Or show details
        } else {
          console.log("Invalid choice. Try again.");
        }
      }
    } catch (err: any) {
      console.log("Error searching headlines:", err.message);
    }
  }
}
