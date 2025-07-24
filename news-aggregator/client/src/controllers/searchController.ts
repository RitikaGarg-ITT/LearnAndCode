import readlineSync from "readline-sync";
import { ArticleSearchApi } from "../api/articleSearchApi";
import { likeArticle, dislikeArticle } from "../api/articleReactionApi";
import { SearchView } from "../views/searchView";
import { saveArticle } from "../api/savedArticleApi";
import { reportArticle } from "../api/articleReportApi";

export class SearchController {
  constructor(private user: any) {}

  async searchMenuFlow() {
    while (true) {
      try {
        const keyword = readlineSync.question("Enter search keyword: ");
        const res = await ArticleSearchApi.searchArticles(keyword);
        let articles = res.data.articles || [];
        const shouldContinue = await this.handleSearchResultsMenu(articles, keyword);
        if (!shouldContinue) break;
      } catch (err: any) {
        console.log("An error occurred during search:", err?.response?.data?.error || err.message);
      }
    }
  }

  private async handleSearchResultsMenu(articles: any[], keyword: string): Promise<boolean> {
    let currentArticles = articles; 
    let filterStart = "";
    let filterEnd = "";
    let sortField = "";

    while (true) {
      try {
        SearchView.showArticles(currentArticles);

        console.log("1. Filter by Date Range");
        console.log("2. Sort (likes/dislikes)");
        console.log("3. Save Article");
        console.log("4. Like Article");
        console.log("5. Dislike Article");
        console.log("6. Report Article");
        console.log("7. Back");
        console.log("8. Logout");

        const choice = readlineSync.questionInt("Enter your choice: ");

        if (choice === 1) {
          filterStart = readlineSync.question("Start date (YYYY-MM-DD): ");
          filterEnd = readlineSync.question("End date (YYYY-MM-DD): ");
          currentArticles = articles.filter(
            (a: { published_at: string }) => a.published_at >= filterStart && a.published_at <= filterEnd
          );
        } else if (choice === 2) {
          sortField = readlineSync.question("Sort by (likes/dislikes): ");
          if (sortField !== "likes" && sortField !== "dislikes") {
            console.log("Invalid sort field. Sorting skipped.");
          } else {
            currentArticles = [...currentArticles].sort((a, b) => (b[sortField] || 0) - (a[sortField] || 0));
          }
        } else if (choice === 3) {
          const articleId = readlineSync.questionInt("Enter Article ID to save: ");
          try {
            await saveArticle(this.user.user_id, articleId);
            console.log("Article saved successfully!");
          } catch (err: any) {
            if (err?.response?.status === 409) {
              console.log("Article already saved.");
            } else if (err?.response?.status === 400) {
              console.log("Invalid request. Please check inputs.");
            } else {
              console.log("Failed to save article:", err?.response?.data?.error || err.message);
            }
          }
        } else if (choice === 4) {
          const articleId = readlineSync.questionInt("Enter Article ID to like: ");
          try {
            await likeArticle(this.user.user_id, articleId);
            console.log("Article liked successfully!");
            const res = await ArticleSearchApi.searchArticles(keyword);
            articles = res.data.articles || [];
            currentArticles = applyFiltersAndSorting(articles, filterStart, filterEnd, sortField);
          } catch (err: any) {
            console.log("Failed to like article:", err?.response?.data?.error || err.message);
          }
        } 
        else if (choice === 5) {
          const articleId = readlineSync.questionInt("Enter Article ID to dislike: ");
          try {
            await dislikeArticle(this.user.user_id, articleId);
            console.log("Article disliked successfully!");
            const res = await ArticleSearchApi.searchArticles(keyword);
            articles = res.data.articles || [];
            currentArticles = applyFiltersAndSorting(articles, filterStart, filterEnd, sortField);
          } catch (err: any) {
            console.log("Failed to dislike article:", err?.response?.data?.error || err.message);
          }
        }
      
        else if (choice === 6) {
          const articleId = readlineSync.questionInt("Enter Article ID to report: ");
          const reason = readlineSync.question("Enter reason for reporting: ");
          try {
            await reportArticle(this.user.user_id, articleId, reason);
            console.log("Article reported successfully!");
          } catch (err: any) {
            const message = err?.response?.data?.error || err?.message || "";
            if (message.includes("Duplicate entry") && message.includes("unique_user_article")) {
              console.log("You have already reported this article.");
            } else {
              console.log("Failed to report article:", message);
            }
          }
        } else if (choice === 7) {
          return false;
        } else if (choice === 8) {
          process.exit(0);
        } else {
          console.log("Invalid choice. Try again.");
        }
      } catch (err: any) {
        console.log("An error occurred in the search results menu:", err?.response?.data?.error || err.message);
      }
    }
  }
}


function applyFiltersAndSorting(articles: any[], filterStart: string, filterEnd: string, sortField: string): any[] {
  let result = articles;
  if (filterStart && filterEnd) {
    result = result.filter(
      (a: { published_at: string }) => a.published_at >= filterStart && a.published_at <= filterEnd
    );
  }
  if (sortField === "likes" || sortField === "dislikes") {
    result = [...result].sort((a, b) => (b[sortField] || 0) - (a[sortField] || 0));
  }
  return result;
}


