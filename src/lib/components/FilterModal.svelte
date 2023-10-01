<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let roundOptions: any[];
	export let categoryOptions: any[];
	export let genderOptions: any[];

	let round = roundOptions[0];
	let category = categoryOptions[0];
	let gender = genderOptions[0];

	const modalStore = getModalStore();

	function onOk() {
		if ($modalStore[0].response)
			$modalStore[0].response({
				role: 'ok',
				data: {
					round,
					category,
					gender
				}
			});
		modalStore.close();
	}
</script>

<div class="card w-modal">
	<header class="card-header">
		<h1 class="text-2xl">{$modalStore[0]?.title}</h1>
	</header>
	<section class="p-4">
		<form>
			<label class="label mb-1">
				<span>Round</span>
				<select class="select" bind:value={round}>
					{#each roundOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</label>
			<label class="label mb-1">
				<span>Category</span>
				<select class="select" bind:value={category}>
					{#each categoryOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</label>
			<label class="label mb-1">
				<span>Gender</span>
				<select class="select" bind:value={gender}>
					{#each genderOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</label>
		</form>
	</section>
	<footer class="card-footer flex gap-2">
		<button class="btn variant-filled-primary w-full" on:click={onOk}>View</button>
	</footer>
</div>
