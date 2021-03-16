/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function (nums) {
  let newArray = [];
   nums.forEach((item, i) => {
    if (!checkDuplicate(newArray, item)) newArray.push(item);
   });
   return newArray;
 }
 
 const checkDuplicate = (nums, word) => {
   return (nums.indexOf(word) !== -1)
 }

 removeDuplicates([1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,6,6])