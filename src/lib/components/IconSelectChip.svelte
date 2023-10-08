<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	export let icon = '';
	export let options: any[] = [];
	export let modalTitle = '';
	export let value: any = '';

	export let dataValue: string = '';
	export let dataLabel: string = '';

	let displayLabel: any = getDisplayLabel();

	function getDisplayLabel() {
		if (value) {
			return dataLabel ? options.find((el) => el[dataValue] === value)[dataLabel] : value;
		} else {
			return 'Select';
		}
	}

	const modalStore = getModalStore();

	const onClick = (e: any) => {
		const modal: ModalSettings = {
			type: 'component',
			title: modalTitle,
			// Data
			value,
			component: 'selectComponent',
			meta: {
				options,
				dataLabel,
				dataValue
			},
			response: (val) => {
				if (val || val.role === 'ok') {
					value = val.data;

					if (dataValue) {
						displayLabel = options.find((el) => el[dataValue] == val.data)[dataLabel];
					} else {
						displayLabel = value;
					}
				}
			}
		};

		modalStore.trigger(modal);
	};
</script>

<div class="flex items-center gap-1">
	<Icon {icon} class="text-2xl" />
	<button on:click={onClick} class="chip variant-filled rounded-full"
		>{displayLabel ?? 'Select'}</button
	>
</div>
