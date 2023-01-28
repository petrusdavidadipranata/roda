<script>
  import { Toaster } from "svelte-french-toast";
  import { entries, Xpages, Xcurrent, defEntries, colors, defColors, advancedMode } from "$lib/stores.js";
  import { browser } from '$app/environment'; 
  import "../app.css";

  if (browser) {
    let i = localStorage.current || "0";
    Xcurrent.set(JSON.parse(i));
    Xcurrent.subscribe(v => localStorage.current = JSON.stringify(v));

    let p = localStorage.pages || "[]";
    Xpages.set(JSON.parse(p));
    Xpages.subscribe(v => localStorage.pages = JSON.stringify(v));

    let e = localStorage.entries || JSON.stringify(defEntries);
    entries.set(JSON.parse(e))
    entries.subscribe(v => localStorage.entries = JSON.stringify(v));

    let c = localStorage.colors || JSON.stringify(defColors);
    colors.set(JSON.parse(c))
    colors.subscribe(v => localStorage.colors = JSON.stringify(v));

    let a = localStorage.advanced || "false";
    advancedMode.set(JSON.parse(a))
    advancedMode.subscribe(v => localStorage.advanced = JSON.stringify(v));
  }
</script>

<Toaster />

<slot />