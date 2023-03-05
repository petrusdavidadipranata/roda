<script>
  import { fade } from "svelte/transition";
  import { entries, wheelActive, winnerIndex, winPopup, results } from "$lib/stores.js";
  import Button from "./PopupBtn.svelte";

  let winners = $winnerIndex.map(i => {
    let { id, ...rest } = $entries[i];
    return { id: Math.random(), ...rest };
  });

  if (winners.length == 1) {
    results.update(r => [...winners, ...r]);
  } else {
    results.update(r => [winners, ...r]);
  }

  const close = () => {
    winPopup.set(false);
    wheelActive.set(false);
  }

  const remove = () => {
    entries.update(e => {
      e = e.filter((itm, i) => !$winnerIndex.includes(i));
      if (!e.length) e = [{ name: "", prob: 1, id: Math.random() }];
      return e;
    })

    winPopup.set(false);
    wheelActive.set(false);
  }
</script>

<button class="absolute inset-0 z-20 bg-black/30 grid place-items-center w-screen cursor-default" on:click={close} transition:fade={{duration:200}}>
  <div class="px-10 w-full">
    <div class="sm:w-[34rem] z-100 rounded-xl overflow-hidden text-left mx-auto">
      <div
        class="flex justify-between items-center px-6 py-4 text-xl text-white"
        style="background-color: {$winnerIndex.length == 1 ? $entries[$winnerIndex[0]]?.color : "#2563eb"}"
      >
        <h1>We have {$winnerIndex.length == 1 ? "a winner!" : $winnerIndex.length + " winners!"}</h1>
        <button class="fa-solid fa-xmark hover:text-gray-200" on:click={close}></button>
      </div>
      <div class="px-[1.125rem] py-4 bg-white">
        <p class="text-4xl mb-2">
          {#each winners as { name, color} }
          <div class="w-full mb-4 border-2 rounded-md px-3.5 py-1.5 text-base" style="border-color: {color};">
            { name }
            <span class="text-white">_</span>
          </div>
          {/each}
        </p>
        <div class="flex justify-end gap-4">
          <Button text="Close" on:click={close} />
          <Button text="Remove" on:click={remove} color="bg-blue-600 text-gray-100" hoverColor="bg-blue-700" />
        </div>
      </div>
    </div>
  </div>
</button>