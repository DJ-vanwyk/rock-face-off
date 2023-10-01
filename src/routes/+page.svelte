<script lang="ts">
	import CompCard from '$lib/components/CompCard.svelte';
	import Restricted from '$lib/components/auth/Restricted.svelte';
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

	<Restricted>
		<h1 class="text-3xl pb-4">Welcome back, DJ!</h1>
	</Restricted>

	<Restricted>
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
		<div class="overflow-auto no-scrollbar snap-x">
			<div class="flex w-fit gap-3 overflow-clip">
				<a
					href="/competitions/123/scoreboard"
					class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start overflow-hidden"
				>
					<img
						src="https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/380983458_870133647897373_4580967974917754294_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=49d041&_nc_ohc=z68m9ueLXP4AX8NevPC&_nc_ht=scontent-jnb1-1.xx&oh=00_AfCaXIbbVgSVaSRrV8llC0jzr0NvY6rVO1weMCTVAdFXHg&oe=651D3375"
						alt=""
						class="object-fit w-full h-full"
					/>
				</a>
				<div class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start" />
				<div class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start" />
				<div class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start" />
				<div class="card h-56 variant-filled-tertiary mb-4 w-52 card-hover snap-start" />
			</div>
		</div>
		{#each competitions as comp}
			<CompCard {comp} />
		{/each}
	</Restricted>

	<h1 class="text-lg pb-4">Featured Comps</h1>

	<div class="mb-4">
		<div class="card h-56 variant-filled-tertiary overflow-hidden">
			<img
				src="https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/380983458_870133647897373_4580967974917754294_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=49d041&_nc_ohc=z68m9ueLXP4AX8NevPC&_nc_ht=scontent-jnb1-1.xx&oh=00_AfCaXIbbVgSVaSRrV8llC0jzr0NvY6rVO1weMCTVAdFXHg&oe=651D3375"
				alt=""
				class="object-cover w-full h-full"
			/>
		</div>
		<div class="py-4">
			<h1 class="text-2xl font-bold">Birthday Boulder Bash</h1>
			<h2 class="pb-3">Rock Valley Climbing</h2>
			<div class="flex items-center gap-1 pb-2 text-sm">
				<Icon icon="ion:calendar" class="text-lg" />
				<span>28 Oct 2023 - 31 Nov 2023</span>
			</div>
			<div class="flex items-center gap-1 pb-2 text-sm">
				<Icon icon="ion:trophy" class="text-lg" />
				<span>Flash Cup</span>
			</div>
			<div class="flex items-center gap-1 pb-2 text-sm">
				<Icon icon="guidance:climbing-wall" class="text-lg" />
				<span>Boulder</span>
			</div>
		</div>
		<hr class="!border-t-2" />
	</div>
	<div class="card h-56 variant-filled-tertiary mb-4" />
</div>
