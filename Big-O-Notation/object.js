// Write a function that takes in a string and returns counts of each character in the string
// use cases
// charCount("aaaa")
/**
 * {
 *    a: 4
 * }
 */

// use case 2
// charCount2('hello');
/**
 * {
 *     h: 1
 *     e: 1
 *     l: 2
 *     o: 1
 * }
 */

// charCount('Your PIN is 1234');
/**
 * {
 *    y:1
 *    o:1
 *    u:1
 *    r:1
 *    p:1
 *    i:2
 *    n:1
 *    s:1
 *    1:1
 *    2:1
 *    3:1
 *    4:1
 * }
 */

// break it down
function charCount(str) {
  // do something
  // return an object with the keys that are lowercase alphanumeric characters in the string: values should be in a object
}

function makeCharCount(str) {
  // make object to return at the end
  const result = {};
  // loop over the string, for each character do the following...
  for (let char of str) {
    // if the char is something else (not a number or a letter), dont do anything
    if (isAlphaNumeric(char)) {
      // make a lowecase of the inputted string
      char = char.toLowerCase();
      // If char is a anumber/letter and is not a key in the object, add to the object and set count to 1
      if (!result[char]) result[char] = 1;
        // If the char is a number/letter and is a key in the object, increase count by 1
      else result[char]++;
    }
  }
  // return the object
  return result;
}

function isAlphaNumeric(char) {
  let code = char.charCodeAt(0);
  if (!(code > 47 && code < 58) && // numeric (0-9)
      !(code > 67 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)) { // upper alpha (A-Z)
    return false
  }
  return true;
}

console.log(makeCharCount('Hello, this is a box'));
// N/B: Very important for an interview, it helps them know you understand the problem, the process is important
