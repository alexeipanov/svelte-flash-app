<script>
	let closeTask;
	export let index;
	export let message;
	export let onClose = (notification) => notification;

	import { get } from 'svelte/store';
	import { beforeUpdate, onMount, onDestroy } from 'svelte';
	import notifications from './notifications.js';

	let element;
	const closedState = 'closed';

	const listenerOptions = {
	  passive: false,
	  once: true,
	};

	function autoClose(element, duration) {
		return setTimeout(
			function () {
        if (!duration) {
          return;
        }

        element.hidePopover();
      },
      duration
    );
  }

	onMount(() => {
		message.node.showPopover();
		closeTask = autoClose(message.node, 5000);
	});

	onDestroy(() => {
		// console.log('ondestroy', message.node);
		// clearTimeout(closeTask);
		// onClose(message);
	});

	beforeUpdate(() => {
		
	});

	const show = (node) => {
		if (message.node) {
			return;
		}

		message.node = node;
	}

	function removeNotification() {
		let queue = get(notifications);
		console.log('onremove', index);
		if (index >= 0) {
			queue.splice(index, 1);
			// notifications.update(() => queue);
		}
	}

	const onToggle = (event) => {
		console.log('ontoggle', event.target, message.node);
		if (message.node !== event.target) {
			return;
		} 
		if (event.newState === closedState) {
      message.node.addEventListener('transitionend', () => removeNotification(), listenerOptions);
    } else {
      let closeButton = message.node.querySelector('[name="close"]');
      closeButton?.addEventListener('click', () => message.node.hidePopover(), listenerOptions);
    }
	};

	const onBeforeToggle = (event) => {
		console.log('onbeforetoggle', event.target);
		if (message.node !== event.target) {
			return;
		}
		let top = 0;
    let list = message.node.closest('.flash-list');
    let popovers = list?.querySelectorAll('[popover]:popover-open');

    for (let popover of popovers) {
      if (popover !== message.node) {
        top += popover.offsetHeight;
      }

      if (event.newState === closedState) {
        popover.style.top = top - popover.offsetHeight + 'px';
      } else {
        message.node.style.top = top + 'px';
      }
    }
	}
</script>

<div
  role="alert"
  class="flash {message.type}"
  popover="manual"
  bind:this={message.node}
  on:toggle={onToggle}
  on:beforetoggle={onBeforeToggle}
>
  <slot />
</div>

<style>
	
</style>