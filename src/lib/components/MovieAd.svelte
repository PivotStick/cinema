<script context="module">
  export const contents = [
    "PUB",
    "JINGLE",
    "FA",
    "FA PUB",
    "PUB NOIR",
    "FA NOIR",
  ];
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import FilmTitle from "./FilmTitle.svelte";
  import Input from "./Input.svelte";

  const dispatch = createEventDispatcher();

  /**
   * @type {import("src/@types/Ad").Ad | import("src/@types/MovieAd").AdGroup}
   */
  export let ad;
  export let suffix = "";
</script>

<FilmTitle bind:value={ad.name} placeholder="Avant Séance" />
<Input
  bind:value={ad.type}
  placeholder="Contenu"
  type="search"
  search={contents}
  nofilter
/>
{#if suffix}
  <p class:same={suffix === ad.type}>
    {suffix}
  </p>
{/if}
<button tabindex="-1" on:click={() => dispatch("delete")}> ✖︎ </button>

<style lang="scss">
  p {
    &.same {
      text-decoration: line-through;
    }
  }
</style>
