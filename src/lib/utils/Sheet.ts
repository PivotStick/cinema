import type { Datas } from "@stores";
import type { WorkSheet } from "xlsx";

export class Sheet {
  public rows: any[] = [];
  public wchs: number[] = [];

  constructor(public name: string) {}

  build($datas: Datas) {}

  count(value, index) {
    const count = `${value}`.length * 1.5;
    this.wchs[index] =
      (this.wchs[index] || 0) < count ? count : this.wchs[index];

    return value;
  }

  format(ws: WorkSheet) {
    ws["!cols"] = this.wchs.map((wch) => ({ wch }));
    return ws;
  }
}
