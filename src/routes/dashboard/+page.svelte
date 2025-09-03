<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser, dashboardStats } from '$lib/stores';
	import { api } from '$lib/api';
	import { getRoleLabel } from '$lib/utils';

	$: user = $currentUser;

	onMount(async () => {
		if (user) {
			try {
				const data = await api.getDashboardStats(user.id, user.role);
				dashboardStats.set(data);
			} catch (error) {
				console.error('Failed to load dashboard stats:', error);
			}
		}
	});
</script>

<div class="p-6">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900">
			Welcome back, {user?.name || 'User'}!
		</h1>
		<p class="mt-1 text-sm text-gray-600">
			{user ? getRoleLabel(user.role) : ''} Dashboard
		</p>
	</div>

	<!-- Quick Stats -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
		<div class="card">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
						<svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
					</div>
				</div>
				<div class="ml-5 w-0 flex-1">
					<dl>
						<dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
						<dd class="text-lg font-medium text-gray-900">{$dashboardStats.totalOrders}</dd>
					</dl>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<div class="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center">
						<svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
				</div>
				<div class="ml-5 w-0 flex-1">
					<dl>
						<dt class="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
						<dd class="text-lg font-medium text-gray-900">{$dashboardStats.pendingOrders}</dd>
					</dl>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<div class="w-8 h-8 bg-danger-100 rounded-full flex items-center justify-center">
						<svg class="w-5 h-5 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 12.5C3.962 14.333 4.924 16 6.464 16z" />
						</svg>
					</div>
				</div>
				<div class="ml-5 w-0 flex-1">
					<dl>
						<dt class="text-sm font-medium text-gray-500 truncate">Overdue Orders</dt>
						<dd class="text-lg font-medium text-gray-900">{$dashboardStats.overdueOrders}</dd>
					</dl>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<div class="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
						<svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
				</div>
				<div class="ml-5 w-0 flex-1">
					<dl>
						<dt class="text-sm font-medium text-gray-500 truncate">Completed Today</dt>
						<dd class="text-lg font-medium text-gray-900">{$dashboardStats.completedToday}</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>

	<!-- Recent Activity Placeholder -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<div class="card">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
			<div class="space-y-3">
				<div class="text-sm text-gray-600">Recent activity will be displayed here...</div>
			</div>
		</div>

		<div class="card">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
			<div class="space-y-3">
				{#if user?.role === 'specialist' || user?.role === 'receptionist'}
					<a href="/orders/create" class="btn btn-primary w-full text-center">
						Create New Order
					</a>
				{/if}
				<a href="/orders" class="btn btn-secondary w-full text-center">
					View All Orders
				</a>
				{#if user?.role === 'receptionist' || user?.role === 'manager'}
					<a href="/patients" class="btn btn-secondary w-full text-center">
						Manage Patients
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>