import { SearchController } from "../../src/controllers/searchController";
import { AppError } from "../../src/exceptions/appError";


jest.mock("../../src/services/userKeywordService", () => ({
  getUserKeywords: jest.fn(),
}));
jest.mock("../../src/services/headlineService", () => ({
  searchHeadlines: jest.fn(),
}));

import userKeywordService from "../../src/services/userKeywordService";
import headlineService from "../../src/services/headlineService";

// Helper: create a mock response object
function mockResponse() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe("SearchController.searchByUserKeywords", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { user: { id: 123 } }; // default user
    res = mockResponse();
    jest.clearAllMocks();
  });

  it("should return 401 if user not in request", async () => {
    req = {}; // no user
    await SearchController.searchByUserKeywords(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found in request" });
  });

  it("should return 404 if user has no keywords", async () => {
    (userKeywordService.getUserKeywords as jest.Mock).mockResolvedValue([]);
    await SearchController.searchByUserKeywords(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "No keywords configured for this user" });
  });

  it("should return headlines for all keywords", async () => {
    (userKeywordService.getUserKeywords as jest.Mock).mockResolvedValue([{ keyword: "Tesla" }, { keyword: "Apple" }]);
    (headlineService.searchHeadlines as jest.Mock)
      .mockResolvedValueOnce([{ art: "A" }])
      .mockResolvedValueOnce([{ art: "B" }, { art: "C" }]);

    await SearchController.searchByUserKeywords(req, res);

    expect(res.json).toHaveBeenCalledWith({
      headlines: [{ art: "A" }, { art: "B" }, { art: "C" }],
    });
    expect(headlineService.searchHeadlines).toHaveBeenCalledTimes(2);
  });

  it("should return 500 on generic error", async () => {
    (userKeywordService.getUserKeywords as jest.Mock).mockRejectedValue(new Error("DB down"));
    await SearchController.searchByUserKeywords(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should correctly handle an AppError thrown from anywhere", async () => {
    (userKeywordService.getUserKeywords as jest.Mock).mockImplementation(() => {
      throw new AppError("Custom", 403);
    });
    await SearchController.searchByUserKeywords(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Custom" });
  });
});
