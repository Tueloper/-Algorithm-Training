function countDown(num) {
  // base case
  if (num <= 0) {
    console.log('all done');
    return;
  }

  console.log(num);
  num--;
  

  // call with a different case
  countDown(num);
}

countDown(5)