<script lang="ts">
	import IconSelectChip from '$lib/components/IconSelectChip.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import type { Competition } from './new/types';
	import { goto } from '$app/navigation';
	import { databases, db } from '$lib/appwrite';

	function onCompClick(comp: Competition) {
		goto(`/competitions/${comp.id}`, {
			state: {
				competition: comp
			}
		});
	}

	let compPromise = databases.listDocuments(db, 'competitions', []);
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
	{#await compPromise then competitions}
		{#each competitions.documents as competition}
			<a href="/competitions/{competition.$id}">
				<div class="card overflow-hidden relative h-52 mb-3">
					<img src={competition.imgUrl} alt="" class="z-0" />
					<div
						class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-white/0 to-gray-700/100 text-white p-4 flex flex-col justify-end"
					>
						<h1 class="font-bold text-xl">{competition.name}</h1>
						<h2>{competition.organization}</h2>
					</div>
				</div>
			</a>
		{/each}
	{/await}
</div>
