<script lang="ts">
	import { page } from '$app/stores';
	import FilterModal from '$lib/components/FilterModal.svelte';
	import IconSelectChip from '$lib/components/IconSelectChip.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';
	import {
		AppBar,
		getModalStore,
		Table,
		tableMapperValues,
		type ModalSettings,
		type TableSource,
		type ModalComponent
	} from '@skeletonlabs/skeleton';

	import { onMount } from 'svelte';
	import type { Competition } from '../../new/types';
	import { selectedComp } from '$lib/stores/selectedComp.store';
	import type { PageData } from './$types';
	import { client, databases, db } from '$lib/appwrite';
	import { Query } from 'appwrite';

	export let data: PageData;

	console.log(data);

	/* ---------------------------------- Data ---------------------------------- */

	let sourceData: any = [];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: [],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['position', 'competitionParticipant.name', 'totalScore'])
	};

	/* ------------------------------ Filter prompt ----------------------------- */

	const modalStore = getModalStore();

	let comp: Competition;

	/* --------------------------------- Filters -------------------------------- */
	const roundOptions = data.rounds?.documents;
	const categoryOptions = data.ageCategories?.documents;
	const genderOptions = data.genderCategories?.documents;

	let round: string = $page.url.searchParams.get('round') ?? '';
	let category: string = $page.url.searchParams.get('category') ?? '';
	let gender: string = $page.url.searchParams.get('gender') ?? '';

	let unSubscribe: any = null;

	$: {
		// $page.url.searchParams.set('round', round);
		// $page.url.searchParams.set('category', category);
		// $page.url.searchParams.set('gender', gender);

		let newUrl =
			window.location.protocol +
			'//' +
			window.location.host +
			window.location.pathname +
			`?round=${round}&category=${category}&gender=${gender}`;
		window.history.replaceState({ path: newUrl }, '', newUrl);

		if (round && category && gender) {
			realTime(round, gender, category);
		}
	}

	function realTime(round: string, gender: string, category: string) {
		databases
			.listDocuments(db, 'competition_scores', [
				Query.equal('roundId', round),
				Query.equal('ageCategoryId', category),
				Query.equal('genderCategoryId', gender),
				Query.orderDesc('totalScore')
			])
			.then((resp) => {
				sourceData = resp.documents;
				if (unSubscribe) {
					unSubscribe();
				}

				unSubscribe = client.subscribe(
					['databases.rock_face_off.collections.competition_scores.documents'],
					(event) => {
						const payload: any = event.payload;
						if (
							payload.genderCategoryId === gender &&
							payload.ageCategoryId === category &&
							payload.roundId === round
						) {
							const index = sourceData.findIndex((el: any) => el.$id == payload.$id);

							if (index >= 0) {
								const newSourceData = structuredClone(sourceData);
								newSourceData[index].totalScore = payload.totalScore;
								sourceData = newSourceData.sort((a: any, b: any) => {
									return b.totalScore - a.totalScore;
								});
							} else {
								const newSourceData = structuredClone(sourceData);
								newSourceData.push(payload);
								sourceData = newSourceData.sort((a: any, b: any) => {
									return b.totalScore - a.totalScore;
								});
							}
						}
					}
				);
			});
	}

	/* ------------------------------------ - ----------------------------------- */
</script>

<PageHeader>
	<svelte:fragment slot="scrollHeader">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			padding="p-2 py-4"
			class="shadow-xl"
		>
			<svelte:fragment slot="lead">
				<a href={`/competitions/${$page.params.id}`}>
					<Icon icon="ion:arrow-back" class="text-2xl" />
				</a>
			</svelte:fragment>
			<h2 class="text-center text-xs uppercase font-mono tracking-wider">Scoreboard</h2>
			<h1 class="text-center w-max font-bold text-primary-500">{data.competition?.name}</h1>
			<svelte:fragment slot="trail"><Icon icon="ion:search" class="text-2xl" /></svelte:fragment>
			<svelte:fragment slot="headline">
				<div class="flex gap-2 items-center justify-center flex-wrap">
					<IconSelectChip
						icon="ion:reload"
						options={roundOptions}
						modalTitle="Select Round"
						bind:value={round}
						dataLabel="name"
						dataValue="$id"
					/>
					|
					<IconSelectChip
						icon="ion:apps"
						options={categoryOptions}
						modalTitle="Select Category"
						bind:value={category}
						dataLabel="name"
						dataValue="$id"
					/>
					|
					<IconSelectChip
						icon="ion:male-female"
						options={genderOptions}
						modalTitle="Select Gender"
						bind:value={gender}
						dataLabel="name"
						dataValue="$id"
					/>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<a class="btn variant-filled-secondary btn-sm mb-2" href={`/competitions/${$page.params.id}`}>
		<Icon icon="ion:chevron-back" />
		<span> Back</span>
	</a>
	<h2 class="uppercase font-mono tracking-wider">Scoreboard</h2>
	<h1 class="text-3xl font-bold text-primary-500">{data.competition?.name}</h1>
	<div class="flex gap-2 items-center mt-4 flex-wrap">
		<IconSelectChip
			icon="ion:reload"
			options={roundOptions}
			modalTitle="Select Round"
			bind:value={round}
			dataLabel="name"
			dataValue="$id"
		/>
		|
		<IconSelectChip
			icon="ion:apps"
			options={categoryOptions}
			modalTitle="Select Category"
			bind:value={category}
			dataLabel="name"
			dataValue="$id"
		/>
		|
		<IconSelectChip
			icon="ion:male-female"
			options={genderOptions}
			modalTitle="Select Gender"
			bind:value={gender}
			dataLabel="name"
			dataValue="$id"
		/>
	</div>
</PageHeader>

<div class="table-container mt-2">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Score</th>
			</tr>
		</thead>
		<tbody>
			{#if sourceData.length > 0}
				{#each sourceData as row, i}
					<tr>
						<td>{i + 1}</td>
						<td>{row.competitionParticipant.displayName}</td>
						<td>{row.totalScore}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
{#if sourceData.length == 0}
	<p class="p-6 text-center">No results yet.</p>
{/if}
