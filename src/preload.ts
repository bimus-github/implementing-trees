import { contextBridge } from "electron";
import os from "os";
import fs from "fs";
import { BTree } from "./classes/BTree";

const dataPath = `${os.homedir()}/Users/sardorbekaminjonov/Madaminjon/electron-learning/electron-ts/data/data.json`;

let initailData = {} as BTree;
initailData = JSON.parse(fs.readFileSync(dataPath, "utf-8")) as BTree;

contextBridge.exposeInMainWorld("data", {
  setData: async (data: number) => {
    let btree = {} as BTree;

    btree = new BTree(4);

    btree.root = initailData.root;
    btree.t = initailData.t;

    btree.insert(data);

    const asyncFunc = async () => {
      fs.writeFileSync(dataPath, JSON.stringify(btree));
    };

    asyncFunc().then(() => {
      initailData = JSON.parse(fs.readFileSync(dataPath, "utf-8")) as BTree;
    });
  },
  async getData() {
    const data = initailData;
    const tree = new BTree(4);
    tree.root = data.root;
    tree.t = data.t;
    const array = await tree.getDataAsArray();

    return array;
  },
});
