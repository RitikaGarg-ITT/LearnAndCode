import readlineSync from "readline-sync";
import { AdminMenuController } from "../src/controllers/adminController";
import * as adminView from "../src/views/adminView";

jest.mock("readline-sync");

describe("AdminMenuController", () => {
  let controller: AdminMenuController;
  let mockUser: any;

  beforeEach(() => {
    mockUser = { firstname: "TestAdmin" };
    controller = new AdminMenuController(mockUser);

    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should logout when choice is 8", async () => {
    // @ts-ignore
    readlineSync.questionInt.mockReturnValueOnce(8);
    const flowPromise = controller.adminMenuFlow();
    await expect(flowPromise).resolves.toBeUndefined();

    expect(console.log).toHaveBeenCalledWith("Logging out...");
  });

  test("should show invalid choice for invalid menu option", async () => {
    // @ts-ignore
    readlineSync.questionInt.mockReturnValueOnce(99).mockReturnValueOnce(8);
    const invalidChoiceSpy = jest.spyOn(adminView, "showInvalidChoice");

    await controller.adminMenuFlow();

    expect(invalidChoiceSpy).toHaveBeenCalled();
  });
});
