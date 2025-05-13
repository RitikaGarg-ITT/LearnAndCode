import * as readline from "readline";

export function getUserInput(prompt: string): Promise<string> {
  const userInputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    userInputInterface.question(prompt, (input) => {
      userInputInterface.close();
      resolve(input);
    });
  });
}
