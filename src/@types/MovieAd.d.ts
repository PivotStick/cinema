export type MovieAd = {
  room: number;
  film: string;
  dimension: typeof dimensions[number];
  time: string;
  duration: number;
  ads: {
    content: typeof contents[number];
    name: string;
  }[];
};
