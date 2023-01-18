<script>
  import { helpPopup, winPopup, uploadPopup } from "$lib/stores.js";
  
  import Nav from "$lib/Nav.svelte";
  import Footer from "$lib/Footer.svelte";

  import Wheel from "$lib/Wheel.svelte";
  import Sidebar from "$lib/sidebar/Main.svelte";

  import Winner from "$lib/Winner.svelte";
  import Help from "$lib/Help.svelte";
  import Upload from "$lib/Upload.svelte";
</script>

<Nav />

<main
  class="h-[calc(100vh-3.5rem)] relative grid place-items-center overflow-hidden"
>
  <Wheel />
  <Sidebar />
</main>



{#if $winPopup}
<Winner />
{/if}

{#if $helpPopup}
<Help />
{/if}

{#if $uploadPopup}
<Upload />
{/if}

<Footer />
