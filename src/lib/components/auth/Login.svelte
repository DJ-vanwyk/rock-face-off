<script lang="ts">
	import { authPageStore } from '$lib/stores/authPage.store';
	import { user } from '$lib/stores/user.store';
	import Icon from '@iconify/svelte';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';

	let email = '';
	let password = '';

	let disabled = false;
	let showPassword = false;

	const toastStore = getToastStore();

	function onRegister() {
		$authPageStore = 'signup';
	}

	function onBack() {
		$authPageStore = 'app';
	}

	async function onLogin() {
		disabled = true;
		const error = await user.login(email, password);

		if (error) {
			toastStore.trigger({
				message: error,
				autohide: true,
				timeout: 3000,
				background: 'variant-filled-error'
			});
			disabled = false;
			return;
		}

		$authPageStore = 'app';
		disabled = false;

		// await account.createEmailSession(email, password);
		// let loggedInUser = await account.get();

		// console.log(loggedInUser);
	}
</script>

<div class="w-screen flex p-6 justify-center items-start">
	<form class="w-full">
		<button type="button" class="mb-4 btn variant-filled-secondary btn-sm" on:click={onBack}>
			<Icon icon="ion:chevron-back" class="mr-1" />
			Back
		</button>
		<h1 class="text-3xl font-bold pb-2">Login</h1>
		<p class="pb-4">
			Don't have an account?
			<button class="text-blue-500 font-medium" on:click={onRegister} type="button">Register</button
			>
		</p>
		<!-- <button class="btn variant-outline-secondary w-full mb-4">
			<Icon icon="flat-color-icons:google" class="mr-2 text-2xl" />
			Sign In with Google
		</button> -->
		<!-- <div class="relative py-4">
			<hr class="!border-t-2 or" />
			<span
				class="absolute text-center left-0 right-0 top-0 bottom-0 flex justify-center items-center"
			>
				<span class="px-4 bg-surface-50">OR</span>
			</span>
		</div> -->
		<label class="label mt-4 mb-2">
			<span>Email</span>
			<input class="input" type="text" placeholder="" bind:value={email} />
		</label>
		<label class="label mb-2" for="password">
			<span>Password</span>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				{#if showPassword}
					<input class="input" type="text" placeholder="" name="password" bind:value={password} />
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="input-group-shim" on:click={() => (showPassword = !showPassword)}>
						<Icon icon="ion:eye-off" />
					</div>
				{:else}
					<input
						class="input"
						type="password"
						placeholder=""
						name="password"
						bind:value={password}
					/>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="input-group-shim" on:click={() => (showPassword = !showPassword)}>
						<Icon icon="ion:eye" />
					</div>
				{/if}
			</div>
		</label>

		<div class="flex justify-end py-1">
			<button class="text-blue-500">Forget password?</button>
		</div>
		<!-- <button class="btn variant-filled-primary w-full mt-7" on:click={onLogin}>Login</button> -->
		<button {disabled} class="btn variant-filled-primary w-full mt-7" on:click={onLogin}>
			{#if disabled}
				<ProgressRadial width="w-6" stroke={150} meter="stroke-white" track="stroke-white/20" />
			{/if}
			<span> Login </span>
		</button>
	</form>
</div>
