//  write a function that accepts a positive number N. The function should console.log a pyramid shape. 
// with N levels using the # character. Make sure the pyramid has spaces on the right and left hand sides
// --Examples
// steps(4)
// '  #  ',
// ' ## ',
// ' ### ',
// '####'


// Solution 1
function pyramid1(n) {
  const midPoint = Math.floor((2 * n - 1) / 2);
  // return console.log(midPoint)
  for (let row = 0; row < n; row++) {
    let level = '';
    
    // pyramid columns are (n * 2) - 1
    for (let column = 0; column < 2 * n + 1; column++) {
     if (midPoint - row <= column && midPoint + row >= column) level += '#';
     else level += ' '; 
    }
    console.log(level);
  }
}


function pyramid2(n, row = 0, column = '') {
   // base call
  if (row === n) return;

  const baseColumn = 2 * n - 1;

  // condition to increase the row
  if (column.length === baseColumn) {
    console.log(column);
    return pyramid2(n, row + 1);
  }

  const midPoint = Math.floor((2 * n - 1) / 2);
  if (midPoint - row <= column.length && midPoint + row >= column.length) column += '#';
  else column += ' ';

  return pyramid2(n, row, column);
}

pyramid2(3);