<script lang="ts">
	import { userStore } from '$lib/stores/user.store';
</script>

{#if $userStore}
	<slot />
{/if}

<slot name="noUser" />
