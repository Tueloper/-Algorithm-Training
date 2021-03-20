/**
 * A tree us a data structure where a anode ncan have zero or more children.
 * Each node cantains a value, and similar to graphs each node can have a connectioj betweem other n0des called edges
 * The top most node is called a root
 * The node without children is the leaf node
 * The distane between nodes is the height of the tree
 * 
 * Binary tree are trees in which neach node can only have a maximum of 2 children
 * Types of Bunary Tree
 * Full inary tree is a tree whci every node has exactly 2 or zero children but never one
 * Complete BinaryTree is a tree which all levels expcept the last one are full width nodes
 * Perfect Binary NTrees is a tree in which all levels including the last level are full of nodes
 * 
 * A binary seacrh tree is a special tree where the values of every npode to the left are less than its value and the values of node to the right are greater than its value
 * 
 * 
 */

class Node {
  constructor(value) {
    this.value = value
    this.head = null
    this.tail = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  add(value) {
    if (this.root === null) {
      this.root = new Node(value)
      return;
    } else {
      let currentNode = this.root;
      let added = false

      while(!added && currentNode) {
        if (value === currentNode) return 'Duplicates allowed';
        if ( value < currentNode) {
          if (currentNode.left === null) {
            currentNode.left = new Node(value);
            added = true
          } 
          else currentNode = currentNode.left
        } else if (value > currentNode) {
          if (currentNode.right === null) {
            currentNode.right = new Node(value)
            added = true
          } else currentNode = currentNode.right
        }
      }
    }
  }
}