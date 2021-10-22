<script>
  import { datas } from "@stores";

  import Input from "./Input.svelte";

  export let placeholder = "Titre du Film";
  export let value = "";

  const select = () => {
    $datas.dico.titles = [...$datas.dico.titles, value];
  };

  const click = (e) => {
    e.target.click();
  };
</script>

<Input bind:value type="search" {placeholder} search={$datas.dico.titles}>
  <svelte:fragment slot="search-placeholder">
    <a
      href="https://www.google.com/search?q={value}"
      target="_blank"
      tabindex="-1"
      on:mousedown={click}
    >
      Rechercher "{value}" sur google
    </a>
    <p class="or">ou</p>
    <p class="add-dico" on:mousedown={select}>
      Enregister "{value}" dans le Dico
    </p>
  </svelte:fragment>
</Input>

<style lang="scss">
  a {
    display: block;
    margin: 0.5em 0;
  }

  .or {
    font-weight: 400;
  }

  .add-dico {
    cursor: pointer;
    padding: 0.5em 1em;
    border-radius: 1em;

    transition-property: transform, background-color;

    &:hover {
      transform: scale(1.01);
      background-color: rgba(white, 0.65);
    }
  }
</style>
