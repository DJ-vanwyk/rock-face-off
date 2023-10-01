<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import DetailsSection from './DetailsSection.svelte';
	import CategoriesSection from './CategoriesSection.svelte';
	import type { Competition } from './types';
	import RoundsSection from './RoundsSection.svelte';
	import RecapSection from './RecapSection.svelte';
	import { userStore } from '$lib/stores/user.store';
	import { addDoc, collection } from 'firebase/firestore';
	import { db } from '$lib/firebase';

	let newComp: Competition = {
		name: 'Test Comp',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus magnam assumenda cum odit aliquam commodi in a omnis.',
		climbingType: 'Boulder',
		startDate: '',
		endDate: '',
		enableGenderCategories: true,
		ageCategories: [],
		rounds: ['Round 1'],
		createdBy: {
			uid: $userStore?.uid ?? '',
			displayName: $userStore?.displayName ?? ''
		},
		searchText: []
	};

	let lockRounds = true;

	function addRound() {
		newComp.rounds = [...newComp.rounds, `Round ${newComp.rounds.length + 1}`];
	}

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

	async function onComplete() {
		let newCompWithSearch = {
			...newComp,
			searchText: generateSearchArr(newComp.name),
			startDate: new Date(newComp.startDate),
			endDate: new Date(newComp.endDate)
		};
		const docRef = await addDoc(collection(db, 'competitions'), newCompWithSearch);
		console.log('Document written with ID: ', docRef.id);
	}
</script>

<h1 class="text-4xl font-bold px-4 pt-4">New Competition</h1>

<div class="p-4">
	<Stepper on:complete={onComplete}>
		<Step>
			<svelte:fragment slot="header">Details</svelte:fragment>
			<DetailsSection bind:newComp />
		</Step>
		<Step>
			<svelte:fragment slot="header">Categories</svelte:fragment>
			<CategoriesSection bind:newComp />
		</Step>
		<Step locked={lockRounds}>
			<svelte:fragment slot="header">
				<div class="flex justify-between items-center">
					<span>Round</span>
					<button class="btn btn-sm variant-filled-secondary" on:click={addRound}>
						<span><Icon icon="ion:add" /></span>
						<span>Add</span>
					</button>
				</div>
			</svelte:fragment>
			<RoundsSection bind:newComp bind:lockSection={lockRounds} />
		</Step>
		<Step>
			<svelte:fragment slot="header">Recap</svelte:fragment>
			<RecapSection bind:newComp />
		</Step>
		<!-- ... -->
	</Stepper>
</div>
