<script>
	import { authPageStore } from '$lib/stores/authPage.store';
	import Icon from '@iconify/svelte';

	function onBack() {
		$authPageStore = 'app';
	}
</script>

<div class="w-screen flex p-6 justify-center items-start overflow-y-auto">
	<form class="w-full">
		<button type="button" class="mb-4 btn variant-filled-secondary btn-sm" on:click={onBack}>
			<Icon icon="ion:chevron-back" class="mr-1" />
			Back
		</button>
		<h1 class="text-3xl font-bold pb-2">Account Created!</h1>
		<p>Your account has successfully been created! Please login to get started.</p>
		<button class="btn variant-filled-primary mt-4" on:click={() => ($authPageStore = 'login')}>
			<span>Login</span>
			<Icon icon="ion:chevron-forward" />
		</button>
	</form>
</div>
