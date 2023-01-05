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

      return { ...e, angle, rotate, color };
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

    setTimeout(() => winPopup.set(true), 1100);
  }

  $: $entries, $advancedMode, entries.update(updateEntries);
</script>

<div
  class="wheel aspect-square rounded-full relative overflow-hidden shadow-lg h-[min(80vw,80vh)]"
  style="transform: rotate({$rotation}deg)"
>
  {#each $entries as { name, angle, rotate, color, id } (id)}
    <div
      class="grid grid-cols-2 place-items-center lg:gap-60 md:gap-40 sm:gap-28 gap-20 {angle > 180 ? 'big' : ''}"
      style="--angle: {angle}deg; --rotate: {rotate}deg; --bg-color: {color}"
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
    transition: transform 1s;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
  }

  .wheel div {
    height: 100%;
    width: 100%;
    position: absolute;

    --angle: 0deg;
    --rotate: 0deg;
    --bg-color: #000;

    --point-0: calc(var(--40) + cos(var(--angle) / 2) * var(--40)) calc(var(--40) - sin(var(--angle) / 2) * var(--40));
    --point-1: calc(var(--40) + cos(var(--angle) / 2) * var(--40)) calc(var(--40) + sin(var(--angle) / 2) * var(--40));

    clip-path: polygon(
      var(--40) var(--40),
      var(--point-0),
      100% 0,
      100% 100%,
      var(--point-1)
    );

    transform: rotate(var(--rotate));
    background-color: var(--bg-color);
  }

  .wheel div.big {
    clip-path: polygon(
      var(--40) var(--40),
      var(--point-0),
      0 0,
      100% 0,
      100% 100%,
      0 100%,
      var(--point-1)
    );
  }
</style>