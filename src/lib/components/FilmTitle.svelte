<script>
  import { datas } from "@stores";

  import Input from "./Input.svelte";
  import SearchOrAdd from "./SearchOrAdd.svelte";

  export let placeholder = "Titre du Film";
  export let value = "";
  /**
   * @type {HTMLInputElement}
   */
  export let input = undefined;

  $: value = value?.toString()?.toUpperCase();
</script>

<Input
  bind:value
  bind:input
  type="search"
  {placeholder}
  search={$datas.dico.titles.map((t) => t.name)}
  {...$$restProps}
  on:enter
>
  <svelte:fragment slot="search-placeholder">
    <SearchOrAdd {value} />
  </svelte:fragment>
</Input>
