<script>
  import { fade, slide } from "svelte/transition";
  import { colorPopup, colors, defColors } from "$lib/stores.js";
  import Button from "./PopupBtn.svelte";

  const add = () => {
    colors.update(c => [...c, { val: "#3369e8", id: Math.random() }]);
  }

  const remove = i => {
    if ($colors.length <= 3) return;
    colors.update(c => {c.splice(i, 1); return c})
  }

  const reset = () => {
    colors.set(defColors);
  }

  const close = () => {
    colorPopup.set(false);
  }
</script>

<div class="absolute inset-0 z-20 bg-black/30 grid place-items-center w-screen" transition:fade={{duration:200}}>
  <div class="px-10 w-full">
    <div class="sm:w-[34rem] z-100 rounded-xl overflow-hidden text-left mx-auto">
      <div class="flex justify-between items-center px-6 py-4 text-xl text-white bg-blue-600">
        <h1>Edit Skema Warna</h1>
        <button class="fa-solid fa-xmark hover:text-gray-200" on:click={close} />
      </div>
      <div class="py-4 bg-white">
        <div class="px-6 max-h-[60vh] overflow-scroll mb-4">
          {#each $colors as c, i (c.id) }
          <div
            transition:slide duration=500 easing=ease-in-out
            class="flex overflow-hidden transition {i != $colors.length-1 ? "mb-4" : ""} border-2 border-gray-200 rounded-md divide-x-2 divide-gray-200
            hover:border-gray-300 focus-within:border-blue-400 hover:focus-within:border-blue-400 hover:divide-gray-300"
          >
          <input class="outline-none grow" type="color" bind:value={c.val}>
          <button class="fa-solid fa-trash text-gray-300 w-10 hover:bg-gray-300 hover:text-white transition" on:click={() => remove(i)} />
        </div>
        {/each}
      </div>
        <div class="flex justify-end gap-3 -mr-1.5 px-6">
          <Button text='<i class="fa-solid fa-plus"></i> Add Entry' on:click={add} />
          <Button text='<i class="fa-solid fa-arrows-rotate mr-1.5"></i> Reset Colors' on:click={reset} />
          <Button text="Close" on:click={close} />
        </div>
      </div>
    </div>
  </div>
</div>