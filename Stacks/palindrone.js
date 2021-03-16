/**
 * Stacks
 */

//functions: Push. pop, peek,length
// Palindrone

const Palindrone = (word) => {
  let letters = [];
  let reverseWords = '';

  // convert words to array
  for (let i = 0; i < word.length; i++) {
    letters.push(word[i])
  }

  // reverse the word
  for (let i = 0; i < word.length; i++) {
    reverseWords += letters.pop()
  }

  // check
  if (reverseWords === word) console.log(`${word} is a palindrone`);
  else console.log(`${word} is not a palindrone`)
}

Palindrone('ffddddd');

// limit the usagae of forEach in algos