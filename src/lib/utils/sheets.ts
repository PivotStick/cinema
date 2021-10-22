import type { MovieAd } from "src/@types/MovieAd";
import type { Poster } from "src/@types/Poster";
import { Sheet } from "./Sheet";

export const posters = new Sheet<Poster>("AFFICHES", [
  "SEMAINE",
  "CODE ENQ.",
  "VILLE",
  "CIRCUIT",
  "COMPLEXE",
  "AFFICHE FILM",
  "POSITIONNEMENT",
  "FORMAT",
]);

export const movieAds = new Sheet<MovieAd>("FA", [
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

export const led = new Sheet("LED", []);
export const remarks = new Sheet("REMARQUES", []);
