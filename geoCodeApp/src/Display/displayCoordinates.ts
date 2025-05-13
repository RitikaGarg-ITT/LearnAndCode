export function displayCoordinates(lat: string, lon: string) {
  console.log(`Latitude: ${lat}`);
  console.log(`Longitude: ${lon}`);
}

export function displayError(error: string) {
  console.error("An error occurred:", error);
}

export function displayNotFound() {
  console.log("Location not found.");
}
