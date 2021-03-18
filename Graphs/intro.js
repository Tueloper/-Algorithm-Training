/**
 * Graphs is a data structure composed of a collection of nodes and edges
 * They are non linear data structure
 * Their nodes are referred to as vertices
 * There are 2 types of Graphs: Directed and Undirected Graphs
 * 
 * Directed graphs contain edges which function similarly to a one way street, they have directions are it has a cross sectional relationship
 * Undiretced contains 2 way edges which flow bidirectionally like a 2 way street. The relaionship goes boths was 
 * and is not cross sectional
 * 
 */

class Node {
  constructor(value) {
    this.value = value
    this.edges = []
  }
}

export default class Graph {
  constructor(directed = false) {
    this.undirected = undirected
    this.nodes = []
  }

  addNode(value) {
    this.nodes.push(new Node(value))
  }

  removeNode(value) {
    this.nodes = this.nodes.filter(node => node.value !== value);
    this.nodes.forEach(node => {
      node.edges = node.edges.forEach(edge => edge.value !== value);
    })
  }

  getNode(value) {
    return this.nodes.find(node => node.value === value)
  }

  addEdge(value1, value2) {
    const node1 = this.getNode(value1);
    const node2 = this.getNode(value2);

    node1.edges.push(node2);
    if (this.undirected) node2.edges.push(node1)
  }

  return `An edge between ${node1.value} and ${node2z.value} was added`;
}