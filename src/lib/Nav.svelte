<script>
  import { helpPopup } from "$lib/stores.js";
</script>

<div class="bg-blue-600 w-screen h-14 flex justify-between">
  <a href="/" class="flex gap-4 items-center py-3 px-7 w-[15.5rem] hover:bg-blue-500 transition">
    <img src="/logo.png" alt="" class="h-full">
    <h1 class="text-lg font-medium text-white">Wheel Of Names</h1>
  </a>
  <button class="text-white hover:bg-blue-500 py-auto px-7 transition" on:click={() => helpPopup.set(true)}>Help</button>
</div>