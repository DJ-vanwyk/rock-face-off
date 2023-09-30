<script lang="ts">
	import CompCard from '$lib/components/CompCard.svelte';
	import { db } from '$lib/firebase';
	import Icon from '@iconify/svelte';
	import { collection, getDocs, query, where } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let competitions: any[] = [];

	onMount(async () => {
		const q = query(collection(db, 'competitions'));

		const querySnapshot = await getDocs(q);

		// querySnapshot.forEach((doc) => {
		// 	// doc.data() is never undefined for query doc snapshots
		// 	let comp = doc.data();
		// 	comp['id'] = doc.id;

		// 	console.log(comp);

		// 	competitions = [...competitions, comp];
		// });
	});
</script>

<div class="p-4">
	<img src="/logos/logo-no-background.svg" alt="" class="w-40 py-4" />

	<h1 class="text-3xl pb-4">Welcome back, DJ!</h1>

	<div class="flex justify-between items-center pb-4">
		<h1 class="text-lg">Your Competitions</h1>
		<button
			class="
            flex
            gap-1
            items-center
            text-primary-500
        "
		>
			All
			<Icon icon="ion:chevron-forward" />
		</button>
	</div>
	{#each competitions as comp}
		<CompCard {comp} />
	{/each}

	<div class="overflow-auto no-scrollbar snap-x">
		<div class="flex w-fit gap-3">
			<div class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start" />
			<div class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start" />
			<div class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start" />
			<div class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start" />
			<div class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start" />
		</div>
	</div>
	<h1 class="text-lg pb-4">New @ your gym</h1>

	<div class="card h-56 variant-filled-tertiary mb-4" />
	<div class="card h-56 variant-filled-tertiary mb-4" />
	<div class="card h-56 variant-filled-tertiary mb-4" />
	<div class="card h-56 variant-filled-tertiary mb-4" />
	<div class="card h-56 variant-filled-tertiary mb-4" />
	<div class="card h-56 variant-filled-tertiary mb-4" />
	<div class="card h-56 variant-filled-tertiary mb-4" />
</div>
