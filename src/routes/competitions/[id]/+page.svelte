<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- {#await compPromise then comp}
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
			</AppBar>
		</svelte:fragment>
		<a class="btn btn-sm variant-filled-secondary" href="/competitions">
			<span><Icon icon="ion:chevron-back" /></span>
			<span>Back</span>
		</a>
		<h1 class="text-3xl pt-4">{comp.name}</h1>
	</PageHeader>

	<div class="p-4">
		<div class="btn-group variant-filled mb-4">
			<button>Enter</button>
			<button on:click={goToScoreBoard}>Scoreboard</button>
		</div>
		<div class="card mb-4">
			<header>
				<h1 class="h1 p-4 pb-0">{comp.name}</h1>
				<h2 class="px-4">Hosted By: <b>{comp.createdBy.displayName}</b></h2>
			</header>
			<section class="p-4">
				<h3>Type: <b>{comp.climbingType}</b></h3>
				<h3>Rounds: <b> {comp.rounds.length}</b></h3>
				<h3>From: <b>{new Date(comp.startDate).toLocaleString()}</b></h3>
				<h3>To: <b>{new Date(comp.endDate).toLocaleString()}</b></h3>
				<p class="text-sm py-2">{comp.description}</p>
				<h3 class="font-bold">Age Categories</h3>
				<ul>
					{#each comp.ageCategories as category}
						<li class="list-disc list-inside text-sm">{category}</li>
					{/each}
				</ul>
			</section>
		</div>
	</div>
{/await} -->
