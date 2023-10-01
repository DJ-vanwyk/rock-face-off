<script lang="ts">
	import { auth } from '$lib/firebase';
	import { authPageStore } from '$lib/stores/authPage.store';
	import Icon from '@iconify/svelte';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	function onRegister() {
		$authPageStore = 'signup';
	}

	function onBack() {
		$authPageStore = 'app';
	}

	function onGoogleLogin() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;

				$authPageStore = 'app';
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}
</script>

<div class="w-screen h-screen flex p-6 justify-center items-start">
	<form class="w-full">
		<button type="button" class="mb-4 btn variant-filled-secondary btn-sm" on:click={onBack}>
			<Icon icon="ion:chevron-back" class="mr-1" />
			Back
		</button>
		<h1 class="text-3xl font-bold pb-2">Sign In</h1>
		<p class="pb-6">
			Don't have an account?
			<button class="text-blue-500 font-medium" on:click={onRegister} type="button">Register</button
			>
		</p>
		<button class="btn variant-outline-secondary w-full mb-4" on:click={onGoogleLogin}>
			<Icon icon="flat-color-icons:google" class="mr-2 text-2xl" />
			Sign In with Google
		</button>
		<!-- <div class="relative py-4">
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
		<label class="label">
			<span>Password</span>
			<input class="input" type="password" placeholder="" />
		</label>
		<div class="flex justify-end py-1">
			<button class="text-blue-500">Forget password?</button>
		</div>
		<button class="btn variant-filled-primary w-full mt-7">Login</button> -->
	</form>
</div>
