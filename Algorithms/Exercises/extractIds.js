const str =  "*hjj [~accountid:612c978d1dbcd9006917329b] [~accountid:612c978d1dbcd9006917329b] Hiiiiii*";

const extractIds = (str) => {
  const user = [];
  let i = 0;
  let P = 'accountid:'
  const size = P.length;

  while (i < str.length) {
    let sizeCheck = str.slice(i, size + i);
    if (sizeCheck === P) {
      user.push(str.slice(size + i, 24 + size+ i));
    }
    i++;
  }
 return user;
}

console.log(extractIds(str));
