<script lang>
	import { pageScrollStore } from '$lib/stores/pageScroll.store';
	import { fade } from 'svelte/transition';

	let headerHight = 0;
</script>

<div>
	{#if $pageScrollStore > 0.5 * headerHight}
		<div class="fixed top-0 left-0 right-0 z-30" transition:fade>
			<slot name="scrollHeader" />
		</div>
	{/if}

	<div class="p-4 mt-4" bind:clientHeight={headerHight}>
		<slot />
	</div>
</div>
