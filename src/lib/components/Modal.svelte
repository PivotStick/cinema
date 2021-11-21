<script>
  import { fade, scale } from "svelte/transition";
  import { expoOut } from "svelte/easing";

  export let visible = false;

  const close = () => {
    visible = false;
  };
</script>

{#if visible}
  <div
    transition:fade={{ easing: expoOut }}
    class="backdrop"
    on:click|self={close}
  >
    <div transition:scale={{ easing: expoOut }} class="modal">
      <slot />
    </div>
  </div>
{/if}

<style lang="scss">
  .backdrop {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;

    background-color: rgba(black, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: white;
    border-radius: 1em;
    padding: 2em;
  }
</style>
