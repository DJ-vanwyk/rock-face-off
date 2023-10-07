<script lang="ts">
	import '../app.postcss';
	import { AppShell, Modal, Toast, type ModalComponent } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	import Auth from '$lib/components/auth/Auth.svelte';
	import TabNav from '$lib/components/TabNav.svelte';
	import { pageScrollStore } from '$lib/stores/pageScroll.store';
	import ModalSelectList from '$lib/components/ModalSelectList.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { userStore } from '$lib/stores/user.store';
	import { account } from '$lib/appwrite';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Modal Init
	initializeStores();

	// Custom Modal Registry
	const modalComponentRegistry: Record<string, ModalComponent> = {
		selectComponent: {
			// Pass a reference to your custom component
			ref: ModalSelectList
		}
	};

	// Capture scroll event
	function onPageScroll(e: Event) {
		$pageScrollStore = (e.target as HTMLDivElement).scrollTop;
	}

	onAuthStateChanged(auth, (user) => {
		$userStore = user;
	});
</script>

<!-- Modal -->
<Modal components={modalComponentRegistry} />
<!-- Modal -->
<Toast />

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
