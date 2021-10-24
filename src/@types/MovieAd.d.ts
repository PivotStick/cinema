export type MovieAd = {
  room: number;
  film: string;
  dimension: typeof dimensions[number];
  date: string;
  time: string;
  duration: number;
  ads: {
    content: typeof contents[number];
    name: string;
  }[];
};
