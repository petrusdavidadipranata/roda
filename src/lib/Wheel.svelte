<script>
  import { entries, sidebarActive, wheelActive, wheelHover, wheels, advancedMode, winPopup, winnerIndex, colors, groupSize, uniqueMode } from "$lib/stores.js";
  import { onMount } from "svelte";
  import { updateEntries, drawWheel, pickName, draw } from "$lib/wheelFuncs.js";

  
  const spinWheel = () => {
    wheelActive.set(true);

    let winners = [];
    for (let i=0; i<$wheels.length; i++) {
      let w = pickName($entries, $uniqueMode ? [...winners] : []);
      winners.push(w);
    }

    winnerIndex.set(winners);

    wheels.update(wh => wh.map((w,i) => {
      let r = w.rotation;
      let winner = $entries[winners[i]];
      let randAngle = (Math.random() - 0.5) * winner.angle;

      w.rotation = r + 3600 - r%360 -(randAngle + winner.rotate);
      return w;
    }))

    setTimeout(() => winPopup.set(true), 11000);
  }

  entries.update(updateEntries);
  $: $entries, $advancedMode, $colors, entries.update(updateEntries);

  onMount(draw);

  entries.subscribe(e => {
    $wheels.forEach(w => {
      drawWheel(e, w.ctx);
    });
    if ($uniqueMode) groupSize.update(n => Math.min(n, e.length));
  });
</script>

<div class="flex gap-16 flex-wrap justify-center items-center mt-8 mb-20">
  {#each $wheels as { id, ctx, size, textSize, rotation } (id)}
  <div class="aspect-square relative" style="width: {size}">
    <div class="rounded-full overflow-hidden">
      <canvas
        height="1000px"
        width="1000px"
        class="wheel h-full w-full rounded-full overflow-hidden bg-gray-200"
        {id}
        style="transform: rotate({rotation}deg)"
      />
    </div>

    <div class="center bg-white rounded-full aspect-square grid place-items-center font-bold text-gray-400 uppercase h-[20%]" style="font-size: {textSize}px;">
      Spin
    </div>

    <button
      class="center rounded-full aspect-square grid place-items-center h-full w-full {$wheelHover ? "bg-black/20" : ""} disabled:bg-transparent transition"
      on:click={spinWheel}
      on:mouseenter={() => wheelHover.set(true)}
      on:mouseleave={() => wheelHover.set(false)}
      disabled={$sidebarActive || $wheelActive}
    />

    <img
      src="/triangle.png"
      alt=""
      class="absolute top-1/2 right-[-11%] h-[12%]"
      style="transform: translateY(-50%) translateX(-50%);"
    />
  </div>
  {/each}
</div>

<style>
  .wheel {
    transition: transform 10s;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
  }
</style>
