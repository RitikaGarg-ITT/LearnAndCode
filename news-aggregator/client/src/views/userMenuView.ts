import { format } from "../utils/format";

export function showUserMenu(user: any) {
  console.log(`\nWelcome to the News Application, ${user.firstname}! Date: ${format.date()} Time: ${format.time()}`);
  console.log("Please choose the options below");
  console.log("1. Headlines");
  console.log("2. Saved Articles");
  console.log("3. Search");
  console.log("4. Notifications");
  console.log("5. Logout");
}
