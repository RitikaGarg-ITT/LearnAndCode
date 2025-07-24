export function showHeadlinesMainMenu(user?: any) {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (user) {
    console.log(
      `\nWelcome to the News Application, ${user.firstname || user.username || ""}! Date: ${date} Time: ${time}`
    );
  }
  console.log("Please choose the options below for Headlines");
  console.log("1. Today");
  console.log("2. Date range");
  console.log("3. Back");
}

export function showHeadlinesList(headlines: any[]) {
  if (!headlines.length) {
    console.log("No headlines to display.");
    return;
  }

  const visibleHeadlines = headlines.filter((headline) => !headline.is_hidden || headline.is_hidden === 0);

  if (!visibleHeadlines.length) {
    console.log("No visible headlines to display.");
    return;
  }

  console.log("\nH E A D L I N E S\n");

  visibleHeadlines.forEach((headline, idx) => {
    const articleId = headline.article_id || headline.id || idx + 1;
    const title = headline.title || "No Title";
    const description = headline.description || "";
    const source = headline.source?.name || headline.source || "Unknown";
    const url = headline.url || "";
    const likes = headline.likes;
    const dislikes = headline.dislikes;

    console.log(`Article Id: ${articleId}`);
    console.log(`${title}`);
    if (description) console.log(`${description}`);
    console.log(`source: ${source}`);
    if (url) console.log(`URL: ${url}`);
    console.log(`Likes: ${likes}  Dislikes: ${dislikes}`);
    console.log("------------------------------------------------------------");
  });
}

export function showHeadlineDetails(headline: any) {
  if (headline.is_hidden === 1) {
    console.log("🚫 This article has been hidden and cannot be viewed.");
    return;
  }

  console.log(`\nTitle: ${headline.title}`);
  console.log(`Description: ${headline.description}`);
  console.log(`Published At: ${headline.published_at}`);
  console.log(`URL: ${headline.url}\n`);
}