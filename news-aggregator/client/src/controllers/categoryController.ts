import readlineSync from "readline-sync";
import { fetchCategories } from "../api/headlineApi";
import { showCategoryMenu } from "../views/categoryView";

// Returns the selected category string, or null if user selects "Back"
export async function chooseCategoryMenu(): Promise<string | null> {
  let categories: string[];
  try {
    categories = await fetchCategories();
  } catch (err: any) {
    console.log("Could not fetch categories:", err.message);
    return null; // or handle as needed
  }
  if (!categories || !Array.isArray(categories)) {
    console.log("No categories available.");
    return null;
  }
  categories = ["all", ...categories];
  while (true) {
    showCategoryMenu(categories);
    const choice = readlineSync.questionInt("Enter your choice: ");
    if (choice === categories.length + 1) return null; // Back
    if (choice >= 1 && choice <= categories.length) {
      return categories[choice - 1];
    }
    console.log("Invalid choice. Try again.");
  }
}
  
