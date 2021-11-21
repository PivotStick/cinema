<script lang="ts">
  import type { MovieAd as TMovieAd } from "src/@types/MovieAd";
  import { slide } from "svelte/transition";
  import { v4 } from "uuid";
  import { datas } from "@stores";
  import FilmTitle from "../components/FilmTitle.svelte";
  import Input from "../components/Input.svelte";
  import Ad from "../components/Ad.svelte";
  import MovieAd from "../components/MovieAd.svelte";

  const dimensions = ["2D", "3D"];

  const add = () => {
    const last = $datas.movieAds[$datas.movieAds.length - 1];
    if (last) last.expanded = false;

    $datas.movieAds = [
      ...$datas.movieAds,
      {
        room: 1,
        expanded: true,
        film: "",
        dimension: dimensions[0],
        date:
          last?.date ||
          new Date().toLocaleDateString().split("/").reverse().join("-"),
        time: last?.time || "14:00",
        duration: 20,
        ads: [],
      },
    ];
  };

  const remove = (movieAd: TMovieAd) => {
    $datas.movieAds = $datas.movieAds.filter((m) => m !== movieAd);
  };

  const addAd = (index: number = $datas.movieAds.length - 1, ad) => {
    if ($datas.activeGroup?._id === ad._id) {
      $datas.activeGroup = undefined;
      return;
    }

    if ($datas.activeGroup) {
      $datas.activeGroup.group = [...$datas.activeGroup.group, ad];
      $datas.movieAds[index].ads = $datas.movieAds[index].ads;
      return;
    }

    if (ad.group) {
      $datas.activeGroup = { ...ad, ...ad.group };
      $datas.activeGroup.group = [];
      $datas.movieAds[index].ads = [
        ...$datas.movieAds[index].ads,
        $datas.activeGroup,
      ];
      return;
    }

    $datas.movieAds[index].ads = [...$datas.movieAds[index].ads, { ...ad }];
  };

  if (!$datas.movieAds.length) add();

  const reset = () => {
    $datas.movieAds = [];
    $datas.activeGroup = undefined;
  };
</script>

<ul class="movies">
  {#each $datas.movieAds as group, groupIndex (groupIndex)}
    <li>
      <div>
        <Input
          bind:value={group.room}
          placeholder="N° de Salle"
          type="number"
          tabindex="1"
        />
        <FilmTitle
          bind:value={group.film}
          placeholder="Séance / Film"
          tabindex="1"
        />
        <Input
          bind:value={group.dimension}
          placeholder="2D / 3D"
          search={dimensions}
          nofilter
          tabindex="1"
        />
        <Input
          bind:value={group.duration}
          placeholder="Durée"
          type="number"
          tabindex="1"
        />
        <Input
          bind:value={group.date}
          placeholder="Date"
          type="date"
          tabindex="1"
        />
        <Input
          bind:value={group.time}
          placeholder="Horaire"
          type="time"
          tabindex="1"
        />
        <button on:click={() => remove(group)} tabindex="-1">✖︎</button>
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
          {#each group.ads as ad, adIndex (adIndex)}
            <li transition:slide|local>
              {#if ad.group}
                <ul class="group">
                  <li class="meta">
                    <span>{ad.start}</span>
                    <span contenteditable="true" bind:textContent={ad.suffix} />
                    <span>{ad.type}</span>
                  </li>
                  {#each ad.group as _ad, _i (_i)}
                    <li in:slide|local>
                      <MovieAd
                        suffix={ad.suffix}
                        bind:ad={_ad}
                        on:delete={() => {
                          ad.group = ad.group.filter((_, __) => __ !== _i);
                        }}
                      />
                    </li>
                  {/each}
                  {#if $datas.activeGroup?._id !== ad._id}
                    <li class="meta">
                      {ad.end}
                    </li>
                  {/if}
                </ul>
              {:else}
                <MovieAd
                  bind:ad
                  on:delete={() => {
                    group.ads = group.ads.filter((_) => _ !== ad);
                  }}
                />
              {/if}
            </li>
          {/each}
        </ul>
        <Ad on:submit={(e) => addAd(groupIndex, e.detail)} />
      {/if}
    </li>
  {/each}
  <li class="add"><button on:click={add}>Ajouter un Horaire</button></li>
  <button on:click={reset}>Réinitialiser</button>
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

    transform: translateY(-40%) rotateX(var(--rotate));
    transition-property: transform;

    &.expanded {
      --rotate: 180deg;
    }
  }

  .movies {
    gap: 2.5vw;

    & > li {
      padding-bottom: 2.5vw;
      border-bottom: 1px solid #ddd;

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
    margin-bottom: 1em;

    li {
      display: flex;
      align-items: center;
      padding: 1em 1.5em;
      gap: 1em;
      border-radius: 1em;

      transition-property: border-radius;

      & > :global(*:nth-child(1)) {
        flex: 1;
      }

      p {
        font-weight: 900;
        font-size: 2em;
        transform: translateY(10%);
        width: 2ch;
      }

      &:not(.start) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }

      &:not(.end) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  .add {
    display: flex;
    gap: 1em;
    align-items: center;

    :global(:first-child) {
      flex: 1;
    }
  }

  .group {
    background-color: rgba(var(--primary), 0.15);
    border-radius: 1em;
    color: rgb(var(--primary));

    .meta {
      justify-content: space-between;

      & > * {
        flex: none;
      }
    }
  }
</style>
