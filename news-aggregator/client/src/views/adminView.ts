export function showAdminMainMenu(userFirstname: string) {
  console.log(`\nWelcome to the News Aggregator Admin Panel, ${userFirstname}!`);
  console.log("1. View list of external servers and status");
  console.log("2. View the external server’s details");
  console.log("3. Update/Edit the external server’s details");
  console.log("4. Add new News Category");
  console.log("5. Toggle Article visibility");
  console.log("6. Toggle Category visibility");
  console.log("7. Manage Blocked Keywords");
  console.log("8. Logout");
}

export function showBlockedKeywordsMenu() {
  console.log("\n--- Manage Blocked Keywords ---");
  console.log("1. View blocked keywords");
  console.log("2. Add blocked keyword");
  console.log("3. Remove blocked keyword");
  console.log("4. Back");
}

export function showBlockedKeywordsList(keywords: string[]) {
  if (!keywords.length) {
    console.log("No blocked keywords found.");
  } else {
    console.log("\nBlocked Keywords:");
    keywords.forEach((kw, i) => console.log(`${i + 1}. ${kw}`));
  }
}

export function showInvalidChoice() {
  console.log("Invalid choice. Try again.");
}
