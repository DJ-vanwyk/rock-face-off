<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<PageHeader>
	<svelte:fragment slot="scrollHeader">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			class="shadow-xl"
		>
			<svelte:fragment slot="lead">
				<Icon icon="ion:arrow-back" class="text-2xl" />
			</svelte:fragment>
			Page Header
			<!-- <svelte:fragment slot="trail">(actions)</svelte:fragment> -->
		</AppBar>
	</svelte:fragment>

	<h1 class="text-3xl">Page Header</h1>
</PageHeader>

<div class="bg-green-100 h-[1000px]" />
