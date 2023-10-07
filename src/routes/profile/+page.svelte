<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Restricted from '$lib/components/auth/Restricted.svelte';
	import { auth } from '$lib/firebase';
	import { authPageStore } from '$lib/stores/authPage.store';
	import { userStore, user } from '$lib/stores/user.store';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { signOut } from 'firebase/auth';

	function onLogin() {
		$authPageStore = 'login';
	}

	function onSignUp() {
		$authPageStore = 'signup';
	}
	function onLogout() {
		user.logout();
	}

	// $: console.log($userStore);
</script>

<Restricted>
	<!-- <PageHeader>
		<h1 class="text-lg">Profile</h1>
		<h2 class="text-2xl font-bold">{$userStore?.displayName}</h2>
	</PageHeader> -->

	<div class="flex justify-center items-center p-4 flex-col gap-4">
		<Avatar initials={$user?.account.name ?? ''} width="w-32" src={$userStore?.photoURL ?? ''} />
		<h2 class="text-2xl font-bold">{$user?.account.name}</h2>
	</div>
	<div class="p-4">
		<button class="btn variant-filled-secondary w-full" on:click={onLogout}>Logout</button>
	</div>

	<svelte:fragment slot="noUser">
		<div class="w-full h-full flex justify-center items-center flex-col gap-2">
			<button class="btn variant-filled-primary" on:click={onLogin}>Login</button>
			<div class="relative py-4 w-full max-w-xs">
				<hr class="!border-t-2" />
				<span
					class="absolute text-center left-0 right-0 top-0 bottom-0 flex justify-center items-center"
				>
					<span class="px-4 bg-surface-50">OR</span>
				</span>
			</div>
			<button class="btn variant-filled-primary" on:click={onSignUp}>Sign Up</button>
		</div>
	</svelte:fragment>
</Restricted>
