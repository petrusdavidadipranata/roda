<script>
  import { slide } from "svelte/transition";
  import { entries, editTab, advancedMode, colorPopup } from "$lib/stores.js";

  import Button from "./Button.svelte";

  const shuffle = () => {
    entries.update(e => e.sort(() => Math.random() - 0.5));
  }

  const sort = () => {
    entries.update(e => e.sort((a, b) => a.name > b.name ? 1 : -1));
  }

  const toggleAdvannced = () => {
    advancedMode.update(m => !m);
  }

  const removeEntry = i => {
    entries.update(e => {e.splice(i, 1); return e})
    if (!$entries.length) entries.set([{ name: "", prob: 1, id: Math.random() }]);
  }

  const addEntry = () => {
    entries.update(e => [...e, { name:"", prob: 1, id: Math.random() }]);
  }
</script>

<div class="absolute transition-all duration-500 top-0 sm:w-128 w-full {$editTab ? "left-0" : "sm:-left-128 -left-full"}">
  <div class="mx-6 my-4 flex justify-between">
    <Button icon="shuffle" text="Shuffle" on:click={shuffle} />
    <Button icon="arrow-up-a-z" text="Sort" on:click={sort} />
    <Button icon="code-branch" text="Advanced" on:click={toggleAdvannced} advancedBtn/>
    <Button icon="fa-solid fa-droplet" text="Colors" on:click={() => colorPopup.set(true)} />
  </div>
  
  <div class="my-6 pb-10">
    <div class="px-6 overflow-scroll max-h-[calc(100vh-256px)]">
      {#each $entries as e, i (e.id)}
      <div
        transition:slide duration=500 easing=ease-in-out
        class="flex overflow-hidden transition {i != $entries.length-1 ? "mb-4" : ""} border-2 border-gray-600 rounded-md {$advancedMode ? "divide-x-2": "divide-x"} divide-gray-200
          hover:border-gray-300 focus-within:border-green-400 hover:focus-within:border-green-400 hover:divide-gray-300"
        >
        <input class="px-3.5 py-1.5 outline-none grow" type="text" bind:value={e.name}>
        <input class="outline-none text-right {$advancedMode ? "w-12 px-3.5 py-1.5" : "w-0"} transition-all duration-500" type="number" min="0" max="100" bind:value={e.prob}>
        <button class="fa-solid fa-trash text-red-500 w-10 hover:bg-gray-300 hover:text-red transition" on:click={() => removeEntry(i)}></button>
      </div>
      {/each}
    </div>
    <button class="bg-gray-200 text-green-600 px-4 py-1.5 rounded-md hover:bg-gray-300 transition float-right mr-6 mt-4" on:click={addEntry}>
      <i class="fa-solid fa-plus"></i>
      Tambah Entry
    </button>
  </div>
</div>

<style>
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
  }
</style>