<script>
  import { fade, slide } from "svelte/transition";
  import { groupMode, uniqueMode, groupSize, groupPopup, wheels, entries } from "$lib/stores.js";
  import { draw } from "$lib/wheelFuncs.js";
  import toast from "svelte-french-toast"
  import Button from "./PopupBtn.svelte";
  import Switch from "./Switch.svelte";

  const sizeWidth = [
    undefined, undefined,
    600, 500, 400, 350
  ]

  const close = () => {
    groupPopup.set(false);
  }

  const apply = () => {
    if ($groupMode == false) {
      if ($wheels.length == 1) return close();

      wheels.set([
        { id: "crbrgdf0f1", ctx: undefined, size: "min(80vh,80vw)", textSize: "30", rotation: $wheels[0].rotation }
      ]);
      setTimeout(draw, 100);
      return close();
    }

    if ($groupSize === null || $groupSize < 2) {
      return toast.error(`"Group Size" must be bigger than 1...`)
    }

    if ($uniqueMode && $groupSize > $entries.length) {
      return toast.error(`If "Unique Results" is enabled, "Group Size" must be less than or equal the total amount of entries...`);
    }

    let w = [];
    for (let i=0; i<$groupSize; i++) {
      let id = (Math.random() + 1).toString(36).substring(2);
      let size = sizeWidth[Math.min($groupSize, sizeWidth.length-1)] + "px";
      w.push({ id, ctx: undefined, size, textSize: "18", rotation: 0 });
    }
    wheels.set(w);

    setTimeout(draw, 100);
    groupPopup.set(false);
  }
</script>

<div class="absolute inset-0 z-20 bg-black/30 grid place-items-center w-screen" transition:fade={{duration:200}}>
  <div class="px-10 w-full">
    <div class="sm:w-[34rem] z-100 rounded-xl overflow-hidden text-left mx-auto">
      <div class="flex items-center px-6 py-4 text-xl text-white bg-blue-600">
        <h1 class="flex-grow"><i class="fa-solid fa-layer-group mr-1.5"></i> Group Mode</h1>
        <Switch contrast bind:checked={$groupMode}/>
        <button class="fa-solid fa-xmark hover:text-gray-200 ml-4" on:click={apply}></button>
      </div>
      <div class="px-6 py-4 bg-white">
        {#if $groupMode}
        <ul class="flex flex-col gap-3 mb-4" transition:slide>
          <li class="flex justify-between items-center">
            <p>Enable Unique Results</p>
            <Switch bind:checked={$uniqueMode}/>
          </li>
          <li class="flex justify-between items-center">
            <p>Group Size</p>
            <input
              class="w-24 px-3.5 py-1.5 outline-none overflow-hidden border-2 border-gray-200 rounded-md hover:border-gray-300 focus:border-blue-400 hover:focus:border-blue-400"
              type="number"
              min="2"
              bind:value={$groupSize}
            />
          </li>
        </ul>
        {/if}
        <div class="flex justify-end gap-4 -mr-1.5">
          <Button text="Close" on:click={apply} />
        </div>
      </div>
    </div>
  </div>
</div>