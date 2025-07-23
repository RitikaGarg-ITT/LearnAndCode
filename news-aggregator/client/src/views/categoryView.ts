export function showCategoryMenu(categories: (string | { name: string })[]) {
  console.log("\nPlease choose a category:");
  categories.forEach((cat, idx) => {
    const name = typeof cat === "string" ? cat : cat.name;
    console.log(`${idx + 1}. ${capitalize(name)}`);
  });
  console.log(`${categories.length + 1}. Back`);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
