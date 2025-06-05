import { INumberService } from "../interfaces/iNumberService";

export class DivisorService implements INumberService {
  countDivisors(targetNumber: number): number {
    let divisorCount = 0;

    for (let divisor = 1; divisor * divisor <= targetNumber; divisor++) {
      if (targetNumber % divisor === 0) {

        divisorCount += divisor * divisor === targetNumber ? 1 : 2;
      }
    }

    return divisorCount;
  }
}
