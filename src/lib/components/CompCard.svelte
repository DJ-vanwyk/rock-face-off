<script lang="ts">
	export let comp: any;
</script>

<div class="card overflow-hidden">
	<img src={comp.pic} alt="" class="h-28 w-full object-cover" />
	<div class="p-4">
		<h1 class="text-xl font-bold">{comp.name}</h1>
	</div>
</div>
