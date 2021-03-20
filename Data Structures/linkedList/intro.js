/**
 * Linked list can be singly or doubly linked
 * Singly linked is when each node has one pounter which pounrs to the next elemenr in the list
 * Doubly linked has 2 pointers, one which pounrs to the next element in the list and one which points to the previous elemnent in the list
 * It uses 2 sepeerate classed
 * 
 * Constructor keeps trak of the following:
 * head: the pointer that keeps track of the first node on the list
 * tail: the pointer that keeps track of the last node of the list
 * length: the number of nodes in the list
 * 
 */

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  isEmpty() {
    return this.length === 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode
    }

    this.length++;
  }

  pop() {
    if (this.isEmpty()) return null;
    else if (this.length === 1) {
      const nodeToRemove = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return nodeToRemove;
    } else {
      let secondToLastNode;
      let currentNode = this.head;
      const nodeToRemove = this.tail;

      while(currentNode) {
        if (currentNode.next === this.tail) {
          secondToLastNode = currentNode;
          break;
        }
        currentNode = currentNode.next
      }

      secondToLastNode.next = null;
      this.tail = secondToLastNode;
      this.length--;
      return nodeToRemove;
    }
  }

  get(index) {
    if (this.isEmpty || index < 0 || index > this.length) return null;
    if (index === 0) return this.head;
    if (index === this.length - 1) return this.tail;

    let currentNode = this.head;
    let i = 0
    while(i < index)) {
        i++
        currentNode = currentNode.next;
    }
    return currentNode;
  }
}