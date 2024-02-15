export type Data_Type = {
  value: number;
  right: Data_Type | null;
  left: Data_Type | null;
};

export type Red_Black_Tree = {
  data: number;
  left: Red_Black_Tree | null;
  right: Red_Black_Tree | null;
  parent: Red_Black_Tree | null;
  color: 0 | 1;
};

export type B_Tree_Type = {
  children: B_Tree_Type[];
  keys: number[];
  leaf: boolean;
};
