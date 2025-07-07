// views/savedArticleView.ts
export function showSavedArticlesList(articles: any[]) {
  if (!articles.length) {
    console.log("\nNo saved articles found.");
    return;
  }
  articles.forEach((article, idx) => {
    console.log(`\nArticle Id: ${article.article_id} ${article.title}`);
    console.log(`Source: ${article.source}`);
    console.log(`URL: ${article.url}`);
    console.log(`Category: ${article.category}`);
  });
}
