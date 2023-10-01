<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Competition } from './types';

	export let newComp: Competition;

	export let lockSection = true;

	$: {
		if (newComp.rounds.length === 0) {
			lockSection = true;
		} else {
			lockSection = false;
		}
	}

	function deleteRound(index: number) {
		newComp.rounds = newComp.rounds.filter((_, i) => i !== index);
	}
</script>

{#if newComp.rounds.length === 0}
	<div class="card p-4 text-center">
		<p>No Rounds Added</p>
	</div>
{/if}

{#each newComp.rounds as round, i}
	<div class="input-group input-group-divider grid-cols-[1fr_auto]">
		<input type="text" placeholder="Name" bind:value={round} class="w-full" />
		<button class="variant-filled-error" on:click|stopPropagation={() => deleteRound(i)}>
			<span><Icon icon="ion:trash" /></span>
		</button>
	</div>
{/each}
