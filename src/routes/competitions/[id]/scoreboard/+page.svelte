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

	$: console.log($page.params.id);

	/* ---------------------------------- Data ---------------------------------- */

	const sourceData = [
		{ position: 1, name: 'DJ van Wyk', weight: 420, symbol: 'H' },
		{ position: 2, name: 'Loan van der Merwe', weight: 390, symbol: 'He' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' }
	];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: [],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['position', 'name', 'weight'])
	};

	/* ------------------------------ Filter prompt ----------------------------- */

	const modalStore = getModalStore();

	let comp: Competition;

	$: console.log($selectedComp);

	/* --------------------------------- Filters -------------------------------- */
	const roundOptions = ['Qualifiers', 'Semi-Final', 'Final'];
	const categoryOptions = [
		'Serious Potential',
		'Weekend Warriors',
		'Intermediate',
		'Junior',
		'Babies'
	];
	const genderOptions = ['Male', 'Female'];

	let round: string;
	let category: string;
	let gender: string;

	$: {
		// console.log('Change');
		// if (unSub) {
		// 	unSub();
		// }
		// if (round && category && gender) {
		// 	unSub = onSnapshot(
		// 		query(
		// 			collection(db, 'competitions', $page.params.id, 'rounds'),
		// 			and(where('round', '==', round), where('gender', '==', gender))
		// 		),
		// 		(docs) => {
		// 			docs.forEach((doc) => console.log(doc.data()));
		// 		}
		// 	);
		// }
	}
	/* ------------------------------------ - ----------------------------------- */

	async function getComp() {
		// if (history.state['competition']) {
		// 	return history.state['competition'];
		// } else {
		// 	return (await getDoc(doc(db, 'competitions', $page.params.id))).data();
		// }
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
		>
			<svelte:fragment slot="lead">
				<a href={`/competitions/${$page.params.id}`}>
					<Icon icon="ion:arrow-back" class="text-2xl" />
				</a>
			</svelte:fragment>
			<h2 class="text-center text-xs uppercase font-mono tracking-wider">Scoreboard</h2>
			<h1 class="text-center w-max font-bold text-primary-500">{comp?.name}</h1>
			<svelte:fragment slot="trail"><Icon icon="ion:search" class="text-2xl" /></svelte:fragment>
			<svelte:fragment slot="headline">
				<div class="flex gap-2 items-center justify-center flex-wrap">
					<IconSelectChip
						icon="ion:reload"
						options={roundOptions}
						modalTitle="Select Round"
						bind:value={round}
					/>
					|
					<IconSelectChip
						icon="ion:apps"
						options={categoryOptions}
						modalTitle="Select Category"
						bind:value={category}
					/>
					|
					<IconSelectChip
						icon="ion:male-female"
						options={genderOptions}
						modalTitle="Select Gender"
						bind:value={gender}
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
	<h1 class="text-3xl font-bold text-primary-500">{comp?.name}</h1>
	<div class="flex gap-2 items-center mt-4 flex-wrap">
		<IconSelectChip
			icon="ion:reload"
			options={roundOptions}
			modalTitle="Select Round"
			bind:value={round}
		/>
		|
		<IconSelectChip
			icon="ion:apps"
			options={categoryOptions}
			modalTitle="Select Category"
			bind:value={category}
		/>
		|
		<IconSelectChip
			icon="ion:male-female"
			options={genderOptions}
			modalTitle="Select Gender"
			bind:value={gender}
		/>
	</div>
</PageHeader>

<Table class="mt-4 rounded-none" source={tableSimple} element="table rounded-none" />
