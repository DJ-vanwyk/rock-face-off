<script lang="ts">
	import { teams } from '$lib/appwrite';

	teams
		.list()
		.then((resp) => teams.listMemberships(resp.teams[0].$id))
		.then((resp) => console.log(resp));
</script>
