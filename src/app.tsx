import React from "react";
import { createRoot } from "react-dom/client";
import { getData, setData } from "./renderer";

const App = () => {
  const [dataArray, setDataArray] = React.useState<number[]>();
  const [value, setValue] = React.useState<number>(0);
  const [search, setSearch] = React.useState<number>(0);

  React.useEffect(() => {
    getData().then((data) => {
      setDataArray(data);
    });
  }, []);

  const handleSave = async () => {
    for (let i = 0; i < value; i++) {
      await setData(i);
    }

    getData().then((data) => {
      setDataArray(data);
    });
  };

  const handleSearch = async () => {
    const data = await getData();
    if (data.includes(search)) {
      console.log("data includes search");
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <button onClick={handleSave}>Add to tree</button>
      <input
        type="number"
        placeholder="Enter number"
        value={search}
        onChange={(e) => setSearch(Number(e.target.value))}
      />
      <button onClick={handleSearch}>Search</button>
      {dataArray?.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

const root = createRoot(document.getElementById("main"));
root.render(<App />);
