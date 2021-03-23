// Binary Solution
// It works on a sorted array

// SOlution 1
function binary(arr, size) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);

  while (arr[middle] !== size && start <= end) {
    if (size < arr[middle]) end = middle - 1;
    else start = middle + 1
    middle = Math.floor((start + end) / 2);
  }

  return arr[middle] === size ? middle : -1;
}