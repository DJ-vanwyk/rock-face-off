<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import Restricted from './auth/Restricted.svelte';
</script>

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
		<!-- <span class="text-xs">Home</span> -->
	</TabAnchor>
	<TabAnchor href="/competitions" selected={$page.url.pathname === '/competitions'}>
		<svelte:fragment slot="lead">
			<div class="flex justify-center pt-1">
				<Icon icon="ion:trophy" class="text-2xl text-center" />
			</div>
		</svelte:fragment>
		<!-- <span class="text-xs">Comps</span> -->
	</TabAnchor>
	<Restricted>
		<TabAnchor href="/competitions/new" selected={$page.url.pathname === '/competitions/new'}>
			<svelte:fragment slot="lead">
				<div class="flex justify-center pt-1">
					<Icon icon="ion:add-sharp" class="text-2xl text-center" />
				</div>
			</svelte:fragment>
			<!-- <span class="text-xs">Gyms</span> -->
		</TabAnchor>
	</Restricted>

	<TabAnchor href="/profile" selected={$page.url.pathname === '/profile'}>
		<svelte:fragment slot="lead">
			<div class="flex justify-center pt-1">
				<Icon icon="ion:person" class="text-2xl text-center" />
			</div>
		</svelte:fragment>
	</TabAnchor>

	<!-- ... -->
</TabGroup>
