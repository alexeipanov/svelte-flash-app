<script>
	let queue = [];

	import notifications from './notifications.js';
	import Notification from './Notification.svelte';

	notifications.subscribe((value) => {
		queue = value;
	});
</script>

<div class="flash-list">
	{#each queue as message, index}
		<Notification message={message} index={index}>
			<div class="relative">
	      {index}::{@html message.message}
	      <div class="close-container">
	        <div role="button" name="close" class="flash-close">
	          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="xmark-icon" fill="currentColor">
							<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
						</svg>
	        </div>
	      </div>
	    </div>
		</Notification>
	{/each}
</div>