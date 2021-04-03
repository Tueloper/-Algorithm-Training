// using quick sort 

// let try the pivot
// pics a pointer and sorts the arr in a way that the numbers lesser than it is on the left hand side and the 
// numbers greater than it is on the right hand side

function pivot(arr, start = 0, end = arr.length - 1) {
  function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  let pivot = arr[start];
  let swapIndex = start;

  for (let i = start + 1; i <= end; i++) {
    console.log(pivot, arr[i], arr[swapIndex])
    if (pivot > arr[i]) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }

  swap(arr, start, swapIndex);
  return swapIndex;
}


// quick Sort
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivaotndex = pivot(arr, left, right);
    // left
    quickSort(arr, left, pivaotndex - 1);
    // right
    quickSort(arr, pivaotndex + 1, right);
  }

  return arr;
}
console.log(quickSort([4, 8, 2, 1, 5, 7, 6, 3]))
