<script>
  import { fade } from "svelte/transition";
  import { sidebarActive, wheelActive } from "$lib/stores.js";

  import Tabs from "./Tabs.svelte";
  import Edit from "./Edit.svelte";
  import Results from "./Results.svelte";

  const openSidebar = () => {
    if ($wheelActive) return;
    sidebarActive.set(true)
  }
</script>

<button
  class="fa-solid fa-bars absolute top-4 right-7 text-gray-400 text-2xl hover:text-gray-500"
  on:click={openSidebar}
></button>

{#if $sidebarActive}
<button
  class="absolute block inset-0 w-screen bg-black/30 z-10"
  transition:fade
  duration=1000
  on:click={() => sidebarActive.set(false)}
></button>
{/if}

<div
  class="absolute bg-white inset-y-0 {$sidebarActive ? "right-0" : "sm:-right-128 -right-full"} sm:w-128 w-full z-20 transition-all duration-1000"
>
  <Tabs />

  <div class="relative overflow-x-clip">
    <Edit />
    <Results />
  </div>
</div>