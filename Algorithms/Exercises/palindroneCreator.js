function palindroneCreator(str) {
  let resultOutcast = '';
  const size = 2;
  let outcast;
 
  for (let j = 1; j <= size; j++) {
    let i = 0;
    while (i < str.length) {
      if (j === 1) {
        outcast = str[i]
      } else if (j === 2 && (j + 1 !== undefined)) {
        outcast = `${str[i]}${str[i + 1]}`;
      }

      if (outcast !== '') {
        let newStr = str.replace(outcast, '');
        const reversed = newStr.split('').reverse().join('');
        if (newStr === reversed) {
          resultOutcast = outcast;
        }
      }
      
      i++;
      outcast = '';
    }
  }
  
  if (resultOutcast !== '' && resultOutcast.length > 2) return resultOutcast;
  else return "not impossible";
}

console.log(palindroneCreator("mmop"));
