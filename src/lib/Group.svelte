<script>
  import { fade } from "svelte/transition";
  import { groupMode, uniqueMode, groupSize, groupPopup, wheels, entries } from "$lib/stores.js";
  import { draw } from "$lib/wheelFuncs.js";
  import Button from "./PopupBtn.svelte";

  let group = $groupMode;
  let unique = $uniqueMode;
  let size = $groupSize;

  const close = () => {
    groupPopup.set(false);
  }

  const apply = () => {
    if (group == $groupMode && unique == $uniqueMode && size == $groupSize){
      groupPopup.set(false);
      return;
    }
    if (group == $groupMode && !group){
      groupPopup.set(false);
      return;
    }

    if (!size || size === 1) size = 2;

    size = Math.min(size, $entries.length);

    groupMode.set(group);
    uniqueMode.set(unique && group);
    groupSize.set(size);
    groupPopup.set(false);

    if (!group) {
      wheels.set([{ id: "crbrgdf0f1", ctx: undefined, size: "w-[min(80vh,80vw)]", textSize: "15", rotation: 0 }]);
      setTimeout(draw, 100);
      return;
    };

    let w = [];
    for (let i=0; i<size; i++) {
      let id = (Math.random() + 1).toString(36).substring(2);
      w.push({ id, ctx: undefined, size: "w-[350px]", textSize: "2xl", rotation: 0 });
    }
    wheels.set(w);

    setTimeout(draw, 100);
  }
</script>

<div class="absolute inset-0 z-20 bg-black/30 grid place-items-center w-screen" transition:fade={{duration:200}}>
  <div class="px-10 w-full">
    <div class="sm:w-[34rem] z-100 rounded-xl overflow-hidden text-left mx-auto">
      <div class="flex justify-between items-center px-6 py-4 text-xl text-white bg-blue-600">
        <h1><i class="fa-solid fa-layer-group mr-1.5"></i> Group Mode</h1>
        <button class="fa-solid fa-xmark hover:text-gray-200" on:click={close}></button>
      </div>
      <div class="px-6 py-4 bg-white">
        <ul class="flex flex-col gap-2 mb-4">
          <li class="flex justify-between items-center">
            <p>Enable Group Mode</p>
            <Button text={group ? "Enabled" : "Disabled"} on:click={() => {group = !group; unique = unique && group}} invert={group}/>
          </li>
          <li class="flex justify-between items-center">
            <p>Enable Unique Results</p>
            <Button disabled={!group} text={unique ? "Enabled" : "Disabled"} on:click={() => unique = !unique} invert={unique}/>
          </li>
          <li class="flex justify-between items-center">
            <p>Group Size</p>
            <input
              class="w-48 px-3.5 py-1.5 outline-none overflow-hidden border-2 border-gray-200 rounded-md hover:border-gray-300 focus:border-blue-400 hover:focus:border-blue-400"
              type="number"
              min="2"
              max={$entries.length}
              bind:value={size}
            />
          </li>
        </ul>
        <div class="flex justify-end gap-4 -mr-1.5">
          <Button text="Cancel" on:click={close} />
          <Button text="Apply" on:click={apply} color="bg-blue-600 text-gray-100" hoverColor="bg-blue-700" />
        </div>
      </div>
    </div>
  </div>
</div>