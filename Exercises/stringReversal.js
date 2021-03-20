// Function to return a reversed string of a string

// Soltion 1
function reverse1(str) {
  return str.split('').reverse().join('');
}

// Soltion 2
function reverse2(str) {
  let reversed = '';
 for (let char of str) {
   reversed = char + reversed
 }

 return reversed;
}

// Solution 3
function reverse3(str) {
  return str.split('').reduce(( accumulator, currentValue ) => currentValue + accumulator, '')  
}

// Solution 4
function reverse4(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}

console.log(reverse4('racecarB'));