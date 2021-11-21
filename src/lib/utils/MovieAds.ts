import type { Datas } from "@stores";
import { Sheet } from "./Sheet";

export class MovieAds extends Sheet {
  constructor() {
    super("FA");
    this.rows.push([
      "N°SEMAINE",
      "CODE ENQ.",
      "VILLE",
      "CIRCUIT",
      "COMPLEXE",
      "N° DE SALLE",
      "SEANCE/FILM",
      "2D/3D",
      "AVANT SEANCE",
      "CONTENU",
      "ORDRE",
      "DUREE AVANT SEANCE",
      "DATE",
      "HORAIRE",
    ]);
  }

  build($datas: Datas) {
    const movieAds = $datas.movieAds.flatMap((group) => {
      const flatten = group.ads.reduce((a, c) => {
        if (c.group) {
          a.push(
            { name: c.start, type: c.type },
            ...c.group.map(({ ...g }) => {
              if (g.name !== c.suffix) g.name += ` ${c.suffix}`;

              return g;
            }),
            { name: c.end, type: c.type }
          );
        } else a.push(c);

        return a;
      }, []);

      return flatten.map((ad, i) =>
        [
          $datas.week,
          $datas.code,
          $datas.city,
          $datas.circuit,
          $datas.name,
          group.room,
          group.film,
          group.dimension,
          ad.name,
          ad.type,
          i + 1,
          group.duration,
          group.date.split("-").reverse().join("/"),
          group.time.replace(":", "H"),
        ].map((v, i) => this.count(v, i))
      );
    });
    this.rows.push(...movieAds);
  }
}
