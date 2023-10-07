<script lang="ts">
	import type { Competition } from './types';

	export let newComp: Competition;
</script>

<div class="card">
	<header>
		<h1 class="h1 p-4 pb-0">{newComp.name}</h1>
		<h2 class="px-4">Hosted By: <b>{newComp.createdBy.displayName}</b></h2>
	</header>
	<section class="p-4">
		<h3>Type: <b>{newComp.climbingType}</b></h3>
		<h3>Rounds: <b>{newComp.rounds.length}</b></h3>
		<h3>From: <b>{newComp.startDate}</b></h3>
		<h3>To: <b>{newComp.endDate}</b></h3>
		<p class="text-sm py-2">{newComp.description}</p>
		<h3 class="font-bold">Age Categories</h3>
		<ul>
			{#each newComp.ageCategories as category}
				<li class="list-disc list-inside text-sm">{category}</li>
			{/each}
		</ul>
	</section>
</div>
