// Given a string, return the character that is most common
// maxChar('abcccccccccccccccd') === 'c'

// Solution 1: Frequency Counter
function maxChar1(str) {
  let max = 0;
  let maxChar = '';
  let Frequency = {};
  for (let val of str) {
    Frequency[val] ? Frequency[val] += 1 : Frequency[val] = 1;
  }
  // check the count
  for (let key in Frequency) {
    if (Frequency[key] > max) {
      max = Frequency[key];
      maxChar = key;
    }
  }

  return maxChar;
}

console.log(maxChar1('abccccccccccccccccd'));