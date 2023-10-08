<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import { Avatar, getModalStore } from '@skeletonlabs/skeleton';
	import { databases, db } from '$lib/appwrite';
	import { ID, Permission, Role } from 'appwrite';
	import { user } from '$lib/stores/user.store';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const modalStore = getModalStore();

	function onRoundStart(roundId: string) {
		modalStore.trigger({
			type: 'confirm',
			title: 'Start Round',
			body: 'Your are about to start this round. Once started your time begins and can not be stopped!',

			buttonTextConfirm: 'Lets Go!',
			response: (r: any) => (r ? startRound(roundId) : '')
		});
	}

	async function startRound(roundId: string) {
		if ($user) {
			const resp = await databases.createDocument(
				db,
				'competition_scores',
				ID.unique(),
				{
					scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					totalScore: 0,
					status: 'active',
					startTime: new Date(),
					roundId: roundId,
					participantId: data.participantId
				},
				[
					Permission.read(Role.any()),
					Permission.update(Role.user($user?.account.$id)),
					Permission.delete(Role.user($user?.account.$id))
				]
			);

			goto(`${data.participantId}/rounds/${roundId}`);
		}
	}
</script>

<PageHeader>
	<a
		href={`/competitions/${data.competition.$id}`}
		class="btn btn-sm variant-filled-secondary mb-4"
	>
		<Icon icon="ion:chevron-back" />
		<span>Back</span>
	</a>
	<!-- <h2 class="font-bold">{data.competition.name}</h2> -->
	<h1 class="text-3xl font-bold">Scorecard</h1>
</PageHeader>
<div class="p-4">
	<div class="card variant-ghost p-4 mb-4 bg-gradient-to-br variant-gradient-primary-secondary">
		<h1 class="font-bold text-2xl">{data.competition.name}</h1>
		<h2 class="mb-8">{data.competition.organization}</h2>
		<!-- <hr class="!border-t my-4 !border-surface-600" /> -->
		<div class="flex">
			<Avatar initials={data.participant.displayName} rounded="rounded-lg" background="bg-white" />
			<div class="px-4 flex flex-col justify-center">
				<h2 class="text-sm text-surface-200">Participant:</h2>
				<h1 class="text-xl font-bold">{data.participant.displayName}</h1>
			</div>
		</div>

		<!-- <hr class="!border-t my-2 !border-surface-600" /> -->
		<div class="flex items-center gap-2 mb-2">
			<h3 class="text-sm py-2">Categories:</h3>
			<div class="flex flex-wrap gap-2">
				<span class="chip variant-filled rounded-full">{data.genderCategory.name}</span>
				<span class="chip variant-filled rounded-full">{data.ageCategory.name}</span>
			</div>
		</div>
	</div>
	<h2 class="font-bold mt-6 mb-2">Rounds:</h2>
	{#each data.rounds as round, index}
		<div class="card varuiant-ghos mb-4">
			<header class="card-header flex gap-2 items-center">
				<span
					class="bg-primary-500 text-white aspect-square flex items-center justify-center h-10 rounded-md"
				>
					#{index + 1}
				</span>
				<div>
					<h1 class="text-lg font-bold">{round.name}</h1>
					<h2 class="text-xs">20 - 25 Dec 2023</h2>
				</div>
			</header>
			<section class="p-4">
				<table class="w-full">
					<tr>
						<td class="text-surface-800">Time Limit</td>
						<td class="text-right">{round.timeLimit}s</td>
					</tr>
					<tr>
						<td class="text-surface-800">Status</td>
						<td class="text-right capitalize">{round.score ? round.score.status : 'Open'}</td>
					</tr>
					<tr>
						<td class="text-surface-800">Score</td>
						<td class="text-right">{round.score ? round.score.totalScore : '-'}</td>
					</tr>
					<tr>
						<td class="text-surface-800">Session Start</td>
						<td class="text-right"
							>{round.score ? new Date(round.score.startTime).toLocaleString() : '-'}</td
						>
					</tr>
					<tr>
						<td class="text-surface-800">Session End</td>
						<td class="text-right">{round.score ? round.score.endTime ?? '-' : '-'}</td>
					</tr>
				</table>
			</section>
			<footer class="card-footer flex gap-2">
				{#if !round.score}
					<button
						class="btn btn-sm variant-filled-primary w-full"
						on:click={() => onRoundStart(round.$id)}>Start Round</button
					>
				{:else if round.score.status === 'active'}
					<a
						href={`${data.participantId}/rounds/${round.$id}`}
						class="btn btn-sm variant-filled-tertiary w-full"
					>
						Continue Round
					</a>
				{:else}
					<button
						class="btn btn-sm variant-filled-surface w-full"
						on:click={() => onRoundStart(round.$id)}>View Round</button
					>
				{/if}
				<button class="btn btn-sm variant-filled-secondary w-full">View Scores</button>
			</footer>
		</div>
	{/each}
</div>
