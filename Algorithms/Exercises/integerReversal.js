// Given an integer, return an integer that is the reverse
// examples
// reverseInt(15) === 51


// Solution 1: Not fully optimised though
function reverseInt1(n) {
  const reversedNum = parseInt(n.toString().split('').reverse().join(''));
  if (Math.sign(n) === 1) return reversedNum;
  else return reversedNum * -1;
}

function reverseInt2(n) {
  const reversedNum = parseInt(n.toString().split('').reverse().join(''));
  return reversedNum * Math.sign(n);
}

console.log(reverseInt2(-3388))