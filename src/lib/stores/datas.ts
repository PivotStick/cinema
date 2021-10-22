import type { MovieAd } from "src/@types/MovieAd";
import type { Poster } from "src/@types/Poster";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

const makeDatas = <T>(key: string, initial: T): Writable<T> => {
  const persist = localStorage.getItem(key);
  const data = persist ? JSON.parse(persist) : initial;

  const store = writable(data, () =>
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    })
  );

  return store;
};

export const datas = makeDatas("datas", {
  week: 42,
  code: 70,
  city: "MONTPELLIER",
  circuit: "CGR",
  name: "MEGA CGR LATTES",
  date: new Date().toLocaleDateString().split("/").reverse().join("-"),

  dico: {
    titles: [],
  },

  posters: [] as Poster[],
  movieAds: [] as MovieAd[],

  currentTab: "Affiches",
});
