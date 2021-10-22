const arr = [1, 2, 1, -4, 5, 10]
const yy = [0, 1, 0, 1];

function checkMonocity(arr) {
  const size = 3;
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    let arrPairs = arr.slice(i, size + i);
    
    if (arrPairs.length === 3) {
      if (Number(arrPairs[0]) < Number(arrPairs[1]) < Number(arrPairs[2])) {
        result.push(1);
      } else if (Number(arrPairs[0]) > Number(arrPairs[1]) > Number(arrPairs[2])) {
        result.push(1);
      } else {
        result.push(0);
      }
    }
  }

  return result;
}

console.log(checkMonocity(arr));