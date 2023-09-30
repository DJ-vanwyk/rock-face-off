<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	const sourceData = [
		{ position: 1, name: 'DJ van Wyk', weight: 420, symbol: 'H' },
		{ position: 2, name: 'Loan van der Merwe', weight: 390, symbol: 'He' },
		{ position: 3, name: 'Cerin Bouwer', weight: 350, symbol: 'Li' }
	];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: [],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['position', 'name', 'weight'])
	};
</script>

<div class="p-4">
	<button class="btn variant-filled-secondary btn-sm mb-2">
		<Icon icon="ion:chevron-back" />
		<span> Back</span>
	</button>
	<h1>Score Board</h1>
	<h1 class="text-3xl font-bold">Birthday Boulder Bash</h1>
	<div class="flex gap-2 items-center mt-4 flex-wrap">
		<div class="flex items-center gap-1">
			<Icon icon="ion:reload" class="text-2xl" />
			<span class="chip variant-filled rounded-full">1</span>
		</div>
		|
		<div class="flex items-center gap-1">
			<Icon icon="ion:apps" class="text-2xl" />
			<span class="chip variant-filled rounded-full">Weekend Warriors</span>
		</div>

		|
		<div class="flex items-center gap-1">
			<Icon icon="ion:male-female" class="text-2xl" />
			<span class="chip variant-filled rounded-full">Male</span>
		</div>
	</div>
</div>
<Table class="mt-4 rounded-none" source={tableSimple} element="table rounded-none" />
