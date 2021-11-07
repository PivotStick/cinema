<script>
  import { datas } from "@stores";
  import { createEventDispatcher } from "svelte";
  import { v4 } from "uuid";

  const dispatch = createEventDispatcher();

  export let value = "";

  const select = () => {
    const title = { _id: v4(), name: value, type: "PUB" };
    $datas.dico.titles = [...$datas.dico.titles, title];
    dispatch("added", title);
  };

  const click = (e) => {
    e.target.click();
  };
</script>

<div>
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
</div>

<style lang="scss">
  div {
    text-align: center;
  }

  a {
    display: block;
    margin: 0.5em 0;
  }

  .or {
    font-weight: 400;
  }

  a,
  .add-dico {
    transition-property: transform, background-color;
    cursor: pointer;
    padding: 0.5em 1em;
    border-radius: 1em;

    &:hover {
      transform: scale(1.01);
      background-color: rgba(white, 0.65);
    }
  }
</style>
