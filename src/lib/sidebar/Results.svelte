<script>
  import { slide } from "svelte/transition";
  import { results, resultsTab } from "$lib/stores.js";

  import Button from "./Button.svelte";

  const sort = () => {
    results.update(r => r.sort((a, b) => a?.name > b?.name ? 1 : -1));
  }

  const clear = () => {
    results.set([]);
  }
</script>

<div class="absolute transition-all duration-500 top-0 sm:w-128 w-full {$resultsTab ? "right-0" : "sm:-right-128 -right-full"}">
  <div class="mx-6 my-4 flex gap-4">
    <Button icon="arrow-up-a-z" text="Sort" on:click={sort} />
    <Button icon="xmark" text="Clear the list" on:click={clear} />
  </div>
  
  <div class="px-6 my-6 pb-10 overflow-scroll max-h-[calc(100vh-184px)]">
    {#each $results as result}
    {#if result.constructor == Array}
    <div class="w-full mb-4 border-2 rounded-xl px-3.5 pt-3.5 pb-0.5 border-gray-400" out:slide>
      {#each result as r}
      <div class="transition w-full mb-3 border-2 rounded-md px-3.5 py-1.5" style="border-color: {r.color};" out:slide>
        -- {r.name}
        <span class="text-white">_</span>
      </div>
      {/each}
    </div>
    {:else}
    <div class="transition w-full mb-4 border-2 rounded-md px-3.5 py-1.5" style="border-color: {result.color};" out:slide>
      {result.name}
      <span class="text-white">_</span>
    </div>
    {/if}
    {/each}
  </div>
</div>