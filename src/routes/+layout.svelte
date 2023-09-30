<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Auth from '$lib/components/auth/Auth.svelte';
	import TabNav from '$lib/components/TabNav.svelte';
	import { pageScrollStore } from '$lib/stores/pageScroll.store';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	function onPageScroll(e: Event) {
		$pageScrollStore = (e.target as HTMLDivElement).scrollTop;
	}
</script>

<!-- App Shell -->
<Auth>
	<AppShell regionPage="no-scrollbar" on:scroll={onPageScroll}>
		<!-- Page Route Content -->
		<slot />
		<svelte:fragment slot="footer">
			<TabNav />
		</svelte:fragment>
	</AppShell>
</Auth>
