<script lang="ts">
	import IconSelectChip from '$lib/components/IconSelectChip.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { Competition } from './new/types';
	import { goto } from '$app/navigation';

	let comps: Competition[] = [];

	function onCompClick(comp: Competition) {
		goto(`/competitions/${comp.id}`, {
			state: {
				competition: comp
			}
		});
	}
</script>

<PageHeader>
	<svelte:fragment slot="scrollHeader">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			padding="p-2 py-4"
			class="shadow-xl"
			regionRowHeadline="!mt-1"
		>
			<svelte:fragment slot="lead">
				<h1 class="text-left font-bold">Competitions</h1>
			</svelte:fragment>

			<svelte:fragment slot="headline">
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim"><Icon icon="ion:search" class="text-2xl" /></div>
					<input type="search" placeholder="Search..." />
					<button class="variant-filled-secondary">Submit</button>
				</div>
				<div class="flex gap-2 pt-1">
					<IconSelectChip
						icon="ion:filter"
						options={['All', 'Active', 'History']}
						modalTitle="Filter"
						value={'All'}
					/>
					<IconSelectChip
						icon="ion:swap-vertical"
						options={['Date: Oldest', 'Date: Newest', 'A-Z', 'Z-A']}
						modalTitle="Filter"
						value={'Date: Newest'}
					/>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<h1 class="text-2xl pb-2">Competitions</h1>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">
			<Icon icon="ion:search" class="text-2xl" />
		</div>
		<input type="search" placeholder="Search..." />
		<button class="variant-filled-secondary">Submit</button>
	</div>
	<div class="flex gap-2 pt-2">
		<IconSelectChip
			icon="ion:filter"
			options={['All', 'Active', 'History']}
			modalTitle="Filter"
			value={'All'}
		/>
		<IconSelectChip
			icon="ion:swap-vertical"
			options={['Date: Oldest', 'Date: Newest', 'A-Z', 'Z-A']}
			modalTitle="Filter"
			value={'Date: Newest'}
		/>
	</div>
</PageHeader>

<div class="p-4">
	{#each comps as newComp}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="card mb-4" on:click={() => onCompClick(newComp)}>
			<header>
				<h1 class="h1 p-4 pb-0">{newComp.name}</h1>
				<h2 class="px-4">Hosted By: <b>{newComp.createdBy.displayName}</b></h2>
			</header>
			<section class="p-4">
				<h3>Type: <b>{newComp.climbingType}</b></h3>
				<h3>Rounds: <b> {newComp.rounds.length}</b></h3>
				<h3>From: <b>{new Date(newComp.startDate).toLocaleString()}</b></h3>
				<h3>To: <b>{new Date(newComp.endDate).toLocaleString()}</b></h3>
				<p class="text-sm py-2">{newComp.description}</p>
				<h3 class="font-bold">Age Categories</h3>
				<ul>
					{#each newComp.ageCategories as category}
						<li class="list-disc list-inside text-sm">{category}</li>
					{/each}
				</ul>
			</section>
		</div>
	{/each}
</div>
