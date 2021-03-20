// Write a function that returns the number of vowels usded in a string. 
// Vowels are the characters a,e,i,o,u
// --Examplems
// vowels('Hi There') --> 3


// Solution 1: Quadratic Solution (Not Optimized)
function vawel(str) {
  const lowerStr = str.toLowerCase();
  const vowelarray = ["a", "e", "i", "o", "u"];
  const strArray = lowerStr.split('');
  return strArray.filter((char) => vowelarray.includes(char)).length;
}


// Solution 2
function vaow(str) {
  let count = 0;
  for (let val of str.toLowerCase()) {
    if (/^[aeiouy]+$/.test(val)) {
      count++
    }
  }

  return count;
}

console.log(vaow('Hi There'));


// Solution 3
function vowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}