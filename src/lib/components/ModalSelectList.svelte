<script lang="ts">
	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	let valueSingle: string = $modalStore[0].value;

	function onOk() {
		if ($modalStore[0].response)
			$modalStore[0].response({
				role: 'ok',
				data: valueSingle
			});
		modalStore.close();
	}

	function onCancel() {
		if ($modalStore[0].response)
			$modalStore[0].response({
				role: 'cancel',
				data: valueSingle
			});
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-example-form w-modal card h-full">
		<header class="card-header">
			<h1 class="text-xl font-bold">{$modalStore[0].title ?? 'Select'}</h1>
		</header>
		<section class="m-4 max-h-96 overflow-auto">
			<ListBox>
				{#each $modalStore[0].meta.options as option}
					<ListBoxItem
						bind:group={valueSingle}
						name="medium"
						value={$modalStore[0].meta.dataValue ? option[$modalStore[0].meta.dataValue] : option}
						>{$modalStore[0].meta.dataLabel
							? option[$modalStore[0].meta.dataLabel]
							: option}</ListBoxItem
					>
				{/each}
			</ListBox>
		</section>

		<footer class="card-footer flex gap-2">
			<button class="btn variant-ghost-success w-full" on:click={onOk}>Ok</button>
			<button class="btn variant-ghost-error w-full" on:click={onCancel}>Cancel</button>
		</footer>
	</div>
{/if}
