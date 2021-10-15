function mostFrequencyDigits(a) {
  const obj = {};
   let str = '';
   let max = 0;
   let result = [];

   a.forEach(c => {
     str += c
   });

   for (const key of str) {
     obj[key] = (obj[key] || 0) + 1
   }

    Object.values(obj).forEach((i) => {
      max = Math.max(max, i);
    });

    for (const key in obj) {
      if (obj[key] === max) result.push(Number(key));
    }

    return result;
}

console.log(mostFrequencyDigits([25, 2, 3, 57, 38, 41]))