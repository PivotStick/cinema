<script>
  import { datas } from "@stores";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { v4 } from "uuid";
  import Dico from "../components/Dico.svelte";
  import Input from "../components/Input.svelte";
  import Modal from "../components/Modal.svelte";
  import { downloadFile } from "../functions/downloadFile";

  let query = "";
  let type = "PUB";
  let limit = 50;
  let editingGroup = false;

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

  const setGroup = (_id, value) => {
    const index = $datas.dico.titles.findIndex((t) => t._id === _id);
    if (index >= 0) $datas.dico.titles[index].group = value;
  };

  const download = () => {
    const blob = new Blob([JSON.stringify($datas.dico)], {
      type: "application/json",
    });
    downloadFile(blob, "dico.json");
  };

  $: results = $datas.dico.titles
    .filter((title) => new RegExp(query, "gi").test(title.name))
    .slice(0, limit);

  $: query = query.toUpperCase();
</script>

<button class="download" on:click={download}>Télécharger le dico</button>
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
  on:keydown={(e) => e.key === "Enter" && add()}
/>

{#if !results.length && query}
  <button class="add" transition:scale on:click={add}>
    Ajouter "{query}" au dico
  </button>
{/if}

<ul>
  {#each results as title (title._id)}
    <li>
      <div class="group">
        {#if title.group}
          <div
            class="toggle"
            on:mousedown={(e) => {
              e.preventDefault();
              title.group = undefined;
            }}
          >
            ✖
          </div>
          <input
            type="text"
            on:input={upper}
            bind:value={title.group.suffix}
            placeholder="Suffix"
            name="suffix"
          />
          <input
            type="text"
            on:input={upper}
            bind:value={title.group.start}
            placeholder="Nom début"
          />
          <input
            type="text"
            on:input={upper}
            bind:value={title.group.end}
            placeholder="Nom fin"
          />
        {:else}
          <div
            class="toggle"
            on:mousedown={(e) => {
              e.preventDefault();
              title.group = {
                start: `DEBUT ${title.name}`,
                end: `FIN ${title.name}`,
                suffix: "PUB",
              };
            }}
          >
            +
          </div>
        {/if}
      </div>
      <input
        type="text"
        on:input={upper}
        bind:value={$datas.dico.titles[$datas.dico.titles.indexOf(title)].name}
      />
      <input
        type="text"
        class="type"
        on:input={upper}
        bind:value={$datas.dico.titles[$datas.dico.titles.indexOf(title)].type}
      />
      <button on:click={() => remove(title._id)}>✖︎</button>
    </li>
  {/each}
</ul>

<button style="width: 100%; margin-top: 1em;" on:click={datas.reset}
  >tout réinitialiser</button
>

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
    grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
    gap: 1em;
  }

  .add {
    width: 100%;
  }

  li {
    position: relative;
    display: flex;
    border: 1px solid currentColor;
    border-radius: 1em;
    transition-property: color;
    color: #aaa;

    &:focus-within {
      color: rgb(var(--primary));

      .group {
        display: block;
      }
    }

    input {
      padding: 1em;
      border-radius: inherit;
      width: 100%;
      border: none;
      font: inherit;
      color: inherit;
      outline: none;

      &.type {
        width: 50%;
        text-align: end;
      }
    }

    button {
      margin: 0.5em;
      margin-left: 0;
    }
  }

  .group {
    overflow: hidden;
    position: absolute;
    display: none;

    right: 1em;
    left: 1em;
    bottom: 100%;
    background-color: white;
    border: 1px solid currentColor;
    border-radius: 0.5em 0.5em 0 0;

    animation: slide-in 600ms cubic-bezier(0, 0.5, 0, 1);

    .toggle {
      cursor: pointer;
      display: flex;
      padding: 0.5em 1em;
      justify-content: center;
      align-items: center;

      transition-property: background-color;

      &:hover {
        background-color: rgba(var(--primary), 0.15);
      }
    }

    & > input {
      text-align: center;
      width: 100%;
    }
  }

  .download {
    width: 100%;
    margin-bottom: 1em;
  }

  @keyframes slide-in {
    from {
      overflow: hidden;
      max-height: 0;
    }

    to {
      overflow: hidden;
      max-height: 12.5em;
    }
  }
</style>
