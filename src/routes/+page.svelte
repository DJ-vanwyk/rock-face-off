<script lang="ts">
	import CompCard from '$lib/components/CompCard.svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs, query, where } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let competitions: any[] = [];

	onMount(async () => {
		const q = query(collection(db, 'competitions'));

		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			let comp = doc.data();
			comp['id'] = doc.id;

			console.log(comp);

			competitions = [...competitions, comp];
		});
	});
</script>

<div class="p-4">
	{#each competitions as comp}
		<CompCard {comp} />
	{/each}
</div>
