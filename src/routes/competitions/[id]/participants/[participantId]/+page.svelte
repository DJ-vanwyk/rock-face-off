<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: PageData;

	console.log(data);
</script>

<PageHeader>
	<a
		href={`/competitions/${data.competition.$id}`}
		class="btn btn-sm variant-filled-secondary mb-4"
	>
		<Icon icon="ion:chevron-back" />
		<span>Back</span>
	</a>
	<h2 class="font-bold">{data.competition.name}</h2>
	<h1 class="text-3xl font-bold">Scorecard</h1>
</PageHeader>
<div class="p-4">
	<div class="card variant-ghost p-4 mb-4">
		<div class="flex">
			<Avatar
				initials={data.participant.displayName}
				rounded="rounded-lg"
				background="bg-blue-500"
			/>
			<div class="px-4 flex flex-col justify-center">
				<h2 class="text-sm text-surface-800">Participant:</h2>
				<h1 class="text-xl font-bold">{data.participant.displayName}</h1>
			</div>
		</div>
		<h3 class="text-sm py-2 pt-3">Categories:</h3>
		<div>
			<span class="chip variant-filled rounded-full">{data.genderCategory.name}</span>
			<span class="chip variant-filled rounded-full">{data.ageCategory.name}</span>
		</div>
	</div>
	<h2>Rounds:</h2>
	{#each data.rounds as round}
		<div class="bg-gray-500 p-4 m-4 card">
			<h1>{round.name}</h1>
		</div>
	{/each}
</div>
