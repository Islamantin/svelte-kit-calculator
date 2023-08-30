import { writable } from 'svelte/store';

/** @type {import("svelte/store").Writable<{
 * first: string;
 * second: string;
 * operator: string;
 * result: string;}[]>} */
export const HistoryStore = writable([]);
