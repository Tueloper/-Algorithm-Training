// Queue is a first in and first out process

function Queue() {
  collection = [];
  this.print = function () {
    console.log(collection)
  }

  this.enqueue = function(item) {
    collection.push(item)
  }

  this.dequeue = function() {
    return collection.shift()
  }

  this.front = function() {
    return collection[0]
  }

  this.size = function () {
    return collection.length
  }

  this.isEmpty =function() {
    return (collection.length === 0)
  }
}



// next one

function PriorityQueue() {
  collection = [];
  this.print = function () {
    console.log(collection)
  }

  this.enqueue = function(item) {
    if (this.isEmpty(item)) collection.push(item)
    else {
      let added = false;
      for (let i = 0; i < collection.length; i++) {
        if(item[1] < collection[i][1]) {
          collection.splice(i, 0, item)
          added = true;
          break;
        }
      }
      if (!added) collection.push(item)
    }
  }

  this.dequeue = function() {
    return collection.shift()[0]
  }

  this.front = function() {
    return collection[0]
  }

  this.size = function () {
    return collection.length
  }

  this.isEmpty = function() {
    return (collection.length === 0)
  }
}

let q = new PriorityQueue();
q.enqueue(['bian tot', 3]);
q.enqueue(['totomna tot', 2]);
q.enqueue(['djdhhd tot', 1]);
q.print()
q.size();
q.front();
q.dequeue();
q.print()