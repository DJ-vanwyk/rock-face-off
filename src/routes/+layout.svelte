<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, TabGroup, TabAnchor, Avatar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Auth from '$lib/components/auth/Auth.svelte';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import TabNav from '$lib/components/TabNav.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<Auth>
	<AppShell regionPage="no-scrollbar">
		<!-- Page Route Content -->
		<slot />
		<svelte:fragment slot="footer">
			<TabNav />
		</svelte:fragment>
	</AppShell>
</Auth>
