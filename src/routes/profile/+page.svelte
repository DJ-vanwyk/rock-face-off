<script lang="ts">
	import Restricted from '$lib/components/auth/Restricted.svelte';
	import { authPageStore } from '$lib/stores/authPage.store';
	import { userStore } from '$lib/stores/user.store';

	function onLogin() {
		$authPageStore = 'login';
	}

	function onSignUp() {
		$authPageStore = 'signup';
	}
</script>

<Restricted>
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
