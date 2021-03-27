// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

const rotate = function(matrix) {
  let results = [];
  
  for (let i = 0; i < matrix.length; i++) {
    results.push([]);
  }
  
  let startRow = 0;
  let endRow = matrix.length - 1;
  let endColumn = matrix.length - 1;
  let startColumn = 0;
  
  while(startRow <= endRow) {

    for (let i = 0; i < matrix.length; i++) {
      results[i][endColumn] = matrix[startRow][i]
    }
    startRow++;
    endColumn--;
  }

  return results;
};

console.log(rotate([
  
  [5,1,9,11],
  [2,4,8,10],
  [13,3,6,7],
  [15,14,12,16]
]));

const ll = [


  [ 1, 2, 3 ], // startRow
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]  // endRow


];