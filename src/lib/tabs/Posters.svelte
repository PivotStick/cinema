<script>
  import { slide } from "svelte/transition";
  import { datas } from "@stores";
  import Input from "../components/Input.svelte";
  import FilmTitle from "../components/FilmTitle.svelte";

  let locations = ["INT HALL", "INT COUL"];
  let formats = ["120x160", "PLV CLASSIQUE", "PLV SPECIALE"];

  let uuid = $datas.posters.length;

  const add = () => {
    $datas.posters = [
      ...$datas.posters,
      {
        _id: uuid++,
        title: "",
        location: locations[0],
        format: formats[0],
      },
    ];
  };

  const remove = (poster) => {
    $datas.posters = $datas.posters.filter((p) => p !== poster);
  };

  if (!$datas.posters.length) add();
</script>

<ul>
  {#each $datas.posters as poster, i (poster._id)}
    <li out:slide|local>
      <FilmTitle bind:value={poster.title} />
      <Input
        bind:value={poster.location}
        type="search"
        placeholder="Positionnement"
        search={locations}
        nofilter
      />
      <Input
        bind:value={poster.format}
        on:next={i === $datas.posters.length - 1 && add}
        type="search"
        placeholder="Format"
        search={formats}
        nofilter
      />
      <button tabindex="-1" disabled={!i} on:click={() => remove(poster)}
        >✖︎</button
      >
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    display: flex;
    flex-direction: column;
    gap: 1em;

    padding-bottom: 25vh;
  }

  li {
    display: flex;
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
</style>
