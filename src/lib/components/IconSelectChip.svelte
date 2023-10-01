<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	export let icon = '';
	export let options: any[] = [];
	export let modalTitle = '';
	export let value: any;

	const modalStore = getModalStore();

	const onClick = (e: any) => {
		const modal: ModalSettings = {
			type: 'component',
			title: modalTitle,
			// Data
			value,
			component: 'selectComponent',
			meta: {
				options
			},
			response: (val) => {
				if (val) {
					value = val;
				}
			}
		};

		modalStore.trigger(modal);
	};
</script>

<div class="flex items-center gap-1">
	<Icon {icon} class="text-2xl" />
	<button on:click={onClick} class="chip variant-filled rounded-full">{value ?? 'Select'}</button>
</div>
