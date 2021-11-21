import type { Ad } from "./Ad";

type AdGroup = Omit<Ad, "group"> &
  Ad["group"] & {
    group?: Ad[];
  };

export type MovieAd = {
  room: number;
  expanded: boolean;
  film: string;
  dimension: typeof dimensions[number];
  date: string;
  time: string;
  duration: number;
  ads: AdGroup[];
};
