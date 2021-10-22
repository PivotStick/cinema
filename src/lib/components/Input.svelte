<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let value: string | number = "";
  export let placeholder = "";

  export let search: string[] = null;
  export let nofilter = false;

  let input: HTMLInputElement;
  let focused = false;
  let selection = -1;

  const regex = (v: string | number) => {
    v = `^${v}`;
    v = v.replace(/[()/]/g, "\\$&");
    return new RegExp(v, "gi");
  };

  $: filtered = !nofilter
    ? search?.filter((s) => regex(value).test(s))
    : search;

  $: selection = filtered
    ? Math.max(0, Math.min(selection, filtered.length - 1))
    : -1;

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Tab":
        if (!e.shiftKey) dispatch("next");
      case "Enter":
        if (!filtered) break;
        value = filtered[selection] || value;
        input.blur();
        break;

      case "ArrowDown":
        selection++;
        break;
      case "ArrowUp":
        selection--;
        break;
    }
  };
</script>

<label class={$$restProps.type} class:--empty={!value.toString().trim()}>
  {#if placeholder}
    <p>{placeholder}</p>
  {/if}
  <input
    bind:this={input}
    bind:value
    type="text"
    {...$$restProps}
    on:focus={() => (focused = true)}
    on:blur={() => (focused = false)}
    on:keydown={handleKeyDown}
  />
  {#if search && focused}
    <ul transition:scale>
      {#each filtered as text, i}
        <li
          class:current={selection === i}
          on:mousedown={() => {
            value = text;
            input?.blur();
          }}
        >
          {text}
        </li>
      {:else}
        <li class="placeholder">
          <slot name="search-placeholder">...</slot>
        </li>
      {/each}
    </ul>
  {/if}
</label>

<style lang="scss">
  $focus: rgb(78, 169, 253);

  label {
    cursor: text;
    position: relative;
    display: block;
    border: 1px solid currentColor;
    border-radius: 1em;
    margin-top: 0.5em;
    font-weight: 700;
    color: #ddd;

    transition-property: color;

    &.date,
    &:not(.--empty),
    &:focus-within {
      p {
        top: -0.125em;
      }
    }

    &:focus-within {
      color: $focus;
    }
  }

  ul {
    position: absolute;

    background-color: white;
    max-height: 10em;

    z-index: 2000;

    left: 1em;
    top: calc(100% + 1em);

    border: inherit;
    border-radius: inherit;
    overflow: auto;
    transition-property: max-height, opacity, top;
  }

  li {
    cursor: pointer;
    padding: 0.5em 1em;

    &.current,
    &:hover {
      background-color: rgba($focus, 0.1);
    }

    &.placeholder {
      cursor: initial;
      text-align: center;
    }
  }

  p {
    position: absolute;
    color: currentColor;

    top: 50%;
    left: 0.75em;
    background-color: white;
    padding: 0 0.5em;
    transform: translateY(-50%);
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    width: max-content;
    max-width: 75%;

    transition-property: top;
  }

  input {
    padding: 1em 1.5em;
    border-radius: inherit;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    color: inherit;
  }
</style>
