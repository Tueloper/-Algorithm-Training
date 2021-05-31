// distinct challenge

const distinctStr = (strWord) => {
  if (strWord.length < 10) return false;
  let obj1 = {};
  for (const val of strWord) {
    const char = val.toLowerCase();
    obj1[char] = (obj1[char] || 0) + 1;
  }
  for (const key in obj1) {
    if (obj1[key] > 1) return false;
  }
  return true;
}

console.log(distinctStr('yhnmaspl1345'));