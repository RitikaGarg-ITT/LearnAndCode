import readlineSync from "readline-sync";
import { signupFlow, loginFlow } from "./controllers/authController";
import { userMenuFlow } from "./controllers/userMenuController";
import { AdminMenuController } from "./controllers/adminController";

async function mainMenu() {
  while (true) {
    console.log("\n--- News Aggregator ---");
    const choice = readlineSync.keyInSelect(["Signup", "Login", "Exit"], "Choose an option:", { cancel: false });

    if (choice === 0) {
      await signupFlow();
    } else if (choice === 1) {
      const user = await loginFlow();
      if (user) {
        if (user.role === "user") {
          await userMenuFlow(user);
        } else if (user.role === "admin") {
          const adminMenu = new AdminMenuController(user);
          await adminMenu.adminMenuFlow();
        }
      }
    } else {
      console.log("Goodbye!");
      break;
    }
  }
}

mainMenu();
