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
    const movieAds = $datas.movieAds.flatMap((group) =>
      group.ads.map((ad, i) => [
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
      ])
    );
    this.rows.push(...movieAds);
  }
}
