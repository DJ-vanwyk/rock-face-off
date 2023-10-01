<script lang="ts">
	import { InputChip, SlideToggle } from '@skeletonlabs/skeleton';
	import type { Competition } from './types';

	export let newComp: Competition;
</script>

<div class="flex justify-between items-center">
	<span>Enable Gender Categories</span>
	<SlideToggle name="slide" bind:checked={newComp.enableGenderCategories} />
</div>
<p>Age Categories</p>
<InputChip
	allowUpperCase
	allowDuplicates={false}
	bind:value={newComp.ageCategories}
	name="chips"
	placeholder="Enter any value..."
/>
