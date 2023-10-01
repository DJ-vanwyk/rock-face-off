<script lang="ts">
	import IconSelectChip from '$lib/components/IconSelectChip.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { db } from '$lib/firebase';
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
	import { onMount } from 'svelte';

	const q = query(collection(db, 'competitions'));

	onMount(async () => {
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data());
		});
	});

	function generateSearchArr(term: string): string[] {
		term = term.toLowerCase();
		const searchArr = [];
		for (let i = 0; i <= term.length; i++) {
			for (let j = i + 1; j <= term.length; j++) {
				searchArr.push(term.slice(i, j));
			}
		}
		// return searchArr;
		return [...new Set(searchArr)];
	}

	let searchTerm = '';
	let searchParts: string[] = [];

	function onGenerate() {
		searchParts = generateSearchArr(searchTerm);
		console.log(searchParts);
		updateDoc(doc(db, 'competitions', 'd3KkEnTnqBKUhpPknPhm'), {
			nameSearch: searchParts
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
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim"><Icon icon="ion:search" class="text-2xl" /></div>
		<input type="search" placeholder="Search..." bind:value={searchTerm} />
		<button class="variant-filled-secondary" on:click={onGenerate}>Submit</button>
	</div>
	<ol class="lineNumbers">
		{#each searchParts as part}
			<li>{part}</li>
		{/each}
	</ol>
</div>

<div class="h-[1000px]" />
