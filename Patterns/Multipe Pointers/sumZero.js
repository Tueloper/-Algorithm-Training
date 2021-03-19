// Problem: Write a Function that accepts a sorted array of integers. The function should find the first pair where the sum is 0
// Result: Return an array that includes both values that sum to zero or undefind if the pair does not exist

// break it down



// use cases
// sumZero([-3, -2, -1, 0, 1, 2, 3])
// sumZero([-3, 0, 1, 2])
// sumZero([ -1, 0, 1, 2, 3])


// solution 1 - Time Complexity - o(n^2), Space Complexity - o(1)
const sumZero = (arr) => {
  for (const val11 of arr) {
    for (const val22 of arr) {
      if ((val11 + val22) === 0) return [val22, val11]
    }
  }
}



// Solution 2: Using multiple pointer
const sumZero2 = (arr) => {
  // set 2 pointers
  let left = 0;
  let right = arr.length - 1;

  // infinity loop till we find 2 pairs while twerking the left and right values
  while (right > left) {
    let sum = arr[left] + arr[right];
    if (sum === 0) return [arr[left], arr[right]];
    else if (sum > 0) right--;
    else left++;
  }
}

console.log(sumZero2([-3, -2, -1, 0, 1]));