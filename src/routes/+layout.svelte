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
	import Icon from '@iconify/svelte';
	import { AppwriteException } from 'appwrite';

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

	$: if ($loadErrorStore.length > 0) {
		console.log($loadErrorStore);
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
				<div class=" p-4">
					<div class="flex items-center justify-between mb-4">
						<h1 class="text-error-500 text-4xl font-bold">Error</h1>
						<button class="btn-icon variant-filled-secondary" on:click={() => location.reload()}>
							<Icon icon="ion:reload" class="text-2xl" />
						</button>
					</div>
					{#each $loadErrorStore as error}
						<div class="card variant-soft-error p-4 mb-2">
							{#if error instanceof AppwriteException}
								{error.stack}
							{:else}
								{error}
							{/if}
						</div>
					{/each}
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
