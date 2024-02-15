import { Red_Black_Tree } from "../models";

class Node implements Red_Black_Tree {
  data: number;
  left: Node | null;
  right: Node | null;
  parent: Node | null;
  color: 0 | 1;

  constructor(data: number, color: 0 | 1) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = color;
  }
}

export class RedBlackTree {
  root: Node | null;
  constructor() {
    this.root = null;
  }

  add(data: number) {
    const newNode = new Node(data, 1); // New nodes are always red
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
    this.fixTree(newNode);
  }

  insertNode(root: Node, newNode: Node) {
    if (newNode.data < root.data) {
      if (root.left === null) {
        root.left = newNode;
        newNode.parent = root;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
        newNode.parent = root;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  fixTree(node: Node) {
    let parentNode;
    let grandParentNode;
    let uncleNode;
    while (node !== this.root && node.parent && node.parent.color === 1) {
      parentNode = node.parent;
      grandParentNode = node.parent.parent;

      if (!grandParentNode) {
        break; // Stop if there is no grandparent
      }

      // Case A: Parent is left child of grandparent
      if (parentNode === grandParentNode.left) {
        uncleNode = grandParentNode.right;
        // Case 1: Uncle is also red, only recoloring needed
        if (uncleNode && uncleNode.color === 1) {
          grandParentNode.color = 1;
          parentNode.color = 0;
          uncleNode.color = 0;
          node = grandParentNode;
        } else {
          // Case 2: Node is right child, left rotation needed
          if (node === parentNode.right) {
            node = parentNode;
            this.rotateLeft(node);
          }
          // Case 3: Node is left child, right rotation needed
          node.parent && (node.parent.color = 0);
          grandParentNode.color = 1;
          this.rotateRight(grandParentNode);
        }
      } else {
        // Case B: Parent is right child of grandparent
        uncleNode = grandParentNode.left;
        // Case 1: Uncle is also red, only recoloring needed
        if (uncleNode && uncleNode.color === 1) {
          grandParentNode.color = 1;
          parentNode.color = 0;
          uncleNode.color = 0;
          node = grandParentNode;
        } else {
          // Case 2: Node is left child, right rotation needed
          if (node === parentNode.left) {
            node = parentNode;
            this.rotateRight(node);
          }
          // Case 3: Node is right child, left rotation needed
          node.parent && (node.parent.color = 0);
          grandParentNode.color = 1;
          this.rotateLeft(grandParentNode);
        }
      }
    }
    this.root && (this.root.color = 0); // Root must always be black
  }

  rotateLeft(node: Node) {
    const rightChild = node.right;
    node.right = rightChild!.left;
    if (rightChild!.left !== null) {
      rightChild!.left.parent = node;
    }
    rightChild!.parent = node.parent;
    if (node.parent === null) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    rightChild!.left = node;
    node.parent = rightChild;
  }

  rotateRight(node: Node) {
    const leftChild = node.left;
    node.left = leftChild!.right;
    if (leftChild!.right !== null) {
      leftChild!.right.parent = node;
    }
    leftChild!.parent = node.parent;
    if (node.parent === null) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    leftChild!.right = node;
    node.parent = leftChild;
  }

  getData() {
    return this.root;
  }

  getArray() {
    const data: number[] = [];
    this.getDataAsArrayHelper(this.root, data);
    return data;
  }

  getDataAsArrayHelper(node: Node | null, data: number[]) {
    if (node !== null) {
      this.getDataAsArrayHelper(node.left, data);
      data.push(node.data);
      this.getDataAsArrayHelper(node.right, data);
    }
  }

  serializeNode(node: Node | null): SerializedNode | null {
    if (node === null) {
      return null;
    }

    return {
      data: node.data,
      color: node.color,
      left: this.serializeNode(node.left),
      right: this.serializeNode(node.right),
      parent: node.parent ? node.parent.data : null,
      leftChildData: node.left ? node.left.data : null,
      rightChildData: node.right ? node.right.data : null,
    };
  }
}

interface SerializedNode {
  data: number;
  color: 0 | 1;
  left: SerializedNode | null;
  right: SerializedNode | null;
  parent: number | null;
  leftChildData: number | null;
  rightChildData: number | null;
}
