<script lang="ts">
	import { authPageStore } from '$lib/stores/authPage.store';
	import Login from './Login.svelte';
	import SignUpSuccess from './SignUpSuccess.svelte';
	import Signup from './Signup.svelte';
</script>

{#if $authPageStore === 'login'}
	<Login />
{:else if $authPageStore === 'signup'}
	<Signup />
{:else if $authPageStore === 'signUpSuccess'}
	<SignUpSuccess />
{:else}
	<slot />
{/if}
