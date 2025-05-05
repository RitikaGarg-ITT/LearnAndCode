import { GeocodeService } from "./services/geocodeService";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const geocodeService = new GeocodeService();

rl.question("Enter a place: ", async (place: string) => {
  try {
    const coordinates = await geocodeService.getCoordinates(place);
    if (coordinates) {
      console.log(`Latitude: ${coordinates.lat}`);
      console.log(`Longitude: ${coordinates.lon}`);
    } else {
      console.log("Location not found.");
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  } finally {
    rl.close();
  }
});
