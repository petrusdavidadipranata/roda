<script>
  import { entries, totalProb, results, rotation, sidebarActive, wheelActive, advancedMode, winPopup, winnerIndex, colors } from "$lib/stores.js";
  import { onMount } from "svelte";
  
  const updateEntries = storeValue => {
    let shift = 0;

    storeValue = storeValue.map((e, i) => {
      let trueAngle = (e.prob / $totalProb) * 360;
      let safeAngle = 360 / storeValue.length;

      let angle = $advancedMode ? trueAngle : safeAngle;
      shift += angle
      let rotate = shift - angle / 2;
      let color = $colors[i % $colors.length];

      let rad = angle * Math.PI / 180;

      let p0x = Math.cos(rad/2) * 500;
      let p0y = -Math.sin(rad/2) * 500;
      let p1x = Math.cos(rad/2) * 500;
      let p1y = Math.sin(rad/2) * 500;

      return { ...e, angle, p0: [p0x, p0y], p1: [p1x, p1y], rotate, color };
    });

    if (storeValue.length % $colors.length === 1) {
      storeValue[storeValue.length - 1].color = $colors[2];
    }

    return storeValue;
  }

  const spinWheel = () => {
    wheelActive.set(true);

    let rand = Math.random() * $totalProb;
    let totalProb2 = 0;
    let i;

    for (i = 0; i < $entries.length; i++) {
      totalProb2 += $entries[i].prob;
      if (totalProb2 >= rand) break;
    }

    winnerIndex.set(i);
    let winner = $entries[i];

    let randAngle = (Math.random() - 0.5) * winner.angle;
    rotation.update(r => r + 3600 - r%360 +  -(randAngle + winner.rotate));

    let {id, ...rest} = winner;
    results.update(r => [...r, {...rest, id: Math.random()}]);

    setTimeout(() => winPopup.set(true), 11000);
  }

  entries.update(updateEntries);
  $: $entries, $advancedMode, entries.update(updateEntries);

  let ctx = false;

  onMount(() => {
    ctx = document.querySelector("canvas").getContext("2d");
    ctx.translate(500,500)

    entries.update(e => e);
  })
  
  entries.subscribe(e => {
    if (!ctx) return;

    ctx.clearRect(-500,-500,500,500);
    ctx.font = "40px Arial";

    e.forEach(({ name, angle, p0, p1, color, rotate }) => {
      if (!p0 || !p1) return;
      if (!angle) return

      ctx.rotate(rotate * Math.PI / 180);
      ctx.beginPath();

      ctx.moveTo(0, 0);
      ctx.lineTo(...p0);
      if (angle > 180) ctx.lineTo(-500, -500);
      ctx.lineTo(500, -500);
      ctx.lineTo(500, 500);
      if (angle > 180) ctx.lineTo(-500, 500);
      ctx.lineTo(...p1);

      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill()

      ctx.fillStyle = "white";
      let w = ctx.measureText(name).width;
      ctx.fillText(name, 300-w/3, 16)

      ctx.rotate(-rotate * Math.PI / 180);
    });
  }); 
</script>

<div
  class="aspect-square rounded-full relative overflow-hidden h-[min(80vw,80vh)]"
>
  <canvas
    height="1000px"
    width="1000px"
    class="wheel h-full w-full"
    style="transform: rotate({$rotation}deg)"
  />
</div>

<button
  class="center rounded-full bg-white aspect-square grid place-items-center font-bold text-gray-400 uppercase md:text-4xl sm:text-3xl text-xl h-[min(15vw,15vh)]"
>
  Spin
</button>

<button
  class="center rounded-full aspect-square transition h-[min(80vw,80vh)] hover:bg-black/20 disabled:bg-transparent shadow-lg"
  on:click={spinWheel}
  disabled={$sidebarActive || $wheelActive}
/>

<img
  src="/triangle.png"
  alt=""
  class="center left-[calc(100vw-50vw+min(40vh,40vw))] md:h-20 sm:h-16 h-12"
/>

<style>
  .wheel {
    transition: transform 10s;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
  }
</style>
