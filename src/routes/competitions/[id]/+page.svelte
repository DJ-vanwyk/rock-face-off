<script lang="ts">
	import { databases, db } from '$lib/appwrite';
	import { user } from '$lib/stores/user.store';
	import Icon from '@iconify/svelte';
	import { Query } from 'appwrite';

	export let data: any;

	let competition = data.competition;

	let isRegisteredPromise = checkEntry();

	let participantId: string | null = null;

	async function checkEntry() {
		if ($user) {
			try {
				const resp = await databases.listDocuments(db, 'competition_participants', [
					Query.equal('userId', $user?.account.$id),
					Query.equal('competitionId', competition.$id)
				]);

				if (resp.total !== 0) {
					participantId = resp.documents[0].$id;
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.log(error);
				return false;
			}
		} else {
			return false;
		}
	}
</script>

<img src={competition.imgUrl} alt="" class="h-60 w-full object-cover" />
<a href="/competitions" class="btn-icon variant-filled-surface fixed top-2 left-2">
	<Icon icon="ion:chevron-back" />
</a>
<div class="p-4">
	<h1 class="text-2xl font-bold">{competition.name}</h1>
	<h2 class="mb-3">{competition.organization}</h2>
	<p class="mb-6 text-sm">{competition.description}</p>
	{#await isRegisteredPromise}
		<div class="placeholder mb-2 h-[42px]" />
	{:then isRegistered}
		{#if isRegistered}
			<a
				href={`${competition.$id}/participants/${participantId}`}
				class="btn variant-filled-secondary w-full mb-2"
			>
				Go To Scorecard
			</a>
		{:else}
			<a href={`${competition.$id}/enter`} class="btn variant-filled-primary w-full mb-2">
				Enter Now
			</a>
		{/if}
	{/await}
	<a
		href={`${competition.$id}/scoreboard`}
		class="btn variant-ringed-primary w-full mb-6 text-primary-500"
	>
		<Icon icon="ion:trophy" />
		<span>View Results</span>
	</a>

	<h3 class="font-bold mb-2">Detail:</h3>

	<table class="table table-hover mb-10 border border-surface-500 border-separate">
		<!-- <thead>
			<tr>
				<th>Position</th>
				<th>Weight</th>
			</tr>
		</thead> -->
		<tbody>
			<tr>
				<td class="font-bold">Start Date</td>
				<td>{new Date(competition.startDate).toLocaleString()}</td>
			</tr>
			<tr>
				<td class="font-bold">End Date</td>
				<td>{new Date(competition.endDate).toLocaleString()}</td>
			</tr>
			<tr>
				<td class="font-bold">Location</td>
				<td>{competition.location}</td>
			</tr>
			<tr>
				<td class="font-bold">Organizers</td>
				<td>{competition.organization}</td>
			</tr>
			<tr>
				<td class="font-bold">Rounds</td>
				<td>{data.rounds.total}</td>
			</tr>
		</tbody>
		<tbody />
	</table>
</div>
