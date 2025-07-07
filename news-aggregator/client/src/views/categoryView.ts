export function showCategoryMenu(categories: string[]) {
  console.log("\nPlease choose a category:");
  categories.forEach((cat, idx) => {
    console.log(`${idx + 1}. ${capitalize(cat)}`);
  });
  console.log(`${categories.length + 1}. Back`);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
