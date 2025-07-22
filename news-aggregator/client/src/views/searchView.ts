export class SearchView {
  static showArticles(articles: any[]) {
    if (!articles.length) {
      console.log("\nNo articles found for your search.\n");
      return;
    }
    console.log("\nS E A R C H\n");
    articles.forEach((article) => {
      const id = article.article_id || article.id;
      const title = article.title || "No Title";
      const description = article.description || "";
      const source = article.source?.name || article.source || "Unknown";
      const url = article.url || "";
      const category = article.category || "General";
      const likes = article.likes ?? 0;
      const dislikes = article.dislikes ?? 0;

      console.log(`Article Id: ${id} ${title}`);
      if (description) console.log(description);
      console.log(`source: ${source}`);
      if (url) console.log(`URL: ${url}`);
      console.log(`Business: ${category}`);
      console.log(`Likes: ${likes}  Dislikes: ${dislikes}`);
      console.log("------------------------------------------------------------");
    });
  }
}
