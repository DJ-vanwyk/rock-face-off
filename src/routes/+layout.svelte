<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		Modal,
		Toast,
		type ModalComponent,
		ProgressRadial
	} from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	import Auth from '$lib/components/auth/Auth.svelte';
	import TabNav from '$lib/components/TabNav.svelte';
	import { pageScrollStore } from '$lib/stores/pageScroll.store';
	import ModalSelectList from '$lib/components/ModalSelectList.svelte';
	import { user } from '$lib/stores/user.store';
	import { navigating } from '$app/stores';
	import { loadErrorStore } from '$lib/stores/loadErrors.store';

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
</script>

<!-- Modal -->
<Modal components={modalComponentRegistry} />
<!-- Modal -->
<Toast />

<!-- App Shell -->

{#if $user !== undefined}
	<Auth>
		<AppShell regionPage="no-scrollbar" on:scroll={onPageScroll}>
			<!-- Page Route Content -->

			{#if $navigating}
				<div class="h-screen flex justify-center items-center">
					<ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />
				</div>
			{:else if $loadErrorStore.length > 0}
				<div class="h-screen flex justify-center items-center">
					<ProgressRadial
						stroke={100}
						meter="stroke-secondary-500"
						track="stroke-secondary-500/30"
					/>
				</div>
			{:else}
				<slot />
			{/if}
			<svelte:fragment slot="footer">
				<TabNav />
			</svelte:fragment>
		</AppShell>
	</Auth>
{:else}
	<div class="h-screen flex justify-center items-center">
		<ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />
	</div>
{/if}
