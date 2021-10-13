const a = [8, 5, 6, 16, 5];
const l = 1;
const r = 3;

const boundedRatio = (a, l, r) => {
  const result = [];
  let i = 0;

  while(i < a.length) {
    const secondResult = []
    for (let x = l; x <= r; x++) {
      const test = (i + 1) * x;
      if (test === a[i]) {
        secondResult.push(true)
      } else secondResult.push(false)
    }

    const huu = secondResult.findIndex((c) => c === true);
    if (huu > -1) result.push(true)
    else result.push(false);

    i++;
  }

  return result;
}

console.log(boundedRatio(a, l, r));
