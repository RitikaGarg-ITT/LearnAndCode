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
  // console.log("Sample headline object:", headlines[0]);
  headlines.forEach((headline, idx) => {
    console.log(`${idx + 1}. ${headline.title} `);
  });
  console.log(`${headlines.length + 1}. Back`);
}

// Show details for a single headline
export function showHeadlineDetails(headline: any) {
  console.log(`\nTitle: ${headline.title}`);
  console.log(`Description: ${headline.description}`);
  // console.log(`Source: ${headline.source}`);
  console.log(`Published At: ${headline.published_at}`);
  // console.log(`Category: ${capitalize(headline.category)}`);
  console.log(`URL: ${headline.url}\n`);
}

// Helper to capitalize category names
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
