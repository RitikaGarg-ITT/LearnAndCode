import { INumberService } from "../interfaces/iNumberService";

export class DivisorMatcher {
  private numberService: INumberService;

  constructor(numberService: INumberService) {
    this.numberService = numberService;
  }

  findMatchingDivisorPairCount(totalSum: number): number {
    let matchingPairCount = 0;

    for (let firstNumber = 1; firstNumber < totalSum; firstNumber++) {
      const secondNumber = totalSum - firstNumber;

      const firstDivisorCount = this.numberService.countDivisors(firstNumber);
      const secondDivisorCount = this.numberService.countDivisors(secondNumber);

      if (firstDivisorCount === secondDivisorCount) {
        matchingPairCount++;
      }
    }

    return matchingPairCount;
  }
}
