import readlineSync from "readline-sync";
import { fetchTodayHeadlines, fetchHeadlineById } from "../api/headlineApi";
import { showHeadlinesList, showHeadlineDetails } from "../views/headlineView";

export async function headlinesMenuFlow() {
  try {
    const res = await fetchTodayHeadlines();
    const headlines = res.data.headlines;
    if (!headlines || headlines.length === 0) {
      console.log("No headlines found for today.");
      readlineSync.question("Press Enter to go back...");
      return;
    }
   
    while (true) {
      showHeadlinesList(headlines);
      const choice = readlineSync.questionInt("Select a headline to view details or Back: ");
      if (choice === headlines.length + 1) {
        break; // Back
      }
      if (choice > 0 && choice <= headlines.length) {
        const headline = headlines[choice - 1];
        const detailRes = await fetchHeadlineById(headline.news_id);
        showHeadlineDetails(detailRes.data.headline);
        readlineSync.question("Press Enter to go back to headlines list...");
      } else {
        console.log("Invalid choice. Try again.");
      }
    }
  } catch (err: any) {
    console.log("Error object:", err);
    console.log("Error fetching headlines:", err.message);
  }
}
