<script lang="ts">
  import type { TabsContext } from "src/@types/TabsContext";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let current: string = null;

  let tabs = [];
  let _current = writable(current);

  const set = (name: string) => {
    tabs = [...tabs, name];
  };

  const remove = (name: string) => {
    tabs = tabs.filter((tab) => tab !== name);
  };

  setContext<TabsContext>("tabs", {
    set,
    remove,
    current: _current,
  });

  $: index = tabs.indexOf(current);
  $: percent = (index / tabs.length) * 100;

  $: $_current = current;
</script>

<svelte:head>
  <title>Cinema - {current}</title>
</svelte:head>

<ul>
  <div style="width: {(1 / tabs.length) * 100}%; left: {percent}%;" />
  {#each tabs as tab}
    <li class:current={current === tab} on:click={() => (current = tab)}>
      <span>{tab}</span>
    </li>
  {/each}
</ul>
<main>
  <slot />
</main>

<style lang="scss">
  ul {
    position: relative;
    display: flex;
  }

  div {
    position: absolute;
    bottom: 0;

    height: 0.25em;
    background-color: #333;
    transition-property: left;
    border-radius: 1em 1em 0 0;
    transform: scaleX(0.9);
  }

  li {
    cursor: pointer;

    flex: 1;
    text-align: center;
    padding: 1em;

    border-bottom: 1px solid currentColor;
    border-radius: 1em 1em 0 0;
    color: #ddd;

    transition-property: background-color, color, font-weight;

    span {
      display: block;
      transition-property: transform;
    }

    &:hover {
      background-color: #eee;
      color: #666;
      span {
        transform: scale(1.2);
      }
    }

    &:active span {
      transform: scale(0.9);
    }

    &.current {
      color: #333;
      font-weight: 900;
    }
  }

  main {
    padding: 2.5vw;
  }
</style>
