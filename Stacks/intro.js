class Stack {
  constructor() {
  this.count = 0;
  this.Storage = {};
  }

  push (value) {
    this.Storage[this.count] = value;
    this.count++
  }

  pop() {
    if (this.count === 0) return undefined
    this.count--;
    let result = this.Storage[this.count];
    delete this.Storage[this.count]
    return result
  }

  size() {
    return this.count;
  }

  peek() {
    return this.Storage[this.count - 1]
  }
}

let myStack = new Stack();

myStack.push(1);
myStack.push(2);
console.log(myStack.peek);
console.log(myStack.pop);
console.log(myStack.peek);