import type { MovieAd } from "src/@types/MovieAd";
import type { Poster } from "src/@types/Poster";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import type { Block } from "../utils";

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

  dico: {
    titles: [],
  },

  posters: [] as Poster[],
  movieAds: [] as MovieAd[],

  leds: [
    {
      title: "panneaux LEDs isolés",
      subTitle: "Liste des films présents dans la rotation d'affiches fixes:",
      column: 0,
      visible: true,
      films: [],
    },
    {
      title: "blocs 1 de 3 panneaux",
      subTitle:
        "Liste des films présents sur un des 3 panneaux du bloc (5 maximum):",
      column: 1,
      visible: false,
      max: 5,
      films: [, , , ,],
    },
    {
      title: "blocs 2 de 3 panneaux",
      subTitle:
        "Liste des films présents sur un des 3 panneaux du bloc (5 maximum):",
      column: 1,
      max: 5,
      visible: false,
      films: [, , , , ,],
    },
    {
      title: "blocs 3 de 3 panneaux",
      subTitle:
        "Liste des films présents sur un des 3 panneaux du bloc (5 maximum):",
      column: 1,
      max: 5,
      visible: false,
      films: [, , , , ,],
    },
  ] as Block[],

  currentTab: "Affiches",
});

export type Datas = Parameters<typeof datas["set"]>[0];
