// A function that accepts a value and returns the index where the value is found

// solution 1
function seach1(array, num) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === num) return i;
  }
  return -1;
}



// Solution 2: Divide and Conquer Basics
function search(arr, val) {
  // get valid index points of the first and last index
  let min = 0;
  let max = arr.length - 1;
  
  while (min <= max) {
    let middle = Math.floor((min + max)/2);
    // console.log(middle)
    let currentElement = arr[middle];

    if (currentElement > val) max = middle - 1;
    else if (currentElement < val) min = middle + 1;
    else return middle;
  }
  return -1
}

console.log(search([1,2,3,4,5,6], 6));