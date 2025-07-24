export function showSavedArticlesList(articles: any[]) {
  console.log("\n saved articles .");
  if (!articles.length) {
    console.log("\nNo saved articles found.");
    return;
  }
  articles.forEach((article, idx) => {
    console.log(`\nSaved Article Id: ${article.saved_id}`);
    console.log(`Article Id: ${article.article_id} ${article.title}`);
    console.log(`Source: ${article.source}`);
    console.log(`URL: ${article.url}`);
  });
}
