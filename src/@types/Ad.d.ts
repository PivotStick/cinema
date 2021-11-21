export type Ad = {
  _id: string;
  name: string;
  type: string;
  group?: {
    start: string;
    end: string;
    suffix: string;
  };
};
