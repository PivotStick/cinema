export class Sheet<T> {
  public rows: string[][] = [];
  public setter: (item: T, index: number) => any[][] = () => [];

  constructor(public name: string, columns: string[]) {
    this.rows.push(columns);
  }

  set items(values: T[]) {
    this.clear();
    values.forEach((value, index) => {
      const row = this.setter(value, index);
      this.rows.push(...row);
    });
  }

  clear() {
    this.rows = this.rows.slice(0, 1);
  }
}
