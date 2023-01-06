<script>
  import { slide } from "svelte/transition";
  import { results, resultsTab } from "$lib/stores.js";

  const sort = () => {
    results.update(r => r.sort((a, b) => a.name > b.name ? 1 : -1));
  }

  const clear = () => {
    results.set([]);
  }
</script>

<div class="absolute transition-all duration-500 top-0 sm:w-128 w-full {$resultsTab ? "right-0" : "sm:-right-128 -right-full"}">
  <div class="mx-6 my-4 flex gap-4">
    <button class="bg-gray-200 text-gray-600 px-4 py-1.5 rounded-md hover:bg-gray-300 transition" on:click={sort}><i class="fa-solid fa-arrow-up-a-z mr-1"></i> Sort</button>
    <button class="bg-gray-200 text-gray-600 px-4 py-1.5 rounded-md hover:bg-gray-300 transition" on:click={clear}><i class="fa-solid fa-xmark mr-1"></i> Clear the list</button>
  </div>
  
  <div class="px-6 my-6 pb-10 overflow-scroll max-h-[calc(100vh-184px)]">
    {#each $results as { name, color, id } (id)}
    <div class="transition w-full mb-4 border-2 rounded-md px-3.5 py-1.5" style="border-color: {color};" out:slide>
      {name}
      <span class="text-white">_</span>
    </div>
    {/each}
  </div>
</div>