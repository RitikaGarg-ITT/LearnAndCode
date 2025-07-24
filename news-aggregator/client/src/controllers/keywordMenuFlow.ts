import readlineSync from "readline-sync";
import { getUserKeywords, addUserKeyword, deleteUserKeyword } from "../api/userKeywordApi";

export async function keywordMenuFlow(user: any) {
  while (true) {
    console.log("\nKEYWORD CONFIGURATION");
    console.log("1. View Keywords");
    console.log("2. Add Keyword");
    console.log("3. Delete Keyword");
    console.log("4. Back");
    const choice = readlineSync.questionInt("Enter your choice: ");
    if (choice === 1) {
      const res = await getUserKeywords(user.token);
      console.table(res.data.keywords.map((k: any) => k.keyword));
    } else if (choice === 2) {
      const keyword = readlineSync.question("Enter keyword to add: ");
      await addUserKeyword(user.token, keyword);
      console.log("Keyword added.");
    } else if (choice === 3) {
      const keyword = readlineSync.question("Enter keyword to delete: ");
      await deleteUserKeyword(user.token, keyword);
      console.log("Keyword deleted.");
    } else if (choice === 4) break;
    else console.log("Invalid choice.");
  }
}
