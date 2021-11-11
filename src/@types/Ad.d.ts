export type Ad = {
  _id: string;
  name: string;
  type: string;
  group?: {
    suffix: string;
    color: string;
  };
};
