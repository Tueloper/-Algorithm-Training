// A function that checks if a smaller string is found in a longer string

// Solution 1: Sliding Window
function findString(longStr, shortStr) {
  let count = 0
  for (let i = 0; i < longStr.length; i++) {
    let char = longStr.substring(i, i + shortStr.length);
    if (char === shortStr) count++
  }

  return count;
}

console.log(findString('nhuomgnnhdyomgomg', 'omg'));


// Solution 2: Naive Search
function naiveSearch(longStr, shortStr) {
  let count = 0;
  for (let i = 0; i < longStr.length; i++) {
    for (let j = 0; j < shortStr.length; j++) {
      if (shortStr[j] !== longStr[i + j]) {
        break;
      }
      if (j === shortStr.length - 1) {
        count++;
      }
    }
  }
  return count;
}

// console.log(naiveSearch('nhuomgnnhdyomgomg', 'omg'));
