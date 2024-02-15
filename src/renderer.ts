import "./app";

interface Data {
  getData: () => Promise<number[]>;
  setData: (value: number) => Promise<void>;
}

declare global {
  interface Window {
    data: Data;
  }
}

const data = window.data;

export const setData = async (value: number) => {
  await data.setData(value);
};

export const getData = async () => {
  const array = await data.getData();

  return array;
};
