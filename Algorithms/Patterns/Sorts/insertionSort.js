// loops for just one time inserting the values where they fit in

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    for (let j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp
      // arr[j + 1] = arr[j]
    }
    // arr[j + 1] = currentVal;
  }

  return arr;
}

console.log(insertionSort([25, 30, 2, 1,  29, 23, 4, 38]))