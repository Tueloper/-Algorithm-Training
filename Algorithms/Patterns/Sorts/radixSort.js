// Radix Sort works by not making comparisons
// it only works on numbers
// it is a special sorting algorithmns that works with lists of numbers
// It never makes comparisons between elemnets
// It exploits the fact that information about size of a number is encoded in the number of digits.

function getDigits(nums, i) {
  return Math.floor(Math.abs(nums) / Math.pow(10, i)) % 10;
}

// console.log(getDigits(7232, 2))

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// console.log(digitCount(4233))

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]))
  }
  return maxDigits;
}

// console.log(mostDigits([337, 8892, 77618, 2282, 222]))

function radixSort(nums) {
  let digitBuckets
  let maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigits(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    nums = [].concat(...digitBuckets);
  }
  return nums;
}

console.log(radixSort([23, 345, 5467, 12, 2345, 9852]))