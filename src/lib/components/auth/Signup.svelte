<script lang="ts">
	import { account } from '$lib/appwrite';
	import { auth } from '$lib/firebase';
	import { authPageStore } from '$lib/stores/authPage.store';
	import Icon from '@iconify/svelte';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { ID } from 'appwrite';

	const toastStore = getToastStore();

	function onLogin() {
		$authPageStore = 'login';
	}

	function onBack() {
		$authPageStore = 'app';
	}

	// Fomr Fields
	let name = '';
	let nameError = '';
	let email = '';
	let emailError = '';
	let password = '';
	let passwordError = '';
	let showPassword = false;
	let confirmPassword = '';
	let confirmPasswordError = '';
	let showConfirmPassword = false;
	// Error Message
	let Error = false;

	async function onSingUp() {
		nameError = '';
		emailError = '';
		passwordError = '';
		confirmPasswordError = '';
		Error = false;

		if (!name) {
			nameError = 'Required';
			Error = true;
		}
		if (!email) {
			emailError = 'Required';
			Error = true;
		}
		if (!password) {
			passwordError = 'Required';
			Error = true;
		}
		if (!confirmPassword) {
			confirmPasswordError = 'Required';
			Error = true;
		}

		if (Error) {
			return;
		}

		try {
			const promise = await account.create(ID.unique(), email, password, name);

			console.log(promise);
		} catch (error) {
			console.log(error);
			toastStore.trigger({
				message: error as any,
				autohide: true,
				timeout: 2000,
				background: 'variant-filled-error'
			});
		}
	}

	function onInput(field: string) {
		switch (field) {
			case 'name':
				nameError = '';
				Error = false;
				break;
			case 'email':
				emailError = '';
				Error = false;
				break;
			case 'password':
				passwordError = '';
				Error = false;
				break;
			case 'confirmPassword':
				confirmPasswordError = '';
				Error = false;
				if (password !== confirmPassword) {
					confirmPasswordError = 'Password does not match';
					Error = true;
				}
				break;
			default:
				break;
		}
	}
</script>

<div class="w-screen flex p-6 justify-center items-start overflow-y-auto">
	<form class="w-full">
		<button type="button" class="mb-4 btn variant-filled-secondary btn-sm" on:click={onBack}>
			<Icon icon="ion:chevron-back" class="mr-1" />
			Back
		</button>
		<h1 class="text-3xl font-bold pb-2">Register</h1>
		<p class="pb-4">
			Already have an account?
			<button class="text-blue-500 font-medium" on:click={onLogin} type="button">Login</button>
		</p>
		<!-- <button class="btn variant-outline-secondary w-full mb-4"
			><Icon icon="flat-color-icons:google" class="mr-2 text-2xl" on:click={onGoogleLogin} /> Sign Up
			with Google</button
		>
		<div class="relative py-4">
			<hr class="!border-t-2 or" />
			<span
				class="absolute text-center left-0 right-0 top-0 bottom-0 flex justify-center items-center"
			>
				<span class="px-4 bg-surface-50">OR</span>
			</span>
		</div> -->
		<label class="label mt-4 mb-2">
			<span>Name</span>
			<input
				class="input"
				class:input-error={nameError}
				type="text"
				placeholder=""
				bind:value={name}
				on:input={() => onInput('name')}
			/>
			{#if nameError}
				<small class="text-error-500">{nameError}</small>
			{/if}
		</label>
		<label class="label mt-4 mb-2">
			<span>Email</span>
			<input
				class="input"
				class:input-error={emailError}
				type="text"
				placeholder=""
				bind:value={email}
				on:input={() => onInput('email')}
			/>
			{#if emailError}
				<small class="text-error-500">{emailError}</small>
			{/if}
		</label>
		<label class="label mb-2" for="password">
			<span>Password</span>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				{#if showPassword}
					<input
						class="input"
						class:input-error={passwordError}
						type="text"
						placeholder=""
						name="password"
						bind:value={password}
						on:input={() => onInput('password')}
					/>
					<button class="input-group-shim" on:click={() => (showPassword = !showPassword)}>
						<Icon icon="ion:eye-off" />
					</button>
				{:else}
					<input
						class="input"
						class:input-error={passwordError}
						type="password"
						placeholder=""
						name="password"
						bind:value={password}
						on:input={() => onInput('password')}
					/>
					<button class="input-group-shim" on:click={() => (showPassword = !showPassword)}>
						<Icon icon="ion:eye" />
					</button>
				{/if}
			</div>

			{#if passwordError}
				<small class="text-error-500">{passwordError}</small>
			{/if}
		</label>
		<label class="label">
			<span>Confirm Password</span>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				{#if showConfirmPassword}
					<input
						class="input"
						class:input-error={confirmPasswordError}
						type="text"
						placeholder=""
						bind:value={confirmPassword}
						on:input={() => onInput('confirmPassword')}
					/>
					<button
						class="input-group-shim"
						on:click={() => (showConfirmPassword = !showConfirmPassword)}
					>
						<Icon icon="ion:eye-off" />
					</button>
				{:else}
					<input
						class="input"
						class:input-error={confirmPasswordError}
						type="password"
						placeholder=""
						bind:value={confirmPassword}
						on:input={() => onInput('confirmPassword')}
					/>
					<button
						class="input-group-shim"
						on:click={() => (showConfirmPassword = !showConfirmPassword)}
					>
						<Icon icon="ion:eye" />
					</button>
				{/if}
			</div>
			{#if confirmPasswordError}
				<small class="text-error-500">{confirmPasswordError}</small>
			{/if}
		</label>

		<button disabled={Error} class="btn variant-filled-primary w-full mt-7" on:click={onSingUp}>
			Register
		</button>
	</form>
</div>
