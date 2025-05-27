import { INumberService } from "../interfaces/iNumberService"
export class DivisorService implements INumberService {
  countDivisors(num: number): number {
    let count = 0;
    for (let i = 1; i * i <= num; i++) {
      if (num % i === 0) {
        count += i * i === num ? 1 : 2;
      }
    }
    return count;
  }
}
