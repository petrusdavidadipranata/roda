<script>
  import { entries, totalProb, results, rotation, sidebarActive, wheelActive, advancedMode, winPopup, winnerIndex, colors } from "$lib/stores.js";
  
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

      let p0x = 40 + Math.cos(rad/2) * 40;
      let p0y = 40 - Math.sin(rad/2) * 40;
      let p1x = 40 + Math.cos(rad/2) * 40;
      let p1y = 40 + Math.sin(rad/2) * 40;

      return { ...e, angle, p0x, p0y, p1x, p1y, rotate, color };
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

  $: $entries, $advancedMode, entries.update(updateEntries);
</script>

<div
  class="wheel aspect-square rounded-full relative overflow-hidden shadow-lg h-[min(80vw,80vh)]"
  style="transform: rotate({$rotation}deg)"
>
  {#each $entries as { name, angle, p0x, p0y, p1x, p1y, rotate, color, id } (id)}
    <div
      class="grid grid-cols-2 place-items-center lg:gap-60 md:gap-40 sm:gap-28 gap-20 {angle > 180 ? "big" : ""}"
      style="--rotate: {rotate}deg; --bg-color: {color}; --p0x:{p0x}; --p0y:{p0y}; --p1x:{p1x}; --p1y:{p1y};"
    >
      <span />
      <span class="text-white lg:text-3xl md:text-2xl sm:text-xl font-semibold">
        {name}
      </span>
    </div>
  {/each}
</div>

<button
  class="center rounded-full bg-white aspect-square grid place-items-center font-bold text-gray-400 uppercase md:text-4xl sm:text-3xl text-xl h-[min(15vw,15vh)]"
>
  Spin
</button>

<button
  class="center rounded-full aspect-square transition h-[min(80vw,80vh)] hover:bg-black/20 disabled:bg-transparent"
  on:click={spinWheel}
  disabled={$sidebarActive || $wheelActive}
/>

<img
  src="/triangle.png"
  alt=""
  class="center left-[calc(100vw-50vw+min(40vh,40vw))] md:h-20 sm:h-16 h-12"
/>

<style>
  :root {
    --40: min(40vw, 40vh);
  }

  .wheel {
    transition: transform 10s;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
  }

  .wheel div {
    height: 100%;
    width: 100%;
    position: absolute;

    --angle: 0deg;
    --rotate: 0deg;
    --bg-color: #000;

    --p0x: 76.95;
    --p0y: 24.69;
    --p1x: 76.95;
    --p1y: 55.43;

    --point-0x: calc(var(--p0x) * min(1vh, 1vw));
    --point-0y: calc(var(--p0y) * min(1vh, 1vw));
    --point-1x: calc(var(--p1x) * min(1vh, 1vw));
    --point-1y: calc(var(--p1y) * min(1vh, 1vw));

    clip-path: polygon(
      var(--40) var(--40),
      var(--point-0x) var(--point-0y),
      100% 0,
      100% 100%,
      var(--point-1x) var(--point-1y)
    );

    transform: rotate(var(--rotate));
    background-color: var(--bg-color);
  }

  .wheel div.big {
    clip-path: polygon(
      var(--40) var(--40),
      var(--point-0x) var(--point-0y),
      0 0,
      100% 0,
      100% 100%,
      0 100%,
      var(--point-1x) var(--point-1y)
    );
  }
</style>