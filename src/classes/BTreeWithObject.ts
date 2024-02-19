import { Data_Type, Node_Type } from "../models";

class NodeTree implements Node_Type {
  data: Data_Type[];
  leaf: boolean;
  children: Node_Type[];
  constructor(leaf = false) {
    this.leaf = leaf;
    this.children = [];
    this.data = [];
  }
}

export class BTreeWithObject {
  root: Node_Type;
  t: number;

  constructor(t: number) {
    this.root = new NodeTree(true);
    this.t = t;
  }

  insert(data: Data_Type): void {
    const root = this.root;

    if (root.data.length === 2 * this.t - 1) {
      const new_root = new NodeTree();
      new_root.children.push(root);
      this.split_child(new_root, 0);
      this.root = new_root;
      this.insert_nonfull(new_root, data);
    } else {
      this.insert_nonfull(root, data);
    }
  }

  insert_nonfull(root: Node_Type, data: Data_Type): void {
    let i = root.data.length - 1;
    if (root.leaf) {
      while (
        i >= 0 &&
        Object.entries(root.data[i]).every(([key, value]) => {
          return (
            value.replaceAll(" ", "") >
            data[key as keyof Data_Type].replaceAll(" ", "")
          );
        })
      ) {
        root.data[i + 1] = root.data[i];
        i--;
      }
      root.data[i + 1] = data;
    } else {
      while (
        i >= 0 &&
        Object.entries(root.data[i]).every(([key, value]) => {
          return (
            value.replaceAll(" ", "") >
            data[key as keyof Data_Type].replaceAll(" ", "")
          );
        })
      ) {
        i--;
      }
      // i++;
      if (root.children[i].data.length === 2 * this.t - 1) {
        this.split_child(root, i);
        if (
          Object.entries(root.data[i]).every(([key, value]) => {
            return (
              value.replaceAll(" ", "") <
              data[key as keyof Data_Type].replaceAll(" ", "")
            );
          })
        ) {
          i++;
        }
      }
      this.insert_nonfull(root.children[i], data);
    }
  }

  split_child(parent: Node_Type, index: number): void {
    const t = this.t;
    const childToSplit = parent.children[index];
    const newChild = new NodeTree(childToSplit.leaf);

    parent.data.splice(index, 0, childToSplit.data[t - 1]);
    parent.children.splice(index + 1, 0, newChild);

    newChild.data = childToSplit.data.splice(t, t - 1);

    if (!childToSplit.leaf) {
      newChild.children = childToSplit.children.splice(t, t);
    }
  }

  searchByProps(key: keyof Data_Type, value: string): Data_Type[] | false {
    let root = this.root;
    const results: Data_Type[] = [];
    while (!root.leaf) {
      let i = 0;
      while (
        i < root.data.length &&
        root.data[i][key].replaceAll(" ", "") < value.replaceAll(" ", "")
      ) {
        i++;
      }
      root = root.children[i];
    }

    for (let i = 0; i < root.data.length; i++) {
      if (root.data[i][key] === value) {
        results.push(root.data[i]);
      }
    }
    return results.length ? results : false;
  }
}
