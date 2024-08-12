<script>
	import notifications from './notifications.js';
	import Notifications from './Notifications.svelte';

	function addError() {
		let notification = { id: $notifications.length, node: null, type: 'error', message: 'Something is going wrong!' };
		notifications.update((n) => [...n, notification])
	}

	function addWarning() {
		let notification = { id: $notifications.length, node: null, type: 'warning', message: 'Doubtful but OK!' };
		notifications.update((n) => [...n, notification])
	}

	function addSuccess() {
		let notification = { id: $notifications.length, node: null, type: 'success', message: 'Operation performed successfully' };
		notifications.update((n) => [...n, notification])
	}

	function addInfo() {
		let notification = { id: $notifications.length, node: null, type: 'info', message: 'Multiline text<br />information' };
		notifications.update((n) => [...n, notification])
	}
</script>

<h1>Click to display a notification</h1>

<Notifications />

<button class="bg-rose-500" type="button" on:click={addError}>Error</button>
<button class="bg-amber-500" type="button" on:click={addWarning}>Warning</button>
<button class="bg-lime-500" type="button" on:click={addSuccess}>Success</button>
<button class="bg-sky-500" type="button" on:click={addInfo}>Info</button>