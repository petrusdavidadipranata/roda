<script>
  export let contrast = false;
  export let checked;
</script>

<label class="switch relative inline-block w-14 h-8">
  <input type="checkbox" class="opacity-0 w-0 h-0" bind:checked={checked}>
  <span class="slider absolute cursor-pointer inset-0 bg-gray-{ contrast ? "300" : "200" } rounded-full"></span>
</label>

<style>
  .slider {
    -webkit-transition: .2s;
    transition: .2s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 5px;
    bottom: 5px;
    background-color: white;
    -webkit-transition: .2s;
    transition: .2s;
    border-radius: 50%;
  }

  input:checked + .slider {
    @apply bg-blue-400;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
  }
  </style>