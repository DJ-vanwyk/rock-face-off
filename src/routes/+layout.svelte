<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, TabGroup, TabAnchor, Avatar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Auth from '$lib/components/auth/Auth.svelte';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<Auth>
	<AppShell regionPage="no-scrollbar">
		<!-- Page Route Content -->
		<slot />
		<svelte:fragment slot="footer">
			<TabGroup
				justify="justify-center"
				active="text-primary-500"
				hover="hover:variant-soft-primary"
				flex="flex-1 lg:flex-none"
				border=""
				rounded=""
				class="bg-surface-50 w-full"
			>
				<TabAnchor href="/" selected={$page.url.pathname === '/'}>
					<svelte:fragment slot="lead">
						<div class="flex justify-center pt-1">
							<Icon icon="ion:home" class="text-2xl text-center" />
						</div>
					</svelte:fragment>
					<span class="text-sm">Home</span>
				</TabAnchor>
				<TabAnchor href="/" selected={$page.url.pathname === '/profile'}>
					<svelte:fragment slot="lead">
						<div class="flex justify-center pt-1">
							<Icon icon="ion:trophy" class="text-2xl text-center" />
						</div>
					</svelte:fragment>
					<span class="text-sm">Comps</span>
				</TabAnchor>
				<TabAnchor href="/" selected={$page.url.pathname === '/profile'}>
					<svelte:fragment slot="lead">
						<div class="flex justify-center pt-1">
							<Icon icon="ion:person" class="text-2xl text-center" />
						</div>
					</svelte:fragment>
					<span class="text-sm">Profile</span>
				</TabAnchor>
				<TabAnchor href="/" selected={$page.url.pathname === '/profile'}>
					<!-- <svelte:fragment slot="lead">
						<div class="flex justify-center pt-1">
							<Icon icon="ion:person" class="text-2xl text-center" />
						</div>
					</svelte:fragment> -->
					<div class="flex justify-center items-center h-full">
						<Avatar
							initials="dj"
							width="w-12"
							background="variant-filled-primary"
							class="text-white"
						/>
					</div>
					<!-- <span class="text-sm">Profile</span> -->
				</TabAnchor>

				<!-- ... -->
			</TabGroup>
		</svelte:fragment>
	</AppShell>
</Auth>
