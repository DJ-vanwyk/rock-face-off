<script lang>
	import { pageScrollStore } from '$lib/stores/pageScroll.store';
	import { fly } from 'svelte/transition';

	let headerHight = 0;
	let prevHeight = 0;
	let showScrollHeader = false;

	$: {
		if ($pageScrollStore > 0.5 * headerHight) {
			if (prevHeight > $pageScrollStore) {
				// Scroll up
				showScrollHeader = true;
				prevHeight = $pageScrollStore;
			} else if ($pageScrollStore - prevHeight > 100) {
				// Scroll down
				showScrollHeader = false;
				prevHeight = $pageScrollStore;
			}
		} else {
			showScrollHeader = false;
			prevHeight = $pageScrollStore;
		}
	}
</script>

<div>
	{#if showScrollHeader}
		<div class="fixed top-0 left-0 right-0 z-30" transition:fly={{ y: -(headerHight / 2) }}>
			<slot name="scrollHeader" />
		</div>
	{/if}

	<div class="p-4 mt-4" bind:clientHeight={headerHight}>
		<slot />
	</div>
</div>
