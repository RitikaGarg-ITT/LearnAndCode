import axios from "axios";
import { GeocodeResponse } from "../types/geocodeType";

export class GeocodeService {
  private readonly BASE_URL = "https://geocode.maps.co/search";

  async getCoordinates(place: string): Promise<{ lat: string; lon: string } | null> {
    const response = await axios.get<GeocodeResponse[]>(this.BASE_URL, {
      params: { q: place },
    });

    const [firstResult] = response.data;

    if (firstResult) {
      return { lat: firstResult.lat, lon: firstResult.lon };
    }

    return null;
  }
}
