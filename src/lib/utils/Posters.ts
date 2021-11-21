import type { Datas } from "@stores";
import type { WorkSheet } from "xlsx";
import { Sheet } from "./Sheet";

export class Posters extends Sheet {
  constructor() {
    super("AFFICHES");
    this.rows.push([
      "SEMAINE",
      "CODE ENQ.",
      "VILLE",
      "CIRCUIT",
      "COMPLEXE",
      "AFFICHE FILM",
      "POSITIONNEMENT",
      "FORMAT",
    ]);
  }

  build($datas: Datas) {
    const posters = $datas.posters.map((poster) =>
      [
        $datas.week,
        $datas.code,
        $datas.city,
        $datas.circuit,
        $datas.name,
        poster.title,
        poster.location,
        poster.format,
      ].map((v, i) => this.count(v, i))
    );
    this.rows.push(...posters);
  }
}
