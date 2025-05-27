import { DivisorService } from "../src/services/DivisorService";
import { DivisorMatcher } from "../src/services/DivisorMatcher";

describe("DivisorMatcher Tests", () => {
  const service = new DivisorService();
  const matcher = new DivisorMatcher(service);

  test("countDivisors of 6 should be 4", () => {
    expect(service.countDivisors(6)).toBe(4);
  });

  test("findMatchingCount for 10 should be 2", () => {
    expect(matcher.findMatchingCount(10)).toBe(2);
  });

  test("findMatchingCount for 1 should be 0", () => {
    expect(matcher.findMatchingCount(1)).toBe(0);
  });

  test("findMatchingCount for 2 should be 1", () => {
    expect(matcher.findMatchingCount(2)).toBe(1);
  });

  test("handle large input like 100 without crashing", () => {
    expect(typeof matcher.findMatchingCount(100)).toBe("number");
  });
});
