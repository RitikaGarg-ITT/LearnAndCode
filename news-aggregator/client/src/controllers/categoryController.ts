import readlineSync from "readline-sync";
import { fetchCategories } from "../api/headlineApi";
import { showCategoryMenu } from "../views/categoryView";

// type for category
type Category = { name: string; is_hidden?: number | boolean };

export async function chooseCategoryMenu(): Promise<string | null> {
  let categories: Category[]; // Fetch categories (objects now)

  try {
    categories = await fetchCategories();
  } catch (err: any) {
    console.log("Could not fetch categories:", err.message);
    return null;
  }

  if (!categories || !Array.isArray(categories)) {
    console.log("No categories available.");
    return null;
  } // Add 'all' as a visible string category at the beginning

  const visibleCategories: (string | Category)[] = [
    "all",
    ...categories.filter((cat) => !cat.is_hidden || cat.is_hidden === 0 ),
  ];

  while (true) {
    showCategoryMenu(visibleCategories);
    const choice = readlineSync.questionInt("Enter your choice: ");
    if (choice === visibleCategories.length + 1) return null; // Back
    if (choice >= 1 && choice <= visibleCategories.length) {
      const selected = visibleCategories[choice - 1]; // Always return category name (string)
      return typeof selected === "string" ? selected : selected.name;
    }
    console.log("Invalid choice. Try again.");
  }
}
