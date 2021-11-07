<script>
  import { datas } from "@stores";
  import { scale } from "svelte/transition";
  import Dico from "../components/Dico.svelte";
  import Input from "../components/Input.svelte";

  let query = "";
  let limit = 50;

  const add = () => {
    $datas.dico.titles = [query, ...$datas.dico.titles];
    query = "";
  };

  const remove = (title) => {
    $datas.dico.titles = $datas.dico.titles.filter((t) => t !== title);
    query = "";
  };

  $: results = $datas.dico.titles
    .filter((title) => new RegExp(query, "gi").test(title))
    .slice(0, limit);

  $: query = query.toUpperCase();
</script>

<div class="dico">
  <Dico />
</div>
{#if $datas.dico.titles.length}
  <p class="info">Cliquez sur les titres puis modifiez les...</p>
  <p>{results.length} / {$datas.dico.titles.length} résultats</p>
{:else}
  <p>Votre Dico est vide...</p>
{/if}
<Input
  type="search"
  placeholder="Rechercher ou Ajouter..."
  bind:value={query}
/>

{#if query}
  <button class="add" transition:scale on:click={add}>
    Ajouter "{query}" au dico
  </button>
{/if}

<ul>
  {#each results as title}
    <li>
      <input
        type="text"
        bind:value={$datas.dico.titles[$datas.dico.titles.indexOf(title)]}
      />
      <button on:click={() => remove(title)}>✖︎</button>
    </li>
  {/each}
</ul>

<style lang="scss">
  ul,
  .add {
    margin-top: 1em;
  }

  .dico,
  p {
    margin-bottom: 1em;
  }

  .info {
    font-size: 0.75em;
    color: #aaa;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
    gap: 1em;
  }

  .add {
    width: 100%;
  }

  li {
    display: flex;
    border: 1px solid var(--secondary);
    border-radius: 1em;
    transition-property: border-color;

    &:focus-within {
      border-color: rgb(var(--primary));
    }

    input {
      padding: 1em;
      border-radius: inherit;
      width: 100%;
      border: none;
      font: inherit;
      outline: none;
    }

    button {
      margin: 0.5em;
      margin-left: 0;
    }
  }
</style>
