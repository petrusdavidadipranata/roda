<script>
  import { advancedMode } from "$lib/stores.js";

  export let icon;
  export let text;

  export let advancedBtn = false;

  $: color = 
    $advancedMode && advancedBtn
      ? "bg-gray-400 hover:bg-gray-500 text-gray-200"
      : "bg-gray-200 hover:bg-gray-300";
</script>

<button class="{color} text-blue-600 px-4 py-1.5 rounded-md transition" on:click>
  <i class="fa-solid fa-{icon} mr-1" />
  {text}
</button>