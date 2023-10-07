<script lang="ts">
	import { user } from '$lib/stores/user.store';
</script>

{#if $user}
	<slot />
{:else}
	<slot name="noUser" />
{/if}
