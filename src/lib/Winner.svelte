<script>
  import { fade } from "svelte/transition";
  import { entries, wheelActive, winnerIndex, winPopup } from "$lib/stores.js";

  import Button from "./PopupBtn.svelte";

  const close = () => {
    winPopup.set(false);
    wheelActive.set(false);
  }

  const remove = () => {
    entries.update(e => {
      e.splice($winnerIndex, 1)
      if (!e.length) e.push({
        name: "",
        prob: 1,
        id: Math.random()
      });

      return e;
    });
    
    winPopup.set(false);
    wheelActive.set(false);
  }
</script>

<button class="absolute inset-0 z-20 bg-black/30 grid place-items-center w-screen cursor-default" on:click={close} transition:fade={{duration:200}}>
  <div class="px-10 w-full">
    <div class="sm:w-[34rem] z-100 rounded-xl overflow-hidden text-left mx-auto">
      <div class="flex justify-between items-center px-6 py-4 text-xl text-white" style="background-color: {$entries[$winnerIndex]?.color};">
        <h1>We have a winner!</h1>
        <button class="fa-solid fa-xmark hover:text-gray-200" on:click={close}></button>
      </div>
      <div class="px-6 py-4 bg-white">
        <p class="text-4xl mb-2">
          {$entries[$winnerIndex]?.name}
          <span class="text-white">_</span>
        </p>
        <div class="flex justify-end gap-4 -mr-1.5">
          <Button text="Close" on:click={close} />
          <Button text="Remove" on:click={remove} color="bg-blue-600 text-gray-100" hoverColor="bg-blue-700" />
        </div>
      </div>
    </div>
  </div>
</button>