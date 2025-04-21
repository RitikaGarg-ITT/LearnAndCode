// 1. Find Pair Of Integers in Array whose Sum is Given Number
function findPairsWithSum(numbers, target) {
  const numSet = new Set();
  for (let num of numbers) {
    let complement = target - num;
    if (numSet.has(complement)) {
      console.log(`Pair found (${complement}, ${num})`);
    }
    numSet.add(num);
  }
}

findPairsWithSum([8, 7, 2, 5, 3, 1], 10);
