<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { currentUser, isAuthenticated, sidebarOpen } from '$lib/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import { demoUsers } from '$lib/data/demo-users';

	$: isLoginPage = $page.url.pathname === '/login';
	$: shouldShowNavigation = $isAuthenticated && !isLoginPage;

	onMount(() => {
		console.log('Layout onMount called');
		// Check if user is already logged in
		const savedUser = localStorage.getItem('currentUser');
		console.log('Saved user from localStorage:', savedUser);
		
		if (savedUser) {
			try {
				const user = JSON.parse(savedUser);
				console.log('Parsed user:', user);
				currentUser.set(user);
			} catch (error) {
				console.error('Failed to parse saved user:', error);
				localStorage.removeItem('currentUser');
				// Load default manager user if parsing fails
				const managerUser = demoUsers.find(user => user.role === 'manager');
				console.log('Loading fallback manager user:', managerUser);
				if (managerUser) {
					currentUser.set(managerUser);
					localStorage.setItem('currentUser', JSON.stringify(managerUser));
				}
			}
		} else {
			// Load default manager user if no saved user
			const managerUser = demoUsers.find(user => user.role === 'manager');
			console.log('No saved user, loading default manager:', managerUser);
			if (managerUser) {
				currentUser.set(managerUser);
				localStorage.setItem('currentUser', JSON.stringify(managerUser));
			}
		}
	});

	// Redirect to login if not authenticated and not already on login page
	// $: if (!$isAuthenticated && !isLoginPage && typeof window !== 'undefined') {
	// 	goto('/login');
	// }

	function toggleSidebar() {
		sidebarOpen.update(open => !open);
	}
</script>


<div class="min-h-screen bg-gray-50">
   {#if shouldShowNavigation}
	   <div class="flex min-h-screen">
		   <!-- Navigation -->
		   <Navigation />

		   <!-- Encabezado móvil -->
		   <div class="lg:hidden fixed top-0 left-0 right-0 z-30">
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
				   <h1 class="text-lg font-semibold text-gray-800">Administrador de Laboratorio</h1>
				   <div class="w-6"></div> <!-- Espaciador para centrar -->
			   </div>
		   </div>

		   <!-- Contenido principal -->
		   <div class="flex-1 flex flex-col lg:ml-0 min-h-screen">
			   <main class="flex-1 pt-16 lg:pt-0">
				   <slot />
			   </main>
		   </div>
	   </div>
   {:else}
	   <!-- Página de inicio de sesión sin navegación -->
	   <slot />
   {/if}
</div>

<style>
	:global(html, body) {
		height: 100%;
	}
	
	:global(#svelte) {
		height: 100%;
	}
</style>