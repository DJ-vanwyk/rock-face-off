<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { client, databases, db } from '$lib/appwrite';

	export let data: PageData;

	let score = data.score;

	console.log(data);

	// client.subscribe(
	// 	[`databases.${db}.collections.competition_scores.documents.${score?.$id}`],
	// 	(event: any) => {
	// 		if (JSON.stringify(event.payload?.scores) !== JSON.stringify(score?.scores)) {
	// 			console.log(
	// 				'Change detected',
	// 				JSON.stringify(event.payload?.scores),
	// 				JSON.stringify(score?.scores)
	// 			);
	// 			// pushUpdate = false;
	// 			// score = event.payload as any;
	// 			// pushUpdate = true;
	// 		}

	// 		// pushUpdate = false;
	// 		// // score = event.payload as any;
	// 		// pushUpdate = true;
	// 	}
	// );

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

<div class="p-4">
	{#if score}
		<h1>{score.totalScore}</h1>

		{#each score?.scores as val, index}
			<RadioGroup>
				<RadioItem
					on:change={(e) => console.log(e)}
					bind:group={score['scores'][index]}
					name="justify"
					value={10 * (index + 1) + 10}>Flash</RadioItem
				>
				<RadioItem bind:group={score['scores'][index]} name="justify" value={10 * (index + 1)}
					>Top</RadioItem
				>
				<RadioItem bind:group={score['scores'][index]} name="justify" value={(10 * (index + 1)) / 2}
					>Zone</RadioItem
				>
				<RadioItem bind:group={score['scores'][index]} name="justify" value={0}>None</RadioItem>
			</RadioGroup>
		{/each}
	{/if}
</div>
