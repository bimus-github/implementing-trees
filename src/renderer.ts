import "./app";
import { Data_Type } from "./models";

interface Data {
  setData: (d: Data_Type) => Promise<void>;
  searchByProps: (
    key: keyof Data_Type,
    value: string
  ) => Promise<Data_Type | false>;
}

declare global {
  interface Window {
    data: Data;
  }
}

const data = window.data;

export const setData = async (d: Data_Type) => {
  await data.setData(d);
};

export const searchByProps = async (key: keyof Data_Type, value: string) => {
  return await data.searchByProps(key, value);
};
