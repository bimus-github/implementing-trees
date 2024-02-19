import React from "react";
import { createRoot } from "react-dom/client";
import { searchByProps, setData } from "./renderer";
import { BTreeWithObject } from "./classes/BTreeWithObject";

const tree = new BTreeWithObject(3);

const App = () => {
  const [value, setValue] = React.useState<string>("");
  const [searchByName, setSearchByName] = React.useState<string>("");

  const handleSave = async () => {
    // tree.insert({
    //   id: Math.random().toString(),
    //   name: value,
    //   code: Math.random().toString(),
    // });

    // console.log(JSON.stringify(tree));

    setData({
      id: Math.random().toString(),
      name: value,
      code: Math.random().toString(),
    });
  };

  const handleSearchByName = async () => {
    const data = await searchByProps("name", searchByName);
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSave}>Add to tree</button>
      <input
        type="text"
        placeholder="Enter number"
        value={searchByName}
        onChange={(e) => setSearchByName(e.target.value)}
      />
      <button onClick={handleSearchByName}>SearchByName</button>
      {/* {dataArray?.map((item, index) => (
        <div key={index}>{item}</div>
      ))} */}
    </div>
  );
};

const root = createRoot(document.getElementById("main"));
root.render(<App />);
