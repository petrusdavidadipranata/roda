import { advancedMode, colors, wheels, entries } from "$lib/stores.js";
import { get } from 'svelte/store'

export const updateEntries = (storeValue) => {
  let shift = 0;
  let totalProb = storeValue.reduce((p, c) => p + c.prob, 0);
  let colors_ = get(colors);
  let adv = get(advancedMode);

  storeValue = storeValue.map((e, i) => {
    let trueAngle = (e.prob / totalProb) * 360;
    let safeAngle = 360 / storeValue.length;

    let angle = adv ? trueAngle : safeAngle;
    shift += angle
    let rotate = shift - angle / 2;
    let color = colors_[i % colors_.length].val;

    let rad = angle * Math.PI / 180;

    let p0x = Math.cos(rad/2) * 500;
    let p0y = -Math.sin(rad/2) * 500;
    let p1x = Math.cos(rad/2) * 500;
    let p1y = Math.sin(rad/2) * 500;

    return { ...e, angle, p0: [p0x, p0y], p1: [p1x, p1y], rotate, color };
  });

  if (storeValue.length % colors_.length === 1) {
    storeValue[storeValue.length - 1].color = colors_[1].val;
  }

  return storeValue;
}

export const drawWheel = (e, ctx) => {
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
}

export const pickName = (entr, exclude) => {
  exclude.sort();
  let list = entr.filter((e, i) => !exclude.includes(i));

  let totalProb = list.reduce((p, c) => p + c.prob, 0);
  let rand = Math.random() * totalProb;
  let totalProb2 = 0;

  let i;

  for (i = 0; i < list.length; i++) {
    totalProb2 += list[i].prob;
    if (totalProb2 >= rand) break;
  }

  for (let j=0; j<exclude.length; j++) {
    if (exclude[j] <= i) i++;
  }

  return i;
}

export const draw = () => {
  wheels.update(wh => wh.map(w => {
    w.ctx = document.getElementById(w.id).getContext("2d");
    w.ctx.translate(500,500);
    return w;
  }));

  entries.update(e => e);
}
