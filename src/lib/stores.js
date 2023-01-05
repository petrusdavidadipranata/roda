import { writable, readable, derived } from "svelte/store";

export let entries = writable([
  { name: "Ali", prob: 1, id: Math.random() },
  { name: "Beatriz", prob: 1, id: Math.random() },
  { name: "Charles", prob: 1, id: Math.random() },
  { name: "Diya", prob: 1, id: Math.random() },
  { name: "Eric", prob: 1, id: Math.random() },
  { name: "Fatima", prob: 1, id: Math.random() },
  { name: "Gabriel", prob: 1, id: Math.random() },
  { name: "Hanna", prob: 1, id: Math.random() }
]);

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
export let winPopup = writable(false);

export let winnerIndex = writable(0);

export const colors = readable([
  "#009925",
  "#eeb211",
  "#d50f25",
  "#3369e8"
]);
