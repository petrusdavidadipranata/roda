<script>
  import { helpPopup, groupPopup, Xpages, Xcurrent, entries, uploadPopup, defEntries } from "$lib/stores.js";
  import { fade } from "svelte/transition";

  let dropdown = false;

  Xcurrent.subscribe(i => {
    if (!$Xpages[i]) return;
    
    let { table } = $Xpages[i];
    entries.set(table);
  })

  const reset = () => {
    entries.set(defEntries);
    Xpages.set([]);
    Xcurrent.set(0);

    dropdown = false;
  }
</script>

<div class="bg-blue-600 w-screen h-14 flex">
  <div class="flex gap-4 items-center py-3 px-7 w-[15.5rem]">
    <img src="/logo.png" alt="" class="h-full">
    <h1 class="text-lg font-medium text-white">Wheel Of Names</h1>
  </div>
  <div class="grow" />
  {#if $Xpages.length}
  <div>
    <button class="text-white hover:bg-blue-500 py-auto px-7 transition h-full" on:click={() => dropdown = !dropdown}>
      {$Xpages[$Xcurrent].name}
      {#if $Xpages.length > 1}
      <i class="fa-solid fa-angle-down ml-2 transition duration-300 {dropdown ? "rotate-180" : ""}"></i>
      {/if}
    </button>
    {#if dropdown}
    <button class="absolute block top-14 left-0 w-full h-[calc(100vh-3.5rem)] z-30" on:click={() => dropdown = false}/>
    <div class="relative">
      <div class="absolute top-0 right-0 bg-white shadow-lg flex flex-col z-40 rounded-md overflow-hidden" transition:fade={{duration:100}}>
        {#each $Xpages as { name }, i}
        {#if i != $Xcurrent}
        <button class="px-6 py-2.5 text-gray-600 hover:bg-gray-200/80 transition text-middle whitespace-nowrap" on:click={() => {Xcurrent.set(i); dropdown=false;}}>
          {name}
        </button>
        {/if}
        {/each}
        <button class="px-6 py-2.5 text-gray-600 hover:bg-gray-200/80 transition text-middle whitespace-nowrap" on:click={reset}>
          <i class="fa-solid fa-arrows-rotate mr-1.5"></i>
          Reset Names
        </button>
      </div>
    </div>
    {/if}
  </div>
  {:else}
  <button class="text-white hover:bg-blue-500 py-auto px-7 transition" on:click={() => uploadPopup.set(true)}>Upload</button>
  {/if}
  <button class="text-white hover:bg-blue-500 py-auto px-7 transition" on:click={() => groupPopup.set(true)}>Group Mode</button>
  <button class="text-white hover:bg-blue-500 py-auto px-7 transition" on:click={() => helpPopup.set(true)}>Help</button>
</div>