// 2. Find duplicate characters in a given string
function findDuplicateCharacters(str) {
  const charCount = {};
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  for (let [char, count] of Object.entries(charCount)) {
    if (count > 1) {
      console.log(`${char} - ${count} times`);
    }
  }
}

findDuplicateCharacters("Java");
findDuplicateCharacters("programming");
