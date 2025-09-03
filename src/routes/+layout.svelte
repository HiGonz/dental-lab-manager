<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { currentUser, isAuthenticated } from '$lib/stores';
	import Navigation from '$lib/components/Navigation.svelte';

	let sidebarOpen = false;

	$: isLoginPage = $page.url.pathname === '/login';
	$: shouldShowNavigation = $isAuthenticated && !isLoginPage;

	onMount(() => {
		// Check if user is already logged in
		const savedUser = localStorage.getItem('currentUser');
		if (savedUser) {
			try {
				currentUser.set(JSON.parse(savedUser));
			} catch (error) {
				console.error('Failed to parse saved user:', error);
				localStorage.removeItem('currentUser');
			}
		}
	});

	// Redirect to login if not authenticated and not already on login page
	$: if (!$isAuthenticated && !isLoginPage && typeof window !== 'undefined') {
		goto('/login');
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
</script>

<div class="h-full bg-gray-50">
	{#if shouldShowNavigation}
		<!-- Mobile header -->
		<div class="lg:hidden">
			<div class="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
				<button
					type="button"
					class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
					on:click={toggleSidebar}
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
				<h1 class="text-lg font-semibold text-gray-800">Lab Manager</h1>
				<div class="w-6"></div> <!-- Spacer for centering -->
			</div>
		</div>

		<!-- Navigation -->
		<Navigation bind:sidebarOpen />

		<!-- Main content -->
		<div class="lg:pl-64 flex flex-col flex-1">
			<main class="flex-1">
				<slot />
			</main>
		</div>
	{:else}
		<!-- Login page without navigation -->
		<slot />
	{/if}
</div>

<style>
	:global(html, body) {
		height: 100%;
	}
</style>