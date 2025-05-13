import axios from "axios";
import { GeocodeResponse } from "../types/geocodeType";

export class GeocodeService {
  private readonly BASE_URL = process.env.GEOCODE_API_URL || "https://geocode.maps.co/search";

  async getCoordinates(place: string): Promise<{ lat: string; lon: string } | null> {
    const response = await axios.get<GeocodeResponse[]>(this.BASE_URL, {
      params: { place: place },
    });

    const [matchedLocation] = response.data;
    return matchedLocation ? { lat: matchedLocation.lat, lon: matchedLocation.lon } : null;
  }
}
