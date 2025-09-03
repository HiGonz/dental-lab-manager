<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		// Redirect to login page initially
		goto('/login');
	});
</script>

<div class="min-h-screen flex items-center justify-center">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Dental Lab Manager</h1>
		<p class="text-gray-600">Redirecting to login...</p>
	</div>
</div>