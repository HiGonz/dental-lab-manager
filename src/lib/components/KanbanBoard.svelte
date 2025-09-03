<script lang="ts">
	import type { Order } from '$lib/types';
	import { groupBy } from '$lib/utils';
	import OrderCard from './OrderCard.svelte';

	export let orders: Order[] = [];
	export let allowDragDrop = true;
	export let showFilters = true;

	// Kanban columns configuration
	const columns = [
		{ 
			id: 'pending', 
			title: 'Pending Review',
			color: 'warning',
			description: 'Orders waiting for approval'
		},
		{ 
			id: 'approved', 
			title: 'Approved',
			color: 'primary',
			description: 'Orders ready for production'
		},
		{ 
			id: 'in_progress', 
			title: 'In Progress',
			color: 'primary',
			description: 'Orders being manufactured'
		},
		{ 
			id: 'completed', 
			title: 'Completed',
			color: 'success',
			description: 'Orders ready for delivery'
		},
		{ 
			id: 'delivered', 
			title: 'Delivered',
			color: 'secondary',
			description: 'Orders delivered to patients'
		},
		{ 
			id: 'rejected', 
			title: 'Rejected',
			color: 'danger',
			description: 'Orders that need revision'
		}
	];

	// Group orders by status
	$: groupedOrders = groupBy(orders, 'status');
	$: orderCounts = columns.map(col => ({
		...col,
		count: groupedOrders[col.id]?.length || 0,
		orders: groupedOrders[col.id] || []
	}));

	// Filter states
	let searchQuery = '';
	let urgentOnly = false;
	let overdueOnly = false;

	// Filtered orders
	$: filteredOrders = orders.filter(order => {
		const matchesSearch = !searchQuery || 
			order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.patient?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.specialist?.name.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesUrgent = !urgentOnly || order.urgentTag;
		
		const isOverdue = overdueOnly ? (
			new Date(order.dueDate) < new Date() && 
			order.status !== 'completed' && 
			order.status !== 'delivered'
		) : true;
		
		return matchesSearch && matchesUrgent && isOverdue;
	});

	$: filteredGroupedOrders = groupBy(filteredOrders, 'status');
	$: filteredOrderCounts = columns.map(col => ({
		...col,
		count: filteredGroupedOrders[col.id]?.length || 0,
		orders: filteredGroupedOrders[col.id] || []
	}));

	// Drag and drop functionality
	let draggedOrder: Order | null = null;
	let dragOverColumn: string | null = null;

	function handleDragStart(event: DragEvent, order: Order) {
		if (!allowDragDrop) return;
		
		draggedOrder = order;
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('text/html', order.id);
		}
	}

	function handleDragOver(event: DragEvent, columnId: string) {
		if (!allowDragDrop || !draggedOrder) return;
		
		event.preventDefault();
		dragOverColumn = columnId;
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	}

	function handleDragLeave() {
		dragOverColumn = null;
	}

	function handleDrop(event: DragEvent, columnId: string) {
		if (!allowDragDrop || !draggedOrder) return;
		
		event.preventDefault();
		
		// Only allow certain status transitions
		const allowedTransitions: Record<string, string[]> = {
			'pending': ['approved', 'rejected'],
			'approved': ['in_progress', 'rejected'],
			'in_progress': ['completed', 'rejected'],
			'completed': ['delivered'],
			'rejected': ['pending'],
			'delivered': [] // No transitions from delivered
		};

		if (allowedTransitions[draggedOrder.status]?.includes(columnId)) {
			// Dispatch custom event for status update
			const updateEvent = new CustomEvent('orderStatusUpdate', {
				detail: {
					orderId: draggedOrder.id,
					newStatus: columnId,
					oldStatus: draggedOrder.status
				}
			});
			document.dispatchEvent(updateEvent);
		}

		draggedOrder = null;
		dragOverColumn = null;
	}

	function clearFilters() {
		searchQuery = '';
		urgentOnly = false;
		overdueOnly = false;
	}
</script>

<div class="space-y-6">
	<!-- Filters -->
	{#if showFilters}
		<div class="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
			<div class="flex flex-wrap items-center gap-4">
				<div class="flex-1 min-w-64">
					<input
						type="text"
						placeholder="Search orders, patients, or specialists..."
						class="input w-full"
						bind:value={searchQuery}
					/>
				</div>
				<div class="flex items-center space-x-4">
					<label class="flex items-center">
						<input
							type="checkbox"
							class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
							bind:checked={urgentOnly}
						/>
						<span class="ml-2 text-sm text-gray-700">Urgent only</span>
					</label>
					<label class="flex items-center">
						<input
							type="checkbox"
							class="rounded border-gray-300 text-danger-600 shadow-sm focus:border-danger-300 focus:ring focus:ring-danger-200 focus:ring-opacity-50"
							bind:checked={overdueOnly}
						/>
						<span class="ml-2 text-sm text-gray-700">Overdue only</span>
					</label>
					{#if searchQuery || urgentOnly || overdueOnly}
						<button
							type="button"
							class="text-sm text-gray-500 hover:text-gray-700"
							on:click={clearFilters}
						>
							Clear filters
						</button>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<!-- Kanban Board -->
	<div class="overflow-x-auto">
		<div class="flex space-x-6 min-w-max pb-4">
			{#each filteredOrderCounts as column}
				<div 
					class="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4 {dragOverColumn === column.id ? 'ring-2 ring-primary-500 bg-primary-50' : ''}"
					on:dragover={(e) => handleDragOver(e, column.id)}
					on:dragleave={handleDragLeave}
					on:drop={(e) => handleDrop(e, column.id)}
					role="region"
					aria-label="{column.title} column"
				>
					<!-- Column Header -->
					<div class="flex items-center justify-between mb-4">
						<div>
							<h3 class="font-semibold text-gray-900 text-sm">
								{column.title}
							</h3>
							<p class="text-xs text-gray-500 mt-1">
								{column.description}
							</p>
						</div>
						<span class="bg-{column.color}-100 text-{column.color}-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
							{column.count}
						</span>
					</div>

					<!-- Orders in Column -->
					<div class="space-y-3 min-h-32">
						{#each column.orders as order (order.id)}
							<div
								draggable={allowDragDrop}
								on:dragstart={(e) => handleDragStart(e, order)}
								class="transform transition-transform {allowDragDrop ? 'hover:scale-105 cursor-move' : ''}"
								role="button"
								tabindex="0"
							>
								<OrderCard {order} compact={true} />
							</div>
						{/each}

						{#if column.orders.length === 0}
							<div class="text-center py-8 text-gray-400">
								<svg class="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
								<p class="text-sm">No orders</p>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Summary -->
	<div class="bg-white p-4 rounded-lg border border-gray-200">
		<div class="grid grid-cols-2 md:grid-cols-6 gap-4">
			{#each filteredOrderCounts as column}
				<div class="text-center">
					<div class="text-2xl font-bold text-{column.color}-600">
						{column.count}
					</div>
					<div class="text-sm text-gray-600">
						{column.title}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>