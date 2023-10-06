<script lang="ts">
	import { account } from '$lib/appwrite';
	import { authPageStore } from '$lib/stores/authPage.store';
	import Icon from '@iconify/svelte';

	let email = '';
	let password = '';

	function onRegister() {
		$authPageStore = 'signup';
	}

	function onBack() {
		$authPageStore = 'app';
	}

	async function onLogin() {
		await account.createEmailSession(email, password);
		let loggedInUser = await account.get();

		console.log(loggedInUser);
	}
</script>

<div class="w-screen flex p-6 justify-center items-start">
	<form class="w-full">
		<button type="button" class="mb-4 btn variant-filled-secondary btn-sm" on:click={onBack}>
			<Icon icon="ion:chevron-back" class="mr-1" />
			Back
		</button>
		<h1 class="text-3xl font-bold pb-2">Sign In</h1>
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
		<label class="label">
			<span>Password</span>
			<input class="input" type="password" placeholder="" bind:value={password} />
		</label>
		<div class="flex justify-end py-1">
			<button class="text-blue-500">Forget password?</button>
		</div>
		<button class="btn variant-filled-primary w-full mt-7" on:click={onLogin}>Login</button>
	</form>
</div>
