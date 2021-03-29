// using selection sorting pattern, its is the opposite of bubble sort
// sort the array using bubble sort

// Solution 1: Bubble sort - Swapping


function selectionSort(arr) {
  let smallestNumber;
  for (let i = 0; i < arr.length; i++) {
    smallestNumber = i;
    for (let j = arr.length - 1; j >= i; j--) {
      if (arr[smallestNumber] > arr[j]) smallestNumber = j;
    }
    if (i !== smallestNumber) {
      let temp = arr[i];
      arr[i] = arr[smallestNumber];
      arr[smallestNumber] = temp;
    };
  }

  return arr;
}

console.log(selectionSort([25, 30, 2, 1,  29, 23, 4, 38]))