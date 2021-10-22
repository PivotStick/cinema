import type { Writable } from "svelte/store";

export type TabsContext = {
  set: (name: string) => void;
  remove: (name: string) => void;
  current: Writable<string>;
};
