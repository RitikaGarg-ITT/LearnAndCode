// 3. Find common elements in three arrays
function findCommonElements(arr1, arr2, arr3) {
  const commonElements = [...new Set(arr1.filter((num) => arr2.includes(num) && arr3.includes(num)))];
  console.log("Common elements:", commonElements.join(", "));
}

findCommonElements([1, 5, 10, 20, 40, 80], [6, 7, 20, 80, 100], [3, 4, 15, 20, 30, 70, 80, 120]);
findCommonElements([1, 5, 5], [3, 4, 5, 5, 10], [5, 5, 10, 20]);
