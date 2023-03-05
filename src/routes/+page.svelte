<script>
  import { helpPopup, winPopup, groupPopup, uploadPopup, colorPopup } from "$lib/stores.js";

  import Wheel from "$lib/Wheel.svelte";
  import Sidebar from "$lib/sidebar/Main.svelte";

  import Winner from "$lib/Winner.svelte";
  import Group from "$lib/Group.svelte";
  import Help from "$lib/Help.svelte";
  import Upload from "$lib/Upload.svelte";
  import Colors from "$lib/Colors.svelte";
</script>

<main
  class="h-[calc(100vh-3.5rem)] relative grid place-items-center overflow-x-hidden"
>
  <Wheel />
  <Sidebar />
</main>


{#if $winPopup}
<Winner />
{/if}

{#if $groupPopup}
<Group />
{/if}

{#if $helpPopup}
<Help />
{/if}

{#if $uploadPopup}
<Upload />
{/if}

{#if $colorPopup}
<Colors />
{/if}