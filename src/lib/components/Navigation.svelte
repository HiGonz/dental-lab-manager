<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { currentUser, sidebarOpen } from '$lib/stores';
	import { getRoleLabel, getRoleColor } from '$lib/utils';
	import { api } from '$lib/api';

	$: user = $currentUser;
	$: currentPath = $page.url.pathname;

	// Navigation items based on role
	$: navigationItems = user ? getNavigationItems(user.role) : [];

	function getNavigationItems(role: string) {
		const baseItems = [
		   { name: 'Inicio', href: '/dashboard', icon: 'home' },
		   { name: 'Órdenes', href: '/orders', icon: 'clipboard' }
		];

		const roleSpecificItems = {
		   specialist: [
			   { name: 'Pacientes', href: '/patients', icon: 'users' }
		   ],
		   receptionist: [
			   { name: 'Pacientes', href: '/patients', icon: 'users' },
			   { name: 'Calendario', href: '/calendar', icon: 'calendar' }
		   ],
		   manager: [
			   { name: 'Calendario', href: '/calendar', icon: 'calendar' },
			   { name: 'Indicadores', href: '/kpis', icon: 'chart' }
		   ],
		   technician: [
			   { name: 'Calendario', href: '/calendar', icon: 'calendar' }
		   ]
		};

		return [
		   ...baseItems,
		   ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || []),
		   { name: 'Configuración', href: '/settings', icon: 'settings' }
		];
	}

	function getIconPath(icon: string) {
		const icons = {
			home: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0zM3 7l9-4 9 4M4 10l8 5 8-5',
			clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
			users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z',
			calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
			chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
			settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
		};
		return icons[icon as keyof typeof icons] || icons.home;
	}

	function isActiveRoute(href: string) {
		if (href === '/dashboard') {
			return currentPath === '/dashboard' || currentPath === '/';
		}
		return currentPath.startsWith(href);
	}

	async function handleLogout() {
		try {
			await api.logout();
			currentUser.set(null);
			goto('/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}
</script>

<!-- Mobile sidebar backdrop -->
{#if $sidebarOpen}
	<div class="fixed inset-0 z-40 lg:hidden">
		<div 
			class="fixed inset-0 bg-gray-600 bg-opacity-75" 
			role="button"
			tabindex="0"
			on:click={() => sidebarOpen.set(false)} 
			on:keydown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') sidebarOpen.set(false); }}
		></div>
	</div>
{/if}

<!-- Mobile sidebar -->
<div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden {$sidebarOpen ? 'translate-x-0' : '-translate-x-full'}">>
	<div class="flex items-center justify-between h-16 px-4 border-b border-gray-200">
		<span class="text-xl font-semibold text-gray-800">Lab Manager</span>
		<button
			type="button"
			class="text-gray-500 hover:text-gray-700"
			on:click={() => sidebarOpen.set(false)}
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
	
	<nav class="mt-8 px-4">
		<ul class="space-y-2">
			{#each navigationItems as item}
				<li>
					<a
						href={item.href}
						class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors {
							isActiveRoute(item.href)
								? 'bg-primary-100 text-primary-700'
								: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
						}"
						on:click={() => sidebarOpen.set(false)}
					>
						<svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(item.icon)} />
						</svg>
						{item.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<!-- Desktop sidebar -->
<div class="hidden lg:flex lg:flex-shrink-0">
	<div class="flex flex-col w-64">
		<div class="flex flex-col h-screen bg-white border-r border-gray-200 sticky top-0">
			<div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
				<div class="flex items-center flex-shrink-0 px-4">
					<div class="h-8 w-8 text-primary-600 flex items-center justify-center">
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
						</svg>
					</div>
					<span class="ml-2 text-xl font-semibold text-gray-800">Administrador de Laboratorio</span>
				</div>
				
				<nav class="mt-8 flex-1 px-4 space-y-2">
					{#each navigationItems as item}
						<a
							href={item.href}
							class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors {
								isActiveRoute(item.href)
									? 'bg-primary-100 text-primary-700'
									: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
							}"
						>
							<svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(item.icon)} />
							</svg>
							{item.name}
						</a>
					{/each}
				</nav>
			</div>
			
			{#if user}
				<div class="flex-shrink-0 flex border-t border-gray-200 p-4">
					<div class="flex items-center w-full group">
						<div class="flex-shrink-0">
							<div class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-{getRoleColor(user.role)}-100">
								<span class="text-sm font-medium text-{getRoleColor(user.role)}-800">
									{user.name.charAt(0).toUpperCase()}
								</span>
							</div>
						</div>
						<div class="ml-3 flex-1">
							<p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
								{user.name}
							</p>
							<p class="text-xs text-gray-500">
								{getRoleLabel(user.role)}
							</p>
						</div>
						<button
							type="button"
							class="ml-3 text-gray-400 hover:text-gray-600"
							on:click={handleLogout}
							title="Cerrar sesión"
						>
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>