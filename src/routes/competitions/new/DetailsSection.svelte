<script lang="ts">
	import Icon from '@iconify/svelte';
	import { FileDropzone, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import type { Competition } from './types';

	export let newComp: Competition;
</script>

<form class="flex flex-col gap-4">
	<label class="label">
		<span>Name</span>
		<input bind:value={newComp.name} class="input" type="text" maxlength="20" />
	</label>
	<label class="label">
		<span>Description</span>
		<textarea bind:value={newComp.description} class="textarea" rows="4" placeholder="" />
	</label>

	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label w-full">
		<span>Climbing Type</span>
		<RadioGroup class="w-full">
			<RadioItem bind:group={newComp.climbingType} name="justify" value="Boulder">Boulder</RadioItem
			>
			<RadioItem bind:group={newComp.climbingType} name="justify" value="Top Rope"
				>Top Rope</RadioItem
			>
			<RadioItem bind:group={newComp.climbingType} name="justify" value="Lead">Lead</RadioItem>
		</RadioGroup>
	</label>

	<label class="label w-full">
		<span>Start Date & Time</span>
		<div class="flex gap-2 items-center">
			<input bind:value={newComp.startDate} class="input" type="datetime-local" />
		</div>
	</label>

	<label class="label w-full">
		<span>End Date & Time</span>
		<div class="flex gap-2 items-center">
			<input bind:value={newComp.endDate} class="input" type="datetime-local" />
		</div>
	</label>

	<!-- svelte-ignore a11y-label-has-associated-control -->
	<!-- <label class="label w-full">
		<span>Image</span>
		<img src="#" alt="" bind:this={preview} />
		<FileDropzone name="files" bind:files>
			<svelte:fragment slot="lead">
				<div class="flex justify-center">
					<Icon icon="ion:image" class="text-4xl text-center" />
				</div>
			</svelte:fragment>
			<svelte:fragment slot="message"><b>Upload an Image</b></svelte:fragment>
		</FileDropzone>
	</label> -->
</form>
