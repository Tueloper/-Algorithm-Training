//  write a function that accepts a positive number N. The function should console.log a step shape. 
// with N levels using the # character. Make sure the steps has spaces on the right hand side
// --Examples
// steps(4)
// '#    ',
// '##  ',
// '### ',
// '####'

function steps1(n) {
  for (let row = 0; row < n; row++) {
    let stair = '';

    for (let column = 0; column < n; column++) {
      if (column <= row) {
        stair += '#'
      } else {
        stair += ' '
      }
    }
    
    console.log(stair);
  }
}

function steps2(n, row = 0, stair = '') {
  if (n === row) return;
  if (n === stair.length) {
    console.log(stair);
    return steps2(n, row + 1);
  }
  if (stair.length <= row) stair += '#';
  else stair += ' ';

  steps2(n, row, stair);
}

function step(n, row = 0, column = '') {
  // base call
  if (n === row) return;

  // change row to the next row if column is full
  if (n === column.length) {
    console.log(column);
    step(n, row + 1)
  }

  // this adds value to the column
  if (column.length <= row) column += '#';
  else column += '';

  // call a different call base for the recursion
  return step(n, row, column)
}

steps2(10);