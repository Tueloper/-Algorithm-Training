const firstnum = "10534";
const secondnum = "67";
const thirdnum = "1120";

function eraseOneDigit(firstnum, secondnum, thirdnum) {
  let i = 0;

  let result = false;
  while (i <= firstnum.length) {
    const number = firstnum.replace(i, "");
     if (Number(number) + Number(secondnum) === Number(thirdnum)) {
       result = true;
     }

    i++;
  }

  return result;
}

console.log(eraseOneDigit(firstnum, secondnum, thirdnum));
