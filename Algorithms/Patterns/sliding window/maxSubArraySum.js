// Write a function that accepts an array of numbers called n, it should calculate the maximum sum of n consecutively in the array

// Solution 1
function maxSub (arr, num) {
  if (num > arr.length) return null;
  let max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    let temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];      
    }
    if (temp > max) {
      max = temp
    }
    // console.log(temp, max);
  }
  return max;
}

// console.log(maxSub([1,2,3,4,5,6,7,5,3,2,1,6,7,8,9,6], 4));

// Solution 2: Sliding Window
const maxSubarraySum = (arr, num) => {
  let maxSum = 0;
  let tempSum = 0;
  if (num > arr.length) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];    
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);    
  }

  return maxSum;
}

console.log(maxSubarraySum([1,2,3,4,5,6,7,5,3,2,1,6,7,8,9,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 4))