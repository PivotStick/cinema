<script lang="ts">
  import { datas } from "@stores";
  import type { MovieAd } from "src/@types/MovieAd";
  import FilmTitle from "../components/FilmTitle.svelte";
  import Input from "../components/Input.svelte";

  const dimensions = ["2D", "3D"];
  const contents = ["PUB", "JINGLE", "FA", "FA PUB", "PUB NOIR", "FA NOIR"];

  const add = () => {
    const last = $datas.movieAds[$datas.movieAds.length - 1];
    if (last) last.expanded = false;

    $datas.movieAds = [
      ...$datas.movieAds,
      {
        room: 0,
        expanded: true,
        film: "",
        dimension: dimensions[0],
        date:
          last?.date ||
          new Date().toLocaleDateString().split("/").reverse().join("-"),
        time: last?.time || "07:00",
        duration: 10,
        ads: [],
      },
    ];
    for (let i = 0; i < 40; i++) addAd();
  };

  const remove = (movieAd: MovieAd) => {
    $datas.movieAds = $datas.movieAds.filter((m) => m !== movieAd);
  };

  const addAd = (index: number = $datas.movieAds.length - 1) => {
    $datas.movieAds[index].ads = [
      ...$datas.movieAds[index].ads,
      {
        content: contents[0],
        name: "",
      },
    ];
  };

  const removeAd = (index: number, ad: MovieAd["ads"][number]) => {
    $datas.movieAds[index].ads = $datas.movieAds[index].ads.filter(
      (a) => a !== ad
    );
  };

  if (!$datas.movieAds.length) add();
</script>

<ul class="movies">
  {#each $datas.movieAds as group, groupIndex}
    <li>
      <div>
        <Input
          bind:value={group.room}
          placeholder="N° de Salle"
          type="number"
        />
        <FilmTitle bind:value={group.film} placeholder="Séance / Film" />
        <Input
          bind:value={group.dimension}
          placeholder="2D / 3D"
          search={dimensions}
          nofilter
        />
        <Input bind:value={group.duration} placeholder="Durée" type="number" />
        <Input bind:value={group.date} placeholder="Date" type="date" />
        <Input bind:value={group.time} placeholder="Horaire" type="time" />
        <button on:click={() => remove(group)}>✖︎</button>
        <p
          class="expand-btn"
          class:expanded={group.expanded}
          on:click={() => (group.expanded = !group.expanded)}
        >
          ⌃
        </p>
      </div>
      {#if group.expanded}
        <ul class="ads">
          {#each group.ads as ad, adIndex}
            <li>
              <p>{adIndex + 1}</p>
              <FilmTitle bind:value={ad.name} placeholder="Avant Séance" />
              <Input
                bind:value={ad.content}
                placeholder="Contenu"
                type="search"
                search={contents}
                nofilter
                on:next={() =>
                  adIndex === group.ads.length - 1 && addAd(groupIndex)}
              />
              <button tabindex="-1" on:click={() => removeAd(groupIndex, ad)}
                >✖︎</button
              >
            </li>
          {/each}
          <li class="add">
            <button on:click={() => addAd(groupIndex)}>Ajouter une ligne</button
            >
          </li>
        </ul>
      {/if}
    </li>
  {/each}
  <li class="add"><button on:click={add}>Ajouter un Horaire</button></li>
</ul>

<style lang="scss">
  .movies,
  .ads {
    display: flex;
    flex-direction: column;
  }

  .expand-btn {
    cursor: pointer;
    font-size: 2em;
    font-weight: 900;
    width: max-content;

    transition-property: transform;

    &.expanded {
      transform: rotate(180deg);
    }
  }

  .movies {
    gap: 2.5vw;

    & > li {
      border: 1px solid #ddd;
      border-radius: 1em;
      padding: 1em;

      & > div {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;

        & > :global(*:first-child) {
          width: 6em;
        }

        & > :global(*:nth-child(2)) {
          flex: 1 0 20em;
        }
      }
    }
  }

  .ads {
    margin-top: 3em;
    gap: 1em;

    li {
      display: flex;
      align-items: center;
      gap: 1em;

      & > :global(*:nth-child(2)) {
        flex: 1;
      }

      p {
        font-weight: 900;
        font-size: 2em;
        transform: translateY(10%);
      }
    }
  }

  .add button {
    width: 100%;
  }
</style>
