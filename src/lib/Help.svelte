<script>
  import { fade } from "svelte/transition";
  import { helpPopup } from "$lib/stores.js";

  import Button from "./PopupBtn.svelte";

  const close = () => {
    helpPopup.set(false);
  }
</script>

<button class="absolute inset-0 z-20 bg-black/30 grid place-items-center w-screen cursor-default" on:click={close} transition:fade={{duration:200}}>
  <div class="px-10 w-full">
    <div class="sm:w-[34rem] z-100 rounded-xl overflow-hidden text-left mx-auto">
      <div class="flex justify-between items-center px-6 py-4 text-xl text-white bg-blue-600">
        <h1>Help - User's Manual</h1>
        <button class="fa-solid fa-xmark hover:text-gray-200" on:click={close}></button>
      </div>
      <div class="px-6 py-4 bg-white">
        <ul class="mb-2 list-disc list-outside ml-4">
          <li>
            Open the sidebar (<i class="fa-solid fa-bars text-gray-400 px-0.5 text-sm"></i>) and start edition the names on the wheel.
          </li>
          <li>
            The <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Shuffle</span>, <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Sort</span> and <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Add Entry</span> are unambiguous. No explanation is needed. 
          </li>
          <li>
            Click on the <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Advanced</span> button to also edit the probabilities (default: everyone has an equal probability of getting picked).
          </li>
          <li>
            Click again on the <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Advanced</span> button to hide the probabilities (however, they are still valid <i class="fa-solid fa-arrow-right text-gray-600"></i> this can be used for cheating)
          </li>
          <li>
            If you want to see the results, click on the <i>Results</i> tab.
          </li>
          <li>
            The <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Upload</span> feature is still in Beta...
          </li>
        </ul>
        <div class="flex justify-end gap-4 -mr-1.5">
          <Button text="Close" on:click={close} />
        </div>
      </div>
    </div>
  </div>
</button>