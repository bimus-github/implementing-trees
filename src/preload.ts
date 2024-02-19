import { contextBridge } from "electron";
import os from "os";
import fs from "fs";
import { BTreeWithObject } from "./classes/BTreeWithObject";
import { Data_Type } from "./models";

const dataPath = `${os.homedir()}/Users/sardorbekaminjonov/Madaminjon/electron-learning/electron-ts/data/data.json`;

let initailData = {} as BTreeWithObject;
initailData = JSON.parse(fs.readFileSync(dataPath, "utf-8")) as BTreeWithObject;

contextBridge.exposeInMainWorld("data", {
  setData: async (d: Data_Type) => {
    const tree = new BTreeWithObject(2);

    tree.root = initailData.root;
    tree.t = initailData.t;

    tree.insert(d);

    async function save() {
      const json = JSON.stringify(tree, null, 2);
      fs.writeFileSync(dataPath, json, "utf-8");
    }

    await save().then(() => {
      initailData = JSON.parse(
        fs.readFileSync(dataPath, "utf-8")
      ) as BTreeWithObject;
    });
  },

  searchByProps: async (key: keyof Data_Type, value: string) => {
    const tree = new BTreeWithObject(4);

    tree.root = initailData.root;
    tree.t = initailData.t;

    console.log(tree);

    return tree.searchByProps(key, value);
  },
});
