<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let disabled = false;
	export let button = 'variant-filled-primary';
</script>

<button {disabled} class="btn {button}" on:click>
	{#if disabled}
		<ProgressRadial width="w-6" stroke={150} meter="stroke-white" track="stroke-white/20" />
	{/if}
	<span> <slot /> </span>
</button>
