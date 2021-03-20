// Write a Function thats accepts a string and capitalize the first letter of each word in the string
// --Examples
// capitalize(a short sentence) --> 'A Short Sentence'

function capitalize1(str) {
 const arrayStr = str.split(' ');
 let capacitalised = []
 for (let val of arrayStr) {

  let capital = val[0].toUpperCase();
  let body = val.slice(1);
  capacitalised.push(capital + body)
 }
 return capacitalised.join(' ');
}

// console.log(capitalize1('a short sentence'));

function capitalize2(str) {
  let result = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }

  return result;
}

console.log(capitalize2('this is a short sentence'));