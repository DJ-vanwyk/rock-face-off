<script lang="ts">
	import LoadingBtn from '$lib/components/LoadingBtn.svelte';
	import Restricted from '$lib/components/auth/Restricted.svelte';
	import { authPageStore } from '$lib/stores/authPage.store';
	import { user } from '$lib/stores/user.store';
	import Icon from '@iconify/svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	let disabled = false;

	function onLogin() {
		$authPageStore = 'login';
	}

	function onSignUp() {
		$authPageStore = 'signup';
	}
	async function onLogout() {
		disabled = true;
		await user.logout();
		disabled = false;
	}

	// $: console.log($userStore);
</script>

<Restricted>
	<!-- <PageHeader>
		<h1 class="text-lg">Profile</h1>
		<h2 class="text-2xl font-bold">{$userStore?.displayName}</h2>
	</PageHeader> -->

	<div class="flex justify-center items-center p-4 flex-col gap-4">
		<Avatar initials={$user?.account.name ?? ''} width="w-32" />
		<!-- <h2 class="text-2xl font-bold">{$user?.account.name}</h2> -->
		<label class="label w-full" for="name">
			<span>Name</span>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					class="input"
					disabled
					type="text"
					placeholder=""
					name="name"
					value={$user?.account.name}
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="input-group-shim">
					<Icon icon="ion:pencil" />
				</div>
			</div>
		</label>
		<label class="label w-full" for="email">
			<span>Email</span>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					class="input"
					disabled
					type="text"
					placeholder=""
					name="email"
					value={$user?.account.email}
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- <div class="input-group-shim">
					<Icon icon="ion:pencil" />
				</div> -->
			</div>
		</label>
	</div>

	<div class="p-4">
		<LoadingBtn {disabled} button="variant-filled-secondary w-full" on:click={onLogout}>
			Logout
		</LoadingBtn>

		<!-- <button class="btn variant-filled-secondary w-full" >Logout</button> -->
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
