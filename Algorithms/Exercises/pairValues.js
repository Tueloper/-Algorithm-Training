function pairValues(input) {
  const result = [];
  let i = 0;
  let Obj = {};

  while (i < input.length) {
    const splitArray = input[i].split(":");
    Obj[splitArray[0]] = (Obj[splitArray[0]] || 0) + Number(splitArray[1]);

    i++;
  }

  for (const key in Obj) {
    if (Obj[key] !== 0) {
      result.push(`${key}:${Obj[key]}`);
    }
  }

  return result.sort().join(", ");
}

console.log(pairValues(["X:-1", "Y:1", "X:-4", "B:3", "X:5"]));

