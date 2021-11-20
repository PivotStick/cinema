<script>
  import { datas } from "@stores";
  import { v4 } from "uuid";
  import { slide } from "svelte/transition";
  import Input from "../components/Input.svelte";
  import FilmTitle from "../components/FilmTitle.svelte";

  /**
   * @type {HTMLInputElement}
   */
  let input;
  let locations = ["INT HALL", "INT COUL"];
  let formats = ["120x160", "PLV CLASSIQUE", "PLV SPECIALE"];

  let poster = {
    title: "",
    format: formats[0],
    location: locations[0],
  };

  const add = () => {
    $datas.posters = [
      ...$datas.posters,
      {
        _id: v4(),
        ...poster,
      },
    ];
    poster.title = "";
    input.scrollIntoView({ behavior: "smooth" });
    input.focus();
  };

  const remove = (poster) => {
    $datas.posters = $datas.posters.filter((p) => p !== poster);
  };

  const reset = () => {
    $datas.posters = [];
  };
</script>

<ul>
  {#each $datas.posters as p, i (p._id)}
    <li transition:slide|local>
      <FilmTitle bind:value={p.title} />
      <Input
        bind:value={p.location}
        type="search"
        placeholder="Positionnement"
        search={locations}
        nofilter
      />
      <Input
        bind:value={p.format}
        on:next={i === $datas.posters.length - 1 && add}
        type="search"
        placeholder="Format"
        search={formats}
        nofilter
      />
      <button tabindex="-1" on:click={() => remove(p)}>✖︎</button>
    </li>
  {/each}
  <form on:submit|preventDefault={add}>
    <FilmTitle bind:value={poster.title} bind:input noBlur />
    <Input
      bind:value={poster.location}
      type="search"
      placeholder="Positionnement"
      search={locations}
      nofilter
    />
    <Input
      bind:value={poster.format}
      type="search"
      placeholder="Format"
      search={formats}
      nofilter
    />
    <button type="submit">Ajouter</button>
  </form>
  <button on:click={reset}>Réinitialiser</button>
</ul>

<style lang="scss">
  ul {
    display: flex;
    flex-direction: column;

    padding-bottom: 25vh;
  }

  form,
  li {
    display: flex;
    margin: 1em 0;
    gap: 1em;

    & > :global(*) {
      flex: 1;

      &:first-child {
        flex: 2;
      }
    }

    button {
      flex: 0 0 auto;
      align-self: center;
    }
  }

  form {
    border-top: 1px solid #aaa;
    margin-top: 2.5em;
    padding-top: 1.5em;
  }
</style>
