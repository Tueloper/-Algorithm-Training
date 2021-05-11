// Big Logic
// N/B: lo <= a < b <= hi
// return console.log(3 ^ 3);

function bitLogic(lo, hi, k) {
  let a = [];
  let b = [];
  let max = 0

  // getting possible values for a and b
  for (let i = lo; i <= hi - 1; i++) a.push(i);

  for (let i = lo + 1; i <= hi; i++) b.push(i);

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i] !== b[j]) max = Math.max(max, a[i] ^ b[j]);
    }    
  }

  return max <= k ? max : k;
}

console.log(bitLogic(1, 3, 3));