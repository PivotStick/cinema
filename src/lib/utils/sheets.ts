import { MovieAds } from "./MovieAds";
import { Posters } from "./Posters";
import { Sheet } from "./Sheet";

export const posters = new Posters();
export const movieAds = new MovieAds();

export const led = new Sheet("LED");
export const remarks = new Sheet("REMARQUES");
