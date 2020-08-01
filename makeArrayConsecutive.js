function min(arr) {
  const sortedArr = arr.sort((a, b) => a - b);
  let result = sortedArr.slice(0, -1).reduce((a, b, i) => {
   return a + ((sortedArr[i + 1] - b) - 1)
 }, 0)

  return console.log(result)
}

min([2,5,8,10,12]);
