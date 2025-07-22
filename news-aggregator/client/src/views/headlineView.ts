// Show the main headlines menu (Today, Date range, Back)
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

// Show dynamic category menu
export function showCategoryMenu(categories: string[]) {
  console.log("\nPlease choose a category:");
  categories.forEach((cat, idx) => {
    console.log(`${idx + 1}. ${capitalize(cat)}`);
  });
  console.log(`${categories.length + 1}. Back`);
}

// Show a list of headlines
export function showHeadlinesList(headlines: any[]) {
  if (!headlines.length) {
    console.log("No headlines to display.");
    return;
  }
  console.log("\nH E A D L I N E S\n");
  // console.log({headlines});
  headlines.forEach((headline, idx) => {
    const articleId = headline.article_id || headline.id || idx + 1;
    const title = headline.title || "No Title";
    const description = headline.description || "";
    const source = headline.source?.name || headline.source || "Unknown";
    const url = headline.url || "";
    const category = headline.category || "General";
    const likes = headline.likes ;
    const dislikes = headline.dislikes ;

    console.log(`Article Id: ${articleId}`);
    console.log(`${title}`);
    if (description) console.log(`${description}`);
    console.log(`source: ${source}`);
    if (url) console.log(`URL: ${url}`);
    console.log(`Business: ${category}`);
    console.log(`Likes: ${likes}  Dislikes: ${dislikes}`);
    console.log("------------------------------------------------------------");
  });
}


export function showHeadlineDetails(headline: any) {
  console.log(`\nTitle: ${headline.title}`);
  console.log(`Description: ${headline.description}`);
  console.log(`Published At: ${headline.published_at}`);
  console.log(`URL: ${headline.url}\n`);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
