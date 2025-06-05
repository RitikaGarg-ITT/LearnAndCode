import { DivisorService } from "./services/DivisorService";
import { DivisorMatcher } from "./services/DivisorMatcher";
import * as readlineModule from "readline";

const inputReader = readlineModule.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const divisorServiceInstance = new DivisorService();
const divisorMatcherInstance = new DivisorMatcher(divisorServiceInstance);

inputReader.question("Enter a number: ", (userInput) => {
  const inputNumber = parseInt(userInput);

  if (isNaN(inputNumber) || inputNumber <= 0) {
    console.log("Please enter a valid positive integer.");
  } else {
    const matchingPairs = divisorMatcherInstance.findMatchingDivisorPairCount(inputNumber);
    console.log(`Count of matching divisor pairs for ${inputNumber}:`, matchingPairs);
  }

  inputReader.close();
});
