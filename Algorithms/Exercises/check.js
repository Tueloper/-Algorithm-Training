function divisorSubstring(n, k) {
  let i = 0;
  let result = 0;
  while(i < n.length) {
    let chunk = n.slice(i, k + i);

    if (chunk % k > 0) result++
    i++;
  }

  return result;
}

console.log(divisorSubstring(248));