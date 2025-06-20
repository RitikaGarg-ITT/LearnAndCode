import readlineSync from 'readline-sync';
import { signupFlow, loginFlow } from './controllers/authController';

async function mainMenu() {
  while (true) {
    console.log('\n--- News Aggregator ---');
    const choice = readlineSync.keyInSelect(['Signup', 'Login', 'Exit'], 'Choose an option:', { cancel: false });

    if (choice === 0) {
      await signupFlow();
    } else if (choice === 1) {
      const user = await loginFlow();
      if (user) {
        // Proceed to user/admin menu based on user.role
        console.log(`Welcome, ${user.firstname} (${user.role})!`);
        // Add further menu logic here
      }
    } else {
      console.log('Goodbye!');
      break;
    }
  }
}

mainMenu();
