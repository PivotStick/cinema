import type { Datas } from "@stores";
import type { WorkSheet } from "xlsx";
import { Sheet } from "./Sheet";

export class Posters extends Sheet {
  wchs = [];

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

  setHighestWidth(index, value) {
    const count = `${value}`.length;
    this.wchs[index] =
      (this.wchs[index] || 0) < count ? count : this.wchs[index];

    return value;
  }

  build($datas: Datas) {
    const posters = $datas.posters.map((poster) => [
      this.setHighestWidth(0, $datas.week),
      this.setHighestWidth(1, $datas.code),
      this.setHighestWidth(2, $datas.city),
      this.setHighestWidth(3, $datas.circuit),
      this.setHighestWidth(4, $datas.name),
      this.setHighestWidth(5, poster.title),
      this.setHighestWidth(6, poster.location),
      this.setHighestWidth(7, poster.format),
    ]);
    this.rows.push(...posters);
  }

  format(ws: WorkSheet) {
    ws["!cols"] = this.wchs.map((wch) => ({ wch }));

    return ws;
  }
}
