import { writable } from 'svelte/store';

let notifications = writable([]);

export default notifications;