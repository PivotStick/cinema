<script lang="ts">
  import { datas } from "@stores";
  import { ResultMaker } from "../utils/ResultMaker";
  import { led, movieAds, posters, remarks } from "../utils/sheets";
  import Dico from "./Dico.svelte";
  import Input from "./Input.svelte";

  const generateAndDownload = () => {
    const result = new ResultMaker(`cinema - ${$datas.date}`);

    posters.setter = (poster) => [
      [
        $datas.week,
        $datas.code,
        $datas.city,
        $datas.circuit,
        $datas.name,
        poster.title,
        poster.location,
        poster.format,
      ],
    ];

    movieAds.setter = (group) =>
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
        ad.content,
        i + 1,
        group.duration,
        $datas.date.split("-").reverse().join("/"),
        group.time.replace(":", "H"),
      ]);

    result.setSheet(posters, $datas.posters);
    result.setSheet(movieAds, $datas.movieAds);
    result.setSheet(led, []);
    result.setSheet(remarks, []);

    result.download();
  };
</script>

<header>
  <button on:click={generateAndDownload}>Télécharger</button>
  <Input type="number" bind:value={$datas.code} placeholder="Code Enquêteur" />
  <Input type="number" bind:value={$datas.week} placeholder="Semaine" />
  <Input type="date" bind:value={$datas.date} placeholder="Date" />
  <Input bind:value={$datas.city} placeholder="Ville" />
  <Input bind:value={$datas.circuit} placeholder="Circuit" />
  <Input bind:value={$datas.name} placeholder="Complexe" />
  <div class="dico">
    <Dico />
  </div>
</header>

<style>
  header {
    padding: 1em;
    display: grid;
    gap: 1em;

    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }

  .dico,
  button {
    grid-column: 1 / -1;
  }
</style>
