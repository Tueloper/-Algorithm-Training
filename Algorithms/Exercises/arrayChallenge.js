// ['baseball', "a, all, b, ball, bas, base, cat, code, d, e, quit, z"]

const arrayChallenge = (strInt) => {
  const konstant = strInt[0];
  const listOfWords = strInt[1].split(',');
  
  // recursive function
  const checkDictionary = (listOfWords, konstant, result = []) => {
    if (listOfWords.length < 1) {
      if (result.length > 0) return result;
      else 'not possible';
    }
    let checkStr = listOfWords[0].trim();
    let i = 0;
    let size = checkStr.length;

    while (i < konstant.length) {
      const sizeCheck = konstant.slice(i, size + i);
      if (sizeCheck === checkStr && size > 1) result.push(sizeCheck);
      i++;
    }

    i = 0;
    return checkDictionary(listOfWords.slice(1), konstant, result);
  }

  const result = checkDictionary(listOfWords, konstant);
  if (result !== 'not possible') {
    let j = 0;
    let dicwords = '';

    while (j <= result.length) {
      if (dicwords !== '') break;
      let word = result[j];
      result.forEach((item) => {
        if (`${item}${word}` === konstant) {
          dicwords = `${item}, ${word}`;
          // break;
        } else if (`${word}${item}` === konstant) {
          dicwords = `${word}, ${item}`;
          // break;
        }
      });
      j++;
    }
    return dicwords;
  } else return result;
}


console.log(arrayChallenge(['baseball', "a, all, b, ball, bas, base, cat, code, d, e, quit, z"]));