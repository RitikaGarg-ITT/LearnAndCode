import * as adminView from "../src/views/adminView";

describe("adminView", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("showAdminMainMenu prints expected menu", () => {
    adminView.showAdminMainMenu("TestAdmin");
    expect(console.log).toHaveBeenCalledWith("\nWelcome to the News Aggregator Admin Panel, TestAdmin!");
    // You can test other calls similarly if needed
  });

  test("showBlockedKeywordsList handles empty list", () => {
    adminView.showBlockedKeywordsList([]);
    expect(console.log).toHaveBeenCalledWith("No blocked keywords found.");
  });

  test("showBlockedKeywordsList prints keywords", () => {
    adminView.showBlockedKeywordsList(["k1", "k2"]);
    expect(console.log).toHaveBeenCalledWith("\nBlocked Keywords:");
    expect(console.log).toHaveBeenCalledWith("1. k1");
    expect(console.log).toHaveBeenCalledWith("2. k2");
  });
});
