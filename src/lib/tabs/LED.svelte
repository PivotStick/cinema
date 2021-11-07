<script>
  import { datas, initialLeds } from "@stores";
  import { slide } from "svelte/transition";
  import FilmTitle from "../components/FilmTitle.svelte";
  import Input from "../components/Input.svelte";

  const reset = () => {
    $datas.leds = JSON.parse(JSON.stringify(initialLeds));
  };
</script>

<ul>
  {#each $datas.leds as led}
    <li class="led">
      <div class="head">
        <h1 contenteditable bind:textContent={led.title} />
        <span
          class:visible={led.visible}
          on:click={() => {
            led.visible = !led.visible;
          }}>⌃</span
        >
      </div>
      {#if led.visible}
        <div transition:slide|local>
          <p contenteditable bind:textContent={led.subTitle} />
          <div class="numbers">
            <Input
              type="number"
              placeholder="Nombre dans le Hall"
              bind:value={led.hall}
            />
            <Input
              type="number"
              placeholder="Nombre dans les Couloirs"
              bind:value={led.hallways}
            />
            <Input
              type="number"
              placeholder="Nombre en extérieur"
              bind:value={led.outdoors}
            />
          </div>
          <ul class="films">
            {#each led.films as film, index}
              <li class="film">
                <FilmTitle bind:value={film} />
                <button
                  on:click={() => {
                    led.films = led.films.filter((_, i) => i !== index);
                  }}>✖︎</button
                >
              </li>
            {/each}
            {#if !led.max || led.films.length < led.max}
              <li>
                <button
                  class="add-film"
                  on:click={() => {
                    led.films = [...led.films, ""];
                  }}>Ajouter un film</button
                >
              </li>
            {/if}
          </ul>
        </div>
      {/if}
    </li>
  {/each}
</ul>

<button class="reset" on:click={reset}>Réinitialiser</button>

<style lang="scss">
  .reset {
    margin-top: 6em;
    width: 100%;
  }

  h1 {
    margin: 0;
  }

  .numbers {
    display: flex;
    gap: 1em;
    margin-bottom: 2em;

    & > :global(*) {
      flex: 1;
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    span {
      --scale: 1;
      --rotate: 0deg;
      font-size: 2em;
      cursor: pointer;
      transform: scale(var(--scale)) rotate(var(--rotate)) translateY(5px);

      transition-property: transform;

      &:hover {
        --scale: 1.2;
      }

      &:active {
        --scale: 0.9;
      }

      &.visible {
        --rotate: -180deg;
      }
    }
  }

  .led:not(:first-child) {
    border-top: 1px solid var(--secondary);
    margin-top: 2em;
    padding-top: 1.5em;
  }

  p {
    margin-bottom: 1em;
  }

  .add-film {
    width: 100%;
  }

  .films {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .film {
    display: flex;
    gap: 0.5em;

    & > :global(label) {
      flex: 1;
    }
  }
</style>
