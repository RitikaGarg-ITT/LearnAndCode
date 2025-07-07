import userKeywordService from "../src/services/userKeywordService";
import userKeywordRepo from "../src/repositories/userKeywordRepo";

jest.mock("../../src/repositories/userKeywordRepo");

describe("userKeywordService", () => {
  const mockUserId = 1;
  const mockKeyword = "tesla";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get user keywords", async () => {
    (userKeywordRepo.getKeywordsByUser as jest.Mock).mockResolvedValue([{ keyword: mockKeyword }]);
    const result = await userKeywordService.getUserKeywords(mockUserId);
    expect(result).toEqual([{ keyword: mockKeyword }]);
  });

  it("should add a user keyword", async () => {
    (userKeywordRepo.addKeyword as jest.Mock).mockResolvedValue(undefined);
    await expect(userKeywordService.addKeyword(mockUserId, mockKeyword)).resolves.toBeUndefined();
  });

  it("should delete a user keyword", async () => {
    (userKeywordRepo.deleteKeyword as jest.Mock).mockResolvedValue(undefined);
    await expect(userKeywordService.deleteKeyword(mockUserId, mockKeyword)).resolves.toBeUndefined();
  });
});
