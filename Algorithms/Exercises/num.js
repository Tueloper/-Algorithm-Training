var numDifferentIntegers = function(word) {
  let index = 0;
  let obj = {};
  let countNum = '';
  let count = 0
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < word.length; i++) {
    if (nums.includes(Number(word[i]))) {
      countNum += word[i].toString()
    } else {
      obj[index] = countNum;
      countNum = '';
      index++;
    }
  }

  for (let key in obj) {
    console.log(key, obj[key])
    if (obj[key] == null || obj[key] === '' || obj[key] === null) {
      delete obj[key]; 
    }
  }
  
  for (let key in object) {
    if (obj[key] === obj[key + 1]) {
      count = 1;
    }else count++;
  }
  return obj;
};

console.log(numDifferentIntegers("a123bc34d8ef34"))