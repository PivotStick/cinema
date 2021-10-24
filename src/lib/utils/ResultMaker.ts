import type { Datas } from "@stores";
import type { Sheet } from "./Sheet";
import XLSX, { WorkBook } from "xlsx";

export class ResultMaker {
  wb: WorkBook;

  constructor(public filename: string, public $datas: Datas) {
    this.wb = XLSX.utils.book_new();
    this.wb.Props = { CreatedDate: new Date() };
  }

  setSheet(sheet: Sheet) {
    sheet.build(this.$datas);
    this.wb.SheetNames.push(sheet.name);
    this.wb.Sheets[sheet.name] = sheet.format(
      XLSX.utils.aoa_to_sheet(sheet.rows)
    );
  }

  s2ab(s: string) {
    let buffer = new ArrayBuffer(s.length); //convert s to arrayBuffer
    let view = new Uint8Array(buffer); //create uint8array as viewer
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
    return buffer;
  }

  download() {
    const wbout = XLSX.write(this.wb, { bookType: "xlsx", type: "binary" });
    const blob = new Blob([this.s2ab(wbout)], {
      type: "application/octet-stream",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = this.filename + ".xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
}
