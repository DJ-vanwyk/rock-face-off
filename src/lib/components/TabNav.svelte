<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { Avatar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
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
		<span class="text-xs">Home</span>
	</TabAnchor>
	<TabAnchor href="/competitions" selected={$page.url.pathname === '/competitions'}>
		<svelte:fragment slot="lead">
			<div class="flex justify-center pt-1">
				<Icon icon="ion:trophy" class="text-2xl text-center" />
			</div>
		</svelte:fragment>
		<span class="text-xs">Comps</span>
	</TabAnchor>
	<TabAnchor href="/competitions" selected={$page.url.pathname === '/gyms'}>
		<svelte:fragment slot="lead">
			<div class="flex justify-center pt-1">
				<Icon icon="map:gym" class="text-2xl text-center" />
			</div>
		</svelte:fragment>
		<span class="text-xs">Gyms</span>
	</TabAnchor>

	<TabAnchor href="/" selected={$page.url.pathname === '/profile'}>
		<!-- <svelte:fragment slot="lead">
						<div class="flex justify-center pt-1">
							<Icon icon="ion:person" class="text-2xl text-center" />
						</div>
					</svelte:fragment> -->
		<div class="flex justify-center items-center h-full">
			<Avatar initials="dj" width="w-12" background="variant-filled-primary" class="text-white" />
		</div>
	</TabAnchor>

	<!-- ... -->
</TabGroup>
