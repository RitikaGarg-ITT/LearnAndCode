import axios from "axios";

import { GeocodeService } from "../services/geocodeService";

import { GeocodeResponse } from "../types/geocodeType";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("GeocodeService", () => {
  const service = new GeocodeService();

  it("should return coordinates for a valid place", async () => {
    const mockResponse: GeocodeResponse[] = [
      {
        lat: "40.7128",
        lon: "-74.0060",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await service.getCoordinates("New York");

    expect(result).toEqual({ lat: "40.7128", lon: "-74.0060" });

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      params: { q: "New York" },
    });
  });

  it("should return null if no results are found", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    const result = await service.getCoordinates("SomeUnknownPlace");

    expect(result).toBeNull();
  });

  it("should throw an error if the API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(service.getCoordinates("Paris")).rejects.toThrow("Network Error");
  });
});
