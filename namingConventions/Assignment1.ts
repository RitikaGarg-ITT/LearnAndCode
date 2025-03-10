const countryAdjacency = {
  IN: ["Pakistan", "China", "Nepal", "Bhutan", "Bangladesh", "Myanmar"],
  US: ["Canada", "Mexico"],
  NZ: [],
};

const getAdjacentCountriesByCode = (countryCode) => {
  const uppercaseCode = countryCode.toUpperCase();
  if (countryAdjacency[uppercaseCode]) {
    return countryAdjacency[uppercaseCode];
  } else {
    return [];
  }
};

const startApplication = () => {
  const countryCode = prompt("Enter a country code (e.g., IN, US, NZ):");

  if (countryCode) {
    const adjacentCountries = getAdjacentCountriesByCode(countryCode);
    if (adjacentCountries.length === 0) {
      console.log(`No adjacent countries found for ${countryCode.toUpperCase()}.`);
    } else {
      console.log(`Adjacent countries for ${countryCode.toUpperCase()}: ${adjacentCountries.join(", ")}`);
    }
  } else {
    console.log("No input provided.");
  }
};

startApplication();
