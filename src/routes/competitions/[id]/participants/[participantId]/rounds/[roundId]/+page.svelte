<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { client, databases, db } from '$lib/appwrite';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';

	export let data: PageData;
	let score = structuredClone(data.score);

	$: {
		if (score) {
			score.totalScore = score.scores.reduce((prev: number, curr: number) => prev + curr);

			databases
				.updateDocument(db, 'competition_scores', score.$id, {
					scores: score.scores,
					totalScore: score.totalScore
				})
				.then(() => console.log('Update'));
		}
	}
</script>

<div class=" fixed bottom-0 left-0 right-0 bg-surface-50">
	<div class="flex p-4 py-2 m-4 mb-0 justify-between items-center bg-surface-300 rounded-lg">
		<span>Score</span>
		<span class="font-bold">{score?.totalScore}</span>
	</div>
	<div class="p-4">
		<button class="btn btn-lg variant-filled-primary w-full">Submit Score</button>
	</div>
</div>

<PageHeader>
	<a
		href={`/competitions/${data.competition?.$id}/participants/${data.score?.participantId}`}
		class="btn btn-sm variant-filled-secondary mb-4"
	>
		<Icon icon="ion:chevron-back" />
		<span>Back</span>
	</a>
	<h1>{data.competition?.name}</h1>
	<h1 class="text-3xl font-bold">{data.round?.name}</h1>
</PageHeader>

<div class="p-4 mb-20">
	{#if score}
		{#each score?.scores as val, index}
			<h3 class=" p-2 bg-secondary-300 text-white rounded-xl">
				Problem {index + 1}
			</h3>
			<RadioGroup class="w-full mb-8">
				<RadioItem
					on:change={(e) => console.log(e)}
					bind:group={score['scores'][index]}
					name="justify"
					value={10 * (index + 1) + 10}
				>
					<div class="flex flex-col justify-center items-center gap-1">
						<span> Flash </span>
						<span>{10 * (index + 1) + 10}</span>
					</div>
				</RadioItem>
				<RadioItem bind:group={score['scores'][index]} name="justify" value={10 * (index + 1)}>
					<div class="flex flex-col justify-center items-center gap-1">
						<span> Top </span>
						<span>{10 * (index + 1)}</span>
					</div>
				</RadioItem>
				<RadioItem
					bind:group={score['scores'][index]}
					name="justify"
					value={(10 * (index + 1)) / 2}
				>
					<div class="flex flex-col justify-center items-center gap-1">
						<span> Zone </span>
						<span>{(10 * (index + 1)) / 2}</span>
					</div>
				</RadioItem>
				<RadioItem bind:group={score['scores'][index]} name="justify" value={0}>
					<div class="flex flex-col justify-center items-center gap-1">
						<span> None </span>
						<span>0</span>
					</div>
				</RadioItem>
			</RadioGroup>
		{/each}
	{/if}
</div>
