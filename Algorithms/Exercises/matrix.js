// Write a function that accepts an integer N
// and resturns a N*N spiral matrix
// --Examples
// matrix(2)
// [[1, 2]
//  [3, 4]]

// matrix(4)
// [[1,  2, ,3, 4]
// [12, 13, 14, 5]
// [11, 16, 15, 6],
// [10,  9  8,  7]]


// Solution 1
function matrix(n) {
  const results = [];

  for (let i = 0; i < n; i++) {
    results.push([]);
  }

  let counter = 1;
  let startColumn = 0;
  let endColumn = n - 1;
  let startRow = 0;
  let endRow = n - 1;

  while (startColumn <= endColumn && startRow <= endRow) {
    // Top row array
    for (let i = startColumn; i <= endColumn; i++) {
      results[startColumn][i] = counter;
      counter++;
    }

    // on to the next column
    startRow++;

    // right column
    for (let i = startRow; i <= endRow; i++) {
      results[i][endColumn] = counter;
      counter++;
    }

    // decrement endColumn to shift the start
    endColumn--;

    // bottom row
    for (let i = endColumn; i >= startColumn; i--) {
      results[endRow][i] = counter;
      counter++
    }

    endRow--;

    // start column
    for (let i = endRow; i >= startRow; i--) {
      results[i][startColumn] = counter;
      counter++;
    }

    startColumn++;
  }
  return results;
}











function mattrix(n) {
  // general array 
  const results = [];

  // create the arrays in the array
  for (let i = 0; i < n; i++) {
    results.push([]);
  }


  // define variables before the loop
  let counter = 1;

  // left to right variables
  let startColumn = 0;
  let endColumn = n - 1;


  // up to down variables
  let startRow = 0;
  let endRow = n - 1;


  // while loop that makes it go round
  while (startColumn <= endColumn && startRow <= endRow) {
    // create the first row of arrays
    for (let i = startColumn; i <= endColumn; i++) {
      results[startRow][i] = counter;
      counter++
    }

    // shift start row down by 1
    startRow++;

    for (let i = startRow; i <= endRow; i++) {
      results[i][endRow] = counter;
      counter++;
    }

    // shift down right end column left by 1
    endColumn--;

    for (let i = endColumn; i >= startColumn; i--) {
      results[endRow][i] = counter;
      counter++;
    }

    // shift down left down row up by 1
    endRow--;

    for (let i = endRow; i >= startRow; i--) {
      results[i][startColumn] = counter;
      counter++;
    }

    // shift up right column right by 1
    startColumn++;
  }
  return results;
}


console.log(mattrix(6git ))