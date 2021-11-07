import type { Ad } from "src/@types/Ad";
import type { MovieAd } from "src/@types/MovieAd";
import type { Poster } from "src/@types/Poster";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import type { Block } from "../utils";

export const initialLeds = [
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
] as Block[];

const initial = {
  week: 42,
  code: 70,
  city: "MONTPELLIER",
  circuit: "CGR",
  name: "MEGA CGR LATTES",

  dico: {
    titles: [] as Ad[],
  },

  groups: [] as { suffix: string; color: string }[],

  posters: [] as Poster[],
  movieAds: [] as MovieAd[],

  leds: initialLeds,

  currentTab: "Affiches",
};

const makeDatas = <T extends typeof initial>(key: string, initial: T) => {
  const persist = localStorage.getItem(key);
  const data: T = persist ? JSON.parse(persist) : initial;

  const store: Writable<T> = writable<T>(data, () =>
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    })
  );

  const reset = () => {
    store.set(JSON.parse(JSON.stringify(initial)));
  };

  return {
    ...store,
    reset,
  };
};

export const datas = makeDatas("datas", initial);

export type Datas = Parameters<typeof datas["set"]>[0];
