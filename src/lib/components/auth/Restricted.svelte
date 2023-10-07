<script lang="ts">
	import { user, userStore } from '$lib/stores/user.store';
</script>

{#if $user}
	<slot />
{:else}
	<slot name="noUser" />
{/if}
