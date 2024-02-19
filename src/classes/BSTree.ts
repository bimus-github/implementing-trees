// import { Data_Type } from "../models";

// class Node implements Data_Type {
//   value: number;
//   right: Node | null;
//   left: Node | null;
//   constructor(value: number) {
//     this.value = value;
//     this.right = null;
//     this.left = null;
//   }
// }

// class BinarySearchTree {
//   root: Node | null;
//   constructor() {
//     this.root = null;
//   }

//   insert(value: number) {
//     const newNode = new Node(value);
//     if (this.root === null) {
//       this.root = newNode;
//     } else {
//       this.insertNode(this.root, newNode);
//     }
//   }

//   insertNode(node: Node, newNode: Node) {
//     if (newNode.value < node.value) {
//       if (node.left === null) {
//         node.left = newNode;
//       } else {
//         this.insertNode(node.left, newNode);
//       }
//     } else {
//       if (node.right === null) {
//         node.right = newNode;
//       } else {
//         this.insertNode(node.right, newNode);
//       }
//     }
//   }

//   getData() {
//     return this.root;
//   }

//   getDataAsArray() {
//     const data: number[] = [];
//     this.getDataAsArrayHelper(this.root, data);
//     return data;
//   }

//   getDataAsArrayHelper(node: Node | null, data: number[]) {
//     if (node !== null) {
//       this.getDataAsArrayHelper(node.left, data);
//       data.push(node.value);
//       this.getDataAsArrayHelper(node.right, data);
//     }
//   }
// }

// export default BinarySearchTree;
