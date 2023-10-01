<script lang="ts">
	import { authPageStore } from '$lib/stores/authPage.store';
	import Icon from '@iconify/svelte';

	function onLogin() {
		$authPageStore = 'login';
	}

	function onBack() {
		$authPageStore = 'app';
	}
</script>

<div class="w-screen h-screen flex p-6 justify-center items-center">
	<form class="w-full">
		<button type="button" class="mb-4 btn variant-filled-secondary btn-sm" on:click={onBack}>
			<Icon icon="ion:chevron-back" class="mr-1" />
			Back
		</button>
		<h1 class="text-3xl font-bold pb-2">Register</h1>
		<p class="pb-6">
			Already have an account?
			<button class="text-blue-500 font-medium" on:click={onLogin} type="button">Login</button>
		</p>
		<button class="btn variant-outline-secondary w-full mb-4"
			><Icon icon="flat-color-icons:google" class="mr-2 text-2xl" /> Sign Un with Google</button
		>
		<div class="relative py-4">
			<hr class="!border-t-2 or" />
			<span
				class="absolute text-center left-0 right-0 top-0 bottom-0 flex justify-center items-center"
			>
				<span class="px-4 bg-surface-50">OR</span>
			</span>
		</div>
		<label class="label mt-4 mb-2">
			<span>Email</span>
			<input class="input" type="text" placeholder="" />
		</label>
		<label class="label mb-2">
			<span>Password</span>
			<input class="input" type="password" placeholder="" />
		</label>
		<label class="label">
			<span>Confirm Password</span>
			<input class="input" type="password" placeholder="" />
		</label>

		<button class="btn variant-filled-primary w-full mt-7">Register</button>
	</form>
</div>
