export function showHeadlinesList(headlines: any[]) {
  console.log("\nToday's Headlines:");
  headlines.forEach((headline, idx) => {
    console.log(`${idx + 1}. ${headline.title} [${headline.category}]`);
  });
  console.log(`${headlines.length + 1}. Back`);
}

export function showHeadlineDetails(headline: any) {
  console.log(`\nTitle: ${headline.title}`);
  console.log(`Description: ${headline.description}`);
  console.log(`Source: ${headline.source}`);
  console.log(`Published At: ${headline.published_at}`);
  console.log(`Category: ${headline.category}`);
  console.log(`URL: ${headline.url}\n`);
}
