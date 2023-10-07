<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';

	export let data: any;

	let competition = data.competition;

	console.log(data);
</script>

<img src={competition.imgUrl} alt="" class="h-60 w-full object-cover" />
<a href="/competitions" class="btn-icon variant-filled-surface fixed top-2 left-2">
	<Icon icon="ion:chevron-back" />
</a>
<div class="p-4">
	<h1 class="text-2xl font-bold">{competition.name}</h1>
	<h2 class="mb-3">{competition.organization}</h2>
	<a href={`${competition.id}/enter`} class="btn variant-filled-primary w-full mb-6">Enter Now</a>
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
