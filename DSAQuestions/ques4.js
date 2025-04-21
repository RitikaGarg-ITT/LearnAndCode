// 4. Find the smallest positive number missing from the array
function findSmallestMissingPositive(arr) {
  const numSet = new Set(arr.filter((num) => num > 0));
  let smallestMissing = 1;
  while (numSet.has(smallestMissing)) {
    smallestMissing++;
  }
  console.log("Smallest missing positive number:", smallestMissing);
}

findSmallestMissingPositive([2, 3, 7, 6, 8, -1, -10, 15]);
findSmallestMissingPositive([2, 3, -7, 6, 8, 1, -10, 15]);
findSmallestMissingPositive([1, 1, 0, -1, -2]);
