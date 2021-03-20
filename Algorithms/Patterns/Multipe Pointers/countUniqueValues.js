// Problem: Implement a function that accepts a sorted array and counts the unique values in array
// Results: return the count of unique values


// solution 1: using frequency counter
const countUnique = (arr) => {
  if (!arr.length) return 0;
  let obj = {}

  for (const val of arr) {
    obj[val] ? obj[val] += 1 : obj[val] = 1
  }
  let count = 0
  for (key in obj) {
    count++;
  }

  return count;
}

// SSolution 2: using array set
const countUniqueSet = (arr) => {
  if (!arr.length) return 0;
  const uniqueValues = [ ...new Set(arr.map(item => item))];
  return uniqueValues.length
}


// Solution 3: using multiple points pattern
const countUniqueValues = (arr) => {
  if (!arr.length) return 0;
  // select pointer
  let k = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[k] !== arr[i]) {
      k++;
      arr[k] = arr[i]
    }
  }
  return k + 1;
}
console.log(countUniqueValues([1,1,1,1,1,1,1,2]))
console.log(countUniqueValues([1,2,3,4,4,5,6,6,7,7,8,12,12]))