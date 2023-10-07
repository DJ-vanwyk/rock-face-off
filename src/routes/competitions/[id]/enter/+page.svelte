<script lang="ts">
	import Restricted from '$lib/components/auth/Restricted.svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import { authPageStore } from '$lib/stores/authPage.store';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { RadioGroup, RadioItem, getModalStore } from '@skeletonlabs/skeleton';
	import { databases } from '$lib/appwrite';
	import { ID, Query } from 'appwrite';
	import { user } from '$lib/stores/user.store';
	import LoadingBtn from '$lib/components/LoadingBtn.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const modalStore = getModalStore();

	let ageCategoryValue = data.ageCategories[0].$id;
	let genderCategoryValue = data.genderCategories[0].$id;
	let disabled = false;

	function onLogin() {
		$authPageStore = 'login';
	}

	async function onRegister() {
		modalStore.trigger({
			type: 'confirm',
			// Data
			title: 'Submit Entry',
			body: 'Are you sure you wish to proceed? You will not be able to change categories after you have entered this competition.',
			buttonTextConfirm: 'Enter Competition',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => (r ? enterComp() : '')
		});
	}

	async function enterComp() {
		disabled = true;
		if ($user?.account.$id) {
			const entriesList = await databases.listDocuments(
				'652128d14c078883668a',
				'65213e03b1f3ab84700f',
				[Query.equal('userId', $user.account.$id), Query.equal('competition', data.id)]
			);

			console.log(entriesList);

			if (entriesList.total == 0) {
				const doc = await databases.createDocument(
					'652128d14c078883668a',
					'65213e03b1f3ab84700f',
					ID.unique(),
					{
						userId: $user?.account.$id,
						competition: data.id,
						ageCategory: ageCategoryValue,
						genderCategory: genderCategoryValue,
						displayName: $user.account.name
					}
				);
				goto(`/competitions/${data.id}/participants/${doc.$id}`);
			} else {
				alert('User Already entered');
			}
		}
		disabled = false;
	}
</script>

<Restricted>
	<PageHeader>
		<a href={`/competitions/${data.id}`} class="btn btn-sm">
			<Icon icon="ion:chevron-back" />
			<span>Back</span>
		</a>
		<h1 class="text-2xl">Competition Registration</h1>
		<p class="mt-4 text-sm">Please fill in the below information to register of the competition</p>
	</PageHeader>

	<div class="p-4">
		<form>
			<label class="label mb-4" for="ageCatogory">
				<span>Gender Category</span>
				<RadioGroup display="flex-col" rounded="rounded-container-token" regionLabel="!text-left">
					{#each data.genderCategories as genderCategory}
						<RadioItem
							bind:group={genderCategoryValue}
							name={genderCategory.$id}
							value={genderCategory.$id}
							class="!text-left"
						>
							<span class="!text-left w-full">{genderCategory.name}</span>
						</RadioItem>
					{/each}
				</RadioGroup>
			</label>
			<label class="label mb-4" for="ageCatogory">
				<span>Age Category</span>
				<RadioGroup display="flex-col" rounded="rounded-container-token" regionLabel="!text-left">
					{#each data.ageCategories as ageCategory}
						<RadioItem
							bind:group={ageCategoryValue}
							name={ageCategory.$id}
							value={ageCategory.$id}
							class="!text-left"
						>
							<span class="!text-left w-full">{ageCategory.name}</span>
						</RadioItem>
					{/each}
				</RadioGroup>
			</label>
		</form>

		<LoadingBtn {disabled} on:click={onRegister} button="variant-filled-primary w-full">
			Register
		</LoadingBtn>
	</div>

	<svelte:fragment slot="noUser">
		<div class="h-full flex flex-col justify-center items-center p-6 text-center gap-5 relative">
			<a href={`/competitions/${data.id}`} class="btn absolute top-4 left-3 btn-sm">
				<Icon icon="ion:chevron-back" />
				<span>Back</span>
			</a>
			<p>Please login in order to enter the competition.</p>
			<button on:click={onLogin} class="btn variant-filled-primary">Login</button>
		</div>
	</svelte:fragment>
</Restricted>
