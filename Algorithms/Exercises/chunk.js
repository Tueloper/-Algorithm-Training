// Write a function that takes an array and chunk sizee, divide the array into subarrays 
// where each subarray is of length size
//  --Examples
// chunk([1,2,3,4], 2) --> [[1,2], [3,4]]


// Solution 1
function chunk1(array, size) {
  if (size > array.length) return array;

  const chunked = [];

  for (let val of array) {
    const last = chunked[chunked.length - 1];

    if (!last || last.length === size) {
      chunked.push([val]);
    } else {
      last.push(val)
    }
  }

  return chunked;
}

// console.log(chunk1([1,2,3,4], 2));


// Solution 2
function chunk2(array, size) {
  let chunked = [];
  let i = 0;
  while (i < array.length) {
    chunked.push(array.slice(i, size + i));
    i += size;
  }

  return chunked;
}

console.log(chunk2([1,2,3,4], 2));