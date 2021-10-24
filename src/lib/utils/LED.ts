import type { Datas } from "@stores";
import type { WorkSheet } from "xlsx";
import { Sheet } from "./Sheet";

export type Block = {
  hall: number;
  hallways?: number;
  outdoors?: number;
  title: string;
  subTitle: string;
  visible: boolean;
  max: number;
  column: number;
  films: string[];
};

export class LED extends Sheet {
  blockWidth = 3;
  margin = 1;

  constructor() {
    super("LED");
  }

  build($datas: Datas) {
    $datas.leds.forEach((led) => {
      this.rows.push(
        [led.title, "nombre dans le hall", led.hall || "-"],
        [, "nombre dans les couloirs", led.hallways || "-"],
        [led.subTitle, "nombre en exterieur", led.outdoors || "-"],
        ...led.films.map((film) => [film])
      );
    });
  }

  format(ws: WorkSheet) {
    ws["!cols"] = [{ width: 50 }, { width: 25 }];

    return ws;
  }
}
