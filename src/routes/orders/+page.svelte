<script lang="ts">
	import { onMount } from 'svelte';
	import { orders, currentUser, loading } from '$lib/stores';
	import { api } from '$lib/api';
	import KanbanBoard from '$lib/components/KanbanBoard.svelte';
	import OrderCard from '$lib/components/OrderCard.svelte';

	$: user = $currentUser;
	$: canCreateOrder = user?.role === 'specialist' || user?.role === 'receptionist';
	$: canApproveOrder = user?.role === 'manager';
	$: canManageProduction = user?.role === 'technician';

	let viewMode: 'kanban' | 'list' = 'kanban';
	
	onMount(async () => {
		loading.set(true);
		try {
			const ordersData = await api.getOrders();
			// Populate related data for display
			const users = await api.getDemoUsers();
			const patients = await api.getPatients();
			
			const enrichedOrders = ordersData.map(order => ({
				...order,
				specialist: users.find(u => u.id === order.specialistId),
				technician: users.find(u => u.id === order.technicianId),
				patient: patients.find(p => p.id === order.patientId)
			}));
			
			orders.set(enrichedOrders);
		} catch (error) {
			console.error('Failed to load orders:', error);
		} finally {
			loading.set(false);
		}
	});

	// Handle order status updates from drag & drop
	function handleOrderStatusUpdate(event: Event) {
		const customEvent = event as CustomEvent;
		const { orderId, newStatus, oldStatus } = customEvent.detail;
		
		// Update order in store
		orders.update(orderList => 
			orderList.map(order => 
				order.id === orderId 
					? { ...order, status: newStatus, updatedAt: new Date() }
					: order
			)
		);

		// In a real app, this would also update the backend
		console.log(`Order ${orderId} moved from ${oldStatus} to ${newStatus}`);
	}

	onMount(() => {
		document.addEventListener('orderStatusUpdate', handleOrderStatusUpdate);
		return () => {
			document.removeEventListener('orderStatusUpdate', handleOrderStatusUpdate);
		};
	});
</script>

<div class="p-6 min-w-0 overflow-x-auto">
	<!-- Header -->
	<div class="flex items-center justify-between mb-6">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Órdenes</h1>
			<p class="mt-1 text-sm text-gray-600">
				Administrar y seguir órdenes del laboratorio dental
			</p>
		</div>
		
		<div class="flex items-center space-x-3">
			<!-- View Toggle -->
			<div class="flex rounded-lg border border-gray-300 p-1">
				<button
					type="button"
					class="px-3 py-1 text-sm font-medium rounded {viewMode === 'kanban' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:text-gray-700'}"
					on:click={() => viewMode = 'kanban'}
				>
					<svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
					</svg>
					Kanban
				</button>
				<button
					type="button"
					class="px-3 py-1 text-sm font-medium rounded {viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:text-gray-700'}"
					on:click={() => viewMode = 'list'}
				>
					<svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
					</svg>
					List
				</button>
			</div>

			<!-- Create Order Button -->
			{#if canCreateOrder}
				<a href="/orders/create" class="btn btn-primary">
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					Nueva Orden
				</a>
			{/if}
		</div>
	</div>

	<!-- Loading State -->
	{#if $loading}
		<div class="flex items-center justify-center py-12">
			<div class="flex items-center space-x-2">
				<svg class="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<span class="text-gray-600">Cargando órdenes...</span>
			</div>
		</div>
	{:else}
		<!-- Content -->
		{#if viewMode === 'kanban'}
			<KanbanBoard 
				orders={$orders} 
				allowDragDrop={canApproveOrder || canManageProduction}
				showFilters={true}
			/>
		{:else}
			<!-- List View -->
			<div class="space-y-4">
				{#if $orders.length === 0}
					<div class="text-center py-12">
						<svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
						<h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron órdenes</h3>
						<p class="text-gray-600 mb-4">Comienza creando tu primera orden.</p>
						{#if canCreateOrder}
							<a href="/orders/create" class="btn btn-primary">
								Crear Primera Orden
							</a>
						{/if}
					</div>
				{:else}
					<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
						{#each $orders as order (order.id)}
							<OrderCard {order} />
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	{/if}
</div>