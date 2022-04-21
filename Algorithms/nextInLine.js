const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const number = 11;

function nextInLine(arr, number) {
  arr.push(number);
  return arr.shift();
}

console.log(nextInLine(arr, number));
