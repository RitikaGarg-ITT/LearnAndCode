import { DivisorService } from "./services/DivisorService";
import { DivisorMatcher } from "./services/DivisorMatcher";

const divisorService = new DivisorService();
const matcher = new DivisorMatcher(divisorService);

const input = 10;
console.log(`Count of matching divisor pairs for ${input}:`, matcher.findMatchingCount(input));
