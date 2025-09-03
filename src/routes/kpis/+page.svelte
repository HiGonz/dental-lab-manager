<script lang="ts">
	import { currentUser } from '$lib/stores';
	import { canViewKPIs } from '$lib/utils';

	$: user = $currentUser;
	$: canView = user ? canViewKPIs(user.role) : false;
</script>

<div class="p-6">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900">KPIs & Analytics</h1>
		<p class="mt-1 text-sm text-gray-600">
			Performance metrics and analytics dashboard
		</p>
	</div>

	{#if !canView}
		<!-- Access Denied -->
		<div class="card text-center py-12">
			<svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
			</svg>
			<h3 class="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
			<p class="text-gray-600">
				KPI and analytics data is only available to Branch Managers and Lab Technicians.
			</p>
		</div>
	{:else}
		<!-- Coming Soon -->
		<div class="card text-center py-12">
			<svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
			</svg>
			<h3 class="text-lg font-medium text-gray-900 mb-2">KPI Dashboard Coming Soon</h3>
			<p class="text-gray-600 max-w-md mx-auto">
				Comprehensive analytics and KPI dashboard for tracking performance metrics, delivery times, and quality scores.
			</p>
			
			<div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
				<div class="text-center p-4 bg-gray-50 rounded-lg">
					<div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
						<svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h4 class="font-medium text-gray-900 mb-1">Delivery Times</h4>
					<p class="text-sm text-gray-600">Average and trend analysis</p>
				</div>
				
				<div class="text-center p-4 bg-gray-50 rounded-lg">
					<div class="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
						<svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h4 class="font-medium text-gray-900 mb-1">Quality Scores</h4>
					<p class="text-sm text-gray-600">By specialist and technician</p>
				</div>
				
				<div class="text-center p-4 bg-gray-50 rounded-lg">
					<div class="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-3">
						<svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
						</svg>
					</div>
					<h4 class="font-medium text-gray-900 mb-1">Performance Trends</h4>
					<p class="text-sm text-gray-600">Monthly and yearly reports</p>
				</div>
				
				<div class="text-center p-4 bg-gray-50 rounded-lg">
					<div class="w-10 h-10 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-3">
						<svg class="w-5 h-5 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 12.5C3.962 14.333 4.924 16 6.464 16z" />
						</svg>
					</div>
					<h4 class="font-medium text-gray-900 mb-1">Alerts & Issues</h4>
					<p class="text-sm text-gray-600">Overdue orders and bottlenecks</p>
				</div>
			</div>
		</div>
	{/if}
</div>