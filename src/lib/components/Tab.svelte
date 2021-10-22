<script lang="ts">
  import type { TabsContext } from "src/@types/TabsContext";
  import { getContext, onDestroy } from "svelte";

  export let name: string;

  const { set, remove, current } = getContext<TabsContext>("tabs");

  $: {
    remove(name);
    set(name);
  }

  onDestroy(() => remove(name));
</script>

{#if $current === name}
  <slot />
{/if}
