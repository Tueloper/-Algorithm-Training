// This function checks if the reversed on a string is equal to the inputted string

// Solution 1
function palindrone(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

// Solution 2
function palindroned(str) {
  return str.split('').every((char, i) => {
    return char === str[str.length - i - 1]
  })
}

console.log(palindroned('racecar'));