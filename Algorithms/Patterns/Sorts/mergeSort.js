// uisng merge sort

function merge(arr1, arr2) {
  let results = [];
  let i = 0;
  let j = 0;

  // touches the 2 arrays
  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }
console.log(i, j)
  // incases where the above while loop doesn't exhaust the array
  // single loop
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }

  return results;
}


// second function seprates the array
function mergeSort(arr) {
  // find a base call
  if (arr.length <= 1) return arr;

  // find a breaking point
  let middle = Math.floor(arr.length/2);
  let left = mergeSort(arr.slice(0, middle));
  let right = mergeSort(arr.slice(middle));

  // call Join function
  return merge(left, right);
}

console.log(mergeSort([24, 10, 76, 73, 54, 22]));
// console.log(merge([10, 24], [ 76, 73]));