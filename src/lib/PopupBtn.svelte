<script>
  export let text;
  export let color = "bg-gray-200";
  export let hoverColor = "bg-gray-300";
</script>

<button
  class="{color} text-gray-600 px-4 py-1.5 rounded-md hover:{hoverColor} transition"
  on:click
>
  {text}
</button>
