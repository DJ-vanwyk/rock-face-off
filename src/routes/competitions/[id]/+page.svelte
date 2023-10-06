<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import type { Competition } from '../new/types';
	import { collection, doc, getDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { selectedComp } from '$lib/stores/selectedComp.store';

	let compPromise: Promise<Competition> = getComp();

	async function getComp() {
		if (history.state['competition']) {
			return history.state['competition'];
		} else {
			return (await getDoc(doc(db, 'competitions', $page.params.id))).data();
		}
	}

	$: console.log($selectedComp);

	async function goToScoreBoard() {
		goto(location.href + '/scoreboard', {
			state: {
				competition: await compPromise
			}
		});
	}
</script>

{#await compPromise then comp}
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
{/await}
