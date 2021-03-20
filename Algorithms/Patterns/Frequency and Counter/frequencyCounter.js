// pattern to make use of objects to record frequency of a key value

// solution 1: Using nested loops (N^2)
// function same(arr1, arr2) {
//   if (arr1.length !== arr2.length) return false;
//   if (!arr2.length || !arr1.length) return false;
//   for (let i = 0; i < arr1.length; i++) {
//     let index = arr2.indexOf(arr1[i] ** 2);
//     if (index === -1) return false;
//     arr2.splice(index, 1)     
//   }
//   return true;
// }

// console.log(same([1,2,3], [4,1,9]));
// console.log(same([1,2,3], [8,1,9]));
// console.log(same([1,2,3], [9]));
// console.log(same([], [4,1,9]));

// solution 2: Using Frequency Counter
function fame(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let key of arr1) {
    frequencyCounter1[key] = (frequencyCounter1[key] || 0) + 1
  }
  for (let key of arr2) {
    frequencyCounter2[key] = (frequencyCounter2[key] || 0) + 1
  }

  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false      
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false
    }
  }
  return true;
}

console.log(fame([1,2,3,4], [9,1,4, 16]));