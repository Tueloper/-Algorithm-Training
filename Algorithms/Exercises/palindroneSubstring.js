function palindroneSubstring(str, size = 3, i = 0, savedPalindrones = []) {
  if (str.length <= Number(size)) {
    if (savedPalindrones.length === 0) return "none";
    return savedPalindrones.reduce((a, b) => a.length > b.length ? a : b);
  }

  const constStize = 2;

  if (str.length <= constStize) return "none";
  
  while (i <= str.length) {
    let newStr = str.slice(i, size + i);
    
    if (newStr.length === Number(size)) {
      const reversed = newStr.split('').reverse().join('');
      if (newStr === reversed) savedPalindrones.push(newStr);
    }

    i++;
  }

  return palindroneSubstring(str, size += 1, 0, savedPalindrones);
}

console.log(palindroneSubstring("abcdefgg"));
