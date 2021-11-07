<script>
  import { datas } from "@stores";
  import { scale } from "svelte/transition";
  import { v4 } from "uuid";
  import Dico from "../components/Dico.svelte";
  import Ad from "../components/Ad.svelte";
  import Input from "../components/Input.svelte";

  let query = "";
  let type = "PUB";
  let limit = 50;

  const add = () => {
    $datas.dico.titles = [
      {
        _id: v4(),
        name: query,
        type,
      },
      ...$datas.dico.titles,
    ];
    query = "";
  };

  const remove = (_id) => {
    $datas.dico.titles = $datas.dico.titles.filter((t) => t._id !== _id);
    query = "";
  };

  const upper = (e) => (e.target.value = e.target.value.toUpperCase());

  $: results = $datas.dico.titles
    .filter((title) => new RegExp(query, "gi").test(title.name))
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

{#if !results.length && query}
  <button class="add" transition:scale on:click={add}>
    Ajouter "{query}" au dico
  </button>
{/if}

<ul>
  {#each results as title (title._id)}
    <li>
      <input
        type="text"
        on:input={upper}
        bind:value={$datas.dico.titles[$datas.dico.titles.indexOf(title)].name}
      />
      <input
        type="text"
        on:input={upper}
        bind:value={$datas.dico.titles[$datas.dico.titles.indexOf(title)].type}
      />
      <button on:click={() => remove(title._id)}>✖︎</button>
    </li>
  {/each}
</ul>

<button style="width: 100%" on:click={datas.reset}>tout réinitialiser</button>

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

      &:last-of-type {
        width: 25%;
      }
    }

    button {
      margin: 0.5em;
      margin-left: 0;
    }
  }
</style>
