<script lang="ts">
	import { databases } from '$lib/appwrite';
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
				const resp = await databases.listDocuments('652128d14c078883668a', '65213e03b1f3ab84700f', [
					Query.equal('userId', $user?.account.$id),
					Query.equal('competition', competition.$id)
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
	{#await isRegisteredPromise}
		<div class="placeholder mb-6 h-[42px]" />
	{:then isRegistered}
		{#if isRegistered}
			<a
				href={`${competition.$id}/participants/${participantId}`}
				class="btn variant-filled-secondary w-full mb-6"
			>
				Go To Scorecard
			</a>
		{:else}
			<a href={`${competition.$id}/enter`} class="btn variant-filled-primary w-full mb-6">
				Enter Now
			</a>
		{/if}
	{/await}
	<p class="mb-6 text-sm">{competition.description}</p>
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
		</tbody>
		<tbody />
	</table>
</div>
