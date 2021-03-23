// This function collects all of the odd values in an array

// Solution Using Recursion Helper functions, this are recursion functions defined inside a function
function collectOddValues1(arr) {
  let result = [];

  function helper(input) {
    // input must be an array
    if (!input.length) return;

    // the recursion works by checking the first value of an array for any recursion
    // if the first value of the array is a odd number
    if (input[0] % 2 !== 0) result.push(input[0]);

   // call the function with new array
    return helper(input.slice(1));
  }

  helper(arr);
  return result;
}

// Solution 2 - Pure Recursion
function collectOddValues2(arr, result = []) {
  if (!arr.length) return;
  if (arr[0] % 2 !== 0) result.push(arr[0])
  collectOddValues2(arr.slice(1), result);
  return result;
}

console.log(collectOddValues2([1,2,3,4,5,5,6,6,7,8,9,]));