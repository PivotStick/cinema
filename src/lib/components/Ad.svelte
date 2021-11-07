<script>
  import { datas } from "@stores";
  import { createEventDispatcher } from "svelte";
  import SearchOrAdd from "./SearchOrAdd.svelte";

  const dispatch = createEventDispatcher();

  /**
   * @type {HTMLInputElement}
   */
  let input;
  let value = "";
  let index;
  let selected = 0;

  $: index = $datas.dico.titles.findIndex((t) => t.name === value);

  $: filtered = $datas.dico.titles.filter((t) =>
    new RegExp(
      value.replace(/[(){}[\]]/g, "\\$&").replace(/['"]/g, "$&?"),
      "gi"
    ).test(`${t.name}`.replace(/['"]/g, ""))
  );

  /**
   * @param {KeyboardEvent} e
   */
  const enter = (e) => {
    switch (e.key) {
      case "ArrowUp":
        selected--;
        break;

      case "ArrowDown":
        selected++;
        break;

      case "Enter":
        dispatch("submit", filtered[selected]);
        value = "";
        input.focus();
        input.scrollIntoView({ behavior: "smooth" });
        selected = 0;
        break;
    }
  };

  $: selected =
    selected > filtered.length - 1
      ? 0
      : selected < 0
      ? filtered.length - 1
      : selected;

  $: value = value.toUpperCase();
</script>

<label class="container">
  <input bind:this={input} type="text" bind:value on:keydown={enter} />
  {#if index >= 0}
    <input
      type="text"
      bind:value={$datas.dico.titles[index].type}
      on:keydown={enter}
    />
  {:else}
    <input type="text" value="???" disabled />
  {/if}
  <ul>
    {#each filtered as title, i (title._id)}
      <li
        class:selected={i === selected}
        on:mousedown={() => {
          index = $datas.dico.titles.indexOf(title);
          value = title.name;
        }}
      >
        <span>{title.name}</span>
        <span>{title.type}</span>
      </li>
    {:else}
      <li style="justify-content: center;">
        <SearchOrAdd {value} on:added={(e) => (value = e.detail.name)} />
      </li>
    {/each}
  </ul>
</label>

<style lang="scss">
  .container {
    display: block;
    position: relative;

    color: #aaa;
    border: 1px solid currentColor;

    display: flex;
    border-radius: 1.5em;
    gap: 1em;
    outline: 0 solid rgba(var(--primary), 0.25);

    transition: outline-width 50ms linear;

    &:focus-within {
      color: rgb(var(--primary));
      outline-width: 2px;

      ul {
        display: initial;
      }
    }
  }

  input {
    font: inherit;
    color: inherit;
    border: none;
    flex: 1;
    padding: 0.5em 1em;
    outline: none;
    border-radius: inherit;

    &:last-of-type {
      flex: 0.1;
      text-align: end;
    }
  }

  ul {
    display: none;
    position: absolute;
    border: inherit;
    background-color: white;
    top: calc(100% + 0.5em);
    left: 0.5em;
    right: 0.5em;

    max-height: 10em;
    overflow-y: auto;
    z-index: 999;
    border-radius: 1em;
  }

  li {
    cursor: pointer;
    padding: 0.5em 1em;

    display: flex;
    justify-content: space-between;
    font-weight: 700;

    &.selected,
    &:hover {
      background-color: rgb(var(--primary), 0.15);
    }
  }
</style>
