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
    const posters = $datas.posters.map((poster) => [
      $datas.week,
      $datas.code,
      $datas.city,
      $datas.circuit,
      $datas.name,
      poster.title,
      poster.location,
      poster.format,
    ]);
    this.rows.push(...posters);
  }

  format(ws: WorkSheet) {
    ws["!cols"] = [
      { width: 10 },
      { width: 10 },
      { width: 14 },
      { width: 16 },
      { width: 25 },
      { width: 17 },
      { width: 17 },
      { width: 13 },
    ];

    return ws;
  }
}
