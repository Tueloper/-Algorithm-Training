// phone booth javascript

// A = ['pim', 'pom']
// B = ['999999999999999999', '777788889999']
// P = '88999'


function phoneContact(arr1, arr2, P, index = 0, checkedArr = false, i = 0, correctIndex, correctCount = []) {
  if (arr2.length <= index) {
    if (correctCount.length > 1) {
      let lengthArray  = [];
      let minLength = arr1.length;
      let result;
      correctCount.forEach(element => {
        lengthArray.push({ length: arr1[element].length, index: element });
      });

      lengthArray.forEach((item) => {
        minLength = Math.min(minLength, item.length);
      });
      
      for (let j = 0; j < lengthArray.length; j++) {
        const item = lengthArray[j];
        if (item.length === minLength) {
          result = item.index
          break;
        } 
      }

      return arr1[result];
    } else if (checkedArr) return arr1[correctIndex];
    else return 'NO CONTACT';
  }

  const size = P.length;
  
  const numberStr = arr2[index];

  while (i < numberStr.length) {
    const sizeCheck = numberStr.slice(i, size + i);
  
    if (sizeCheck === P) {
      checkedArr = true;
      correctIndex = index;
      correctCount.push(index);
    }
    i++;
  }

  index++;
  return phoneContact(arr1, arr2, P, index, checkedArr, i = 0, correctIndex, correctCount);
}

console.log(phoneContact(['pim', 'pom'], ['777788889999', '999999999999999999'], '88999'));