// write a simple linear search function

// Solution 1
function linearSearch(arr, val) {
  for (let i = 0; i < array.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}

// Solution 2
function linear2(arr, val) {
  return arr.indexOf(val);
}