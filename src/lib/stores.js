import { writable, readable, derived } from "svelte/store";

export let defEntries = [
  { name: "Ali", prob: 1, id: Math.random() },
  { name: "Beatriz", prob: 1, id: Math.random() },
  { name: "Charles", prob: 1, id: Math.random() },
  { name: "Diya", prob: 1, id: Math.random() },
  { name: "Eric", prob: 1, id: Math.random() },
  { name: "Fatima", prob: 1, id: Math.random() },
  { name: "Gabriel", prob: 1, id: Math.random() },
  { name: "Hanna", prob: 1, id: Math.random() }
]

export let defColors = [
  { val: "#009925", id: Math.random() },
  { val: "#eeb211", id: Math.random() },
  { val: "#d50f25", id: Math.random() },
  { val: "#3369e8", id: Math.random() }
]

export let entries = writable(defEntries);
export let colors = writable(defColors);
export let Xpages = writable([]);
export let Xcurrent = writable(0);

export let totalProb = derived(entries, $entries => {
  return $entries.reduce((p, c) => p + c.prob, 0)
});

export let results = writable([]);

export let sidebarActive = writable(false);
export let editTab = writable(true);
export let resultsTab = derived(editTab, $editTab => !$editTab);
export let wheelActive = writable(false);
export let advancedMode = writable(false);

export let rotation = writable(0);

export let helpPopup = writable(false);
export let colorPopup = writable(false);
export let winPopup = writable(false);
export let uploadPopup = writable(false);

export let winnerIndex = writable(0);