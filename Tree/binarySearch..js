/**
 * Binary Search Tree
 * uit can only have 2 branches for every node
 * it is an ordered node
 * classes are used to create nodes
 * while loop is compatible with Tree algorithms
 */

class Node {
  constructor(data, left=null, right = null) {
    this.data = data,
    this.left = left,
    this.right = right
  }
}

class BST {
  constructor() {
    this.root = null
  }

  add(data){
    const node = this.root;
    if (node === null) return this.root = new Node(data);
    else {
      const searchTree = function(node) {
        if (data < node.data) {
          if (node.left === null) return node.left = new Node(data);
          else if (node.left !== null) return searchTree(node.left);
        } else if (data > node.data) {
          if (node.right === null) return node.right = new Node(data);
          else if (node.right !== null) return searchTree(node.right);
        } else return null;
      }
      return searchTree(node);
    }
  }

  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left
    }
    return current.data
  }

  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right
    }
    return current.data
  }

  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) current = current.left;
      else current = current.right;
      if (current === null) return null;
    }

    return current;
  }

  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) return true;
      if (data < current.data) current = current.left;
      else current = current.right;
    }

    return false;
  }

  remove(data) {
    const removeNode = function (node, data) {
      if (node === null) return null;
      if (data === node.data) {
        if (node.left === null & node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        let tampNode = node.right;
        while (tampNode.left !== null) {
          tampNode = tampNode.left;
        }
        node.data = tampNode.data;
        node.right = removeNode(node.left, data);
        return node;
      } else if (data < node.data) return node.left = removeNode(node.left, data)
      else return node.right = removeNode(node.right, data)
    }

    this.root = removeNode(this.root, data)
  }
}

const bst = new BST();
bst.add(4)
bst.add(1)
bst.add(2)
bst.add(3)
bst.add(5)
bst.add(6)
bst.add(9)
bst.add(3)
bst.remove(4)
console.log(bst.findMin())
console.log(bst.findMax())
console.log(bst.isPresent(4))