<script lang="ts">
  import { datas } from "@stores";
  import { ResultMaker, Posters, MovieAds, LED, Remarks } from "../utils";
  import Input from "./Input.svelte";

  const generateAndDownload = () => {
    const result = new ResultMaker(
      `cinema - ${new Date().toLocaleDateString()}`,
      $datas
    );

    result.setSheet(new Posters());
    result.setSheet(new MovieAds());
    result.setSheet(new LED());
    result.setSheet(new Remarks());

    result.download();
  };
</script>

<header>
  <button class="download" on:click={generateAndDownload}>Télécharger</button>
  <Input type="number" bind:value={$datas.code} placeholder="Code Enquêteur" />
  <Input type="number" bind:value={$datas.week} placeholder="Semaine" />
  <Input bind:value={$datas.city} placeholder="Ville" />
  <Input bind:value={$datas.circuit} placeholder="Circuit" />
  <Input bind:value={$datas.name} placeholder="Complexe" />
</header>

<style lang="scss">
  header {
    padding: 1em;
    display: grid;
    gap: 1em;

    grid-template-columns: repeat(auto-fit, minmax(14em, 1fr));
  }

  .download {
    grid-column: 1 / -1;
  }
</style>
