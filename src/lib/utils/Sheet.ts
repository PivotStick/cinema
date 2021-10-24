import type { Datas } from "@stores";
import type { WorkSheet } from "xlsx";

export class Sheet {
  public rows: any[] = [];

  constructor(public name: string) {}

  build($datas: Datas) {}

  format(ws: WorkSheet) {
    return ws;
  }
}
