<script>
  import Header from "@components/Header.svelte";
  import Tab from "@components/Tab.svelte";
  import Tabs from "@components/Tabs.svelte";

  import Posters from "@tabs/Posters.svelte";
  import MovieAds from "@tabs/MovieAds.svelte";
  import LED from "@tabs/LED.svelte";
  import Remarks from "@tabs/Remarks.svelte";
  import DicoEditor from "@tabs/DicoEditor.svelte";

  import { datas } from "@stores";
</script>

<Header />

<Tabs bind:current={$datas.currentTab}>
  <Tab name="Affiches"><Posters /></Tab>
  <Tab name="Films Annonce"><MovieAds /></Tab>
  <Tab name="LED"><LED /></Tab>
  <!-- <Tab name="Remarques"><Remarks /></Tab> -->
  <Tab name="Edition du Dico"><DicoEditor /></Tab>
</Tabs>

<style global lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");

  :root {
    font-family: "Nunito", sans-serif;
    color: #333;

    --primary: 78, 169, 253;
    --secondary: rgba(0, 0, 0, 0.05);
  }

  #app {
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;

    box-sizing: border-box;

    transition: none cubic-bezier(0, 1, 0.5, 1) 1000ms;
  }

  *::selection {
    background-color: rgb(var(--primary));
    color: white;
  }

  ul,
  ol {
    list-style: none;
  }

  button {
    cursor: pointer;

    background-color: var(--secondary);
    border: none;
    border-radius: 1em;
    padding: 1em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: "Nunito", sans-serif;

    transition-property: transform, font-weight, letter-spacing;

    &:hover {
      letter-spacing: 4px;
    }
    &:active {
      transform: scale(0.9);
      font-weight: 900;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1em;
  }

  a {
    color: inherit;
  }

  *[contentediable] {
    font: inherit;
    border: none;
    border: 1px dashed transparent;

    &:hover {
      border: 1px dashed var(--secondary);
    }
  }
</style>
