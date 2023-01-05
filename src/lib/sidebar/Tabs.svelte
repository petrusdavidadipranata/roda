<script>
  import { entries, results, editTab, resultsTab, sidebarActive } from "$lib/stores.js";

  $: tabs = [
    { name: "Entries", active: $editTab, list: $entries },
    { name: "Results", active: $resultsTab, list: $results }
  ]
</script>

<div class="border-b-2 pl-6 pr-7 pt-3 border-gray-500 flex justify-between gap-4">

  {#each tabs as { name, active, list }, i }
  <button
    class="{active ? "text-gray-900 border-gray-500": "text-gray-500 border-white hover:text-gray-900 tab"} border-b-2 text-lg pb-1.5 px-2 transition"
    on:click={() => editTab.set(!i)}
  >
    {name} 
    <span class="text-sm ml-1 {active ? "bg-gray-500" : "bg-gray-400"} text-white py-0.5 px-2.5 rounded-full transition">
      {list.length}
    </span>
  </button>
  {/each}

  <div class="grow"></div>
  <button class="fa-solid fa-xmark text-gray-400 text-2xl pb-1.5 hover:text-gray-500" on:click={() => sidebarActive.set(false)}></button>
</div>

<style>
  .tab:hover span {
    background-color: rgb(107 114 128);
  }
</style>