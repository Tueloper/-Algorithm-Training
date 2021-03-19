// Write an anagram function

function anagram(str1, str2) {
  if (str1 === str2) return true;
  if (str1.length !== str2.length) return false;
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let i = 0; i < str1.length; i++) {
    let char = str1[i];
    console.log(char)
    frequencyCounter1[char] = (frequencyCounter1[char] || 0) + 1
  }

  for (let i = 0; i < str2.length; i++) {
    let char = str2[i];
    frequencyCounter2[char] = (frequencyCounter2[char] || 0) + 1
  }

  for (let key in frequencyCounter1) {
    if (!(key in frequencyCounter2)) {
      return false      
    }
    if (frequencyCounter2[key] !== frequencyCounter1[key]) {
      return false
    }
  }
  return true;
}

// console.log(anagram('aaz', 'azaa'));

// N/B: where you checking for frequencies enusing you seperate the arrays into objects are essential

const anagram2 = (str1, str2) => {
  // if the strings are equal to each other return true
  if (str1 === str2) return true;

  // if the string frequency are are not equal, returj false
  if (str1.length !== str2.length) return false;

  // after major checks, its time to start the frequency counter method
  let obj1 = {};
  let obj2 = {};

  // convert strings into object and count number of occurencies (Frequencies)
  for (const val of str1) {
    const char = val.toLowerCase();
    obj1[char] = (obj1[char] || 0) + 1;
  }
  for (const val of str2) {
    const char = val.toLowerCase();
    obj2[char] = (obj2[char] || 0) + 1;
  }
  
  // check the object if the frequencies are greater than the other or less than
  for (const key in obj1) {

    // checks if the key exist in both objects
    if (!(key in obj2)) return false;

    // checks if the value of the key are the same in the 2 objects>
    if (obj2[key] !== obj1[key]) return false;
  }
  return true
}


// console.log(anagram2('qwerty', 'qeywrt'));

const anagram3 = (str1, str2) => {
  if (str1 === str2) return true;
  if (str1.length !== str2.length) return false;
  // create an object
  const obj = {};
  for (const val of str1) {
    obj[val] ? obj[val] += 1 : obj[val] = 1
  }
  // iterate through str2 and check if it exist in the object
  for (const val of str2) {
    if (!obj[val]) return false;
    else obj[val] -= 1
  }
  for (const key in obj) {
    if (obj[key] !== 0) return false;
  }

  return true
}

anagram3('qwerty', 'qeywrw')
console.log(anagram3('aaz', 'aza'))