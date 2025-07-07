import readlineSync from "readline-sync";
import { fetchSavedArticles, deleteSavedArticle } from "../api/savedArticleApi";
import { showSavedArticlesList } from "../views/savedArticleView";

export async function savedArticlesMenuFlow(user: any) {
  while (true) {
    const res = await fetchSavedArticles(user.user_id);
    const articles = res.data.articles || [];
    showSavedArticlesList(articles);

    console.log("1. Back");
    console.log("2. Logout");
    console.log("3. Delete Article");
    const choice = readlineSync.questionInt("Enter your choice: ");

    if (choice === 1) break;
    if (choice === 2) {
      // handle logout
      process.exit(0);
    }
    if (choice === 3) {
      const articleId = readlineSync.questionInt("Enter Article ID to delete: ");
      await deleteSavedArticle(articleId);
      console.log("Article deleted.");
    }
  }
}
