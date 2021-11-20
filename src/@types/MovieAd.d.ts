import type { Ad } from "./Ad";

export type MovieAd = {
  room: number;
  expanded: boolean;
  film: string;
  dimension: typeof dimensions[number];
  date: string;
  time: string;
  duration: number;
  ads: Ad[];
};
