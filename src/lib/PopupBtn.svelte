<script>
  export let text;
  export let color = "bg-gray-200 text-gray-600";
  export let hoverColor = "bg-gray-300";
  export let invert = false;
  export let disabled = false;

  $: style = 
    invert
      ? "bg-gray-400 hover:bg-gray-500 text-gray-200"
      : color + " hover:" + hoverColor;
</script>

<button
  class="{style} px-4 py-1.5 rounded-md transition"
  {disabled}
  on:click
>
  {@html text}
</button>
