let count = 0;

function cc(card) {
  // Only change code below this line
  if (typeof(card) === "number") {
    if ([2, 3, 4, 5, 6].includes(card)) {
      count += 1;
    } else if ([7, 8, 9].includes(card)) {
      count += 0;
    } else if (card > 9) {
      count -= 1;
    }
  } else if (typeof(card) === "string") {
    count -= 1;
  }

  let result = '';
  if (count <= 0) {
    result = `${count} Hold`
  } else {
    result = `${count} Bet`
  }

  return result;
  // Only change code above this line
}


console.log(cc(2));
console.log(cc(3)); 
console.log(cc(7));
console.log(cc('K'));
console.log(cc('A'));