import dotenv from "dotenv";
dotenv.config();

import { GeocodeService } from "./services/geocodeService";
import { getUserInput } from "./inputs/inputHanlder";
import { displayCoordinates, displayError, displayNotFound } from "./Display/displayCoordinates";

async function main() {
  const place = await getUserInput("Enter a place: ");
  const geocodeService = new GeocodeService();

  try {
    const coordinates = await geocodeService.getCoordinates(place);
    if (coordinates) {
      displayCoordinates(coordinates.lat, coordinates.lon);
    } else {
      displayNotFound();
    }
  } catch (error: any) {
    displayError(error.message);
  }
}

main();
