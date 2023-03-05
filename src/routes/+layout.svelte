<script>
  import { Toaster } from "svelte-french-toast";
  import "$lib/loadStorage.js"
  import "../app.css";

  import Nav from "$lib/Nav.svelte";
  import Footer from "$lib/Footer.svelte";
</script>

<Toaster />

<Nav />

<slot />

<Footer />
