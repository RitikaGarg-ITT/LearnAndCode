import { INumberService } from "../interfaces/iNumberService";

export class DivisorMatcher {
  private numberService: INumberService;

  constructor(numberService: INumberService) {
    this.numberService = numberService;
  }

  findMatchingCount(n: number): number {
    let count = 0;
    for (let x = 1; x < n; x++) {
      const y = n - x;
      if (this.numberService.countDivisors(x) === this.numberService.countDivisors(y)) {
        count++;
      }
    }
    return count;
  }
}
