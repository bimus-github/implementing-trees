// import { B_Tree_Type } from "../models";

// class NodeTree implements B_Tree_Type {
//   leaf: boolean;
//   keys: number[];
//   children: NodeTree[];

//   constructor(leaf = false) {
//     this.leaf = leaf;
//     this.keys = [];
//     this.children = [];
//   }
// }

// export class BTree {
//   root: NodeTree;
//   t: number;

//   constructor(t: number) {
//     this.root = new NodeTree(true);
//     this.t = t;
//   }

//   insert(key: number): void {
//     const root = this.root;
//     if (root.keys.length === 2 * this.t - 1) {
//       const new_root = new NodeTree();
//       new_root.children.push(root);
//       this.split_child(new_root, 0);
//       this.root = new_root;
//       this.insert_nonfull(new_root, key);
//     } else {
//       this.insert_nonfull(root, key);
//     }
//   }

//   insert_nonfull(root: NodeTree, key: number): void {
//     let i = root.keys.length - 1;
//     if (root.leaf) {
//       while (i >= 0 && root.keys[i] > key) {
//         root.keys[i + 1] = root.keys[i];
//         i--;
//       }
//       root.keys[i + 1] = key;
//     } else {
//       while (i >= 0 && root.keys[i] > key) {
//         i--;
//       }
//       i++;
//       if (root.children[i].keys.length === 2 * this.t - 1) {
//         this.split_child(root, i);
//         if (root.keys[i] < key) {
//           i++;
//         }
//       }
//       this.insert_nonfull(root.children[i], key);
//     }
//   }

//   split_child(parent: NodeTree, i: number): void {
//     const t = this.t;
//     const child = parent.children[i];
//     const new_child = new NodeTree(child.leaf);

//     parent.keys.splice(i, 0, child.keys[t - 1]);
//     parent.children.splice(i + 1, 0, new_child);

//     new_child.keys = child.keys.splice(t, t - 1);

//     if (!child.leaf) {
//       new_child.children = child.children.splice(t, t);
//     }
//   }

//   search(key: number): boolean {
//     let root = this.root;
//     while (!root.leaf) {
//       let i = 0;
//       while (i < root.keys.length && root.keys[i] < key) {
//         i++;
//       }
//       root = root.children[i];
//     }
//     for (let i = 0; i < root.keys.length; i++) {
//       if (root.keys[i] === key) {
//         return true;
//       }
//     }
//     return false;
//   }

//   async getDataAsArray(): Promise<number[]> {
//     const data: number[] = [];
//     await this.getDataAsArrayHelper(this.root, data);
//     return data;
//   }

//   async getDataAsArrayHelper(node: NodeTree, data: number[]) {
//     if (!node) return;
//     if (!node.leaf) {
//       for (let i = 0; i < node.keys.length; i++) {
//         await this.getDataAsArrayHelper(node.children[i], data);
//         data.push(node.keys[i]);
//       }
//       await this.getDataAsArrayHelper(node.children[node.keys.length], data);
//     } else {
//       for (let i = 0; i < node.keys.length; i++) {
//         data.push(node.keys[i]);
//       }
//     }
//   }

//   clear() {
//     this.root = new NodeTree(true);
//     this.t = 4;
//   }
// }
