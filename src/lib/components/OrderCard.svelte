<script lang="ts">
	import type { Order, Patient, User } from '$lib/types';
	import { formatDate, formatRelativeTime, getStatusColor, getStatusLabel, getDaysUntilDue } from '$lib/utils';

	export let order: Order;
	export let showPatient = true;
	export let showSpecialist = true;
	export let compact = false;

	$: urgentTag = order.urgentTag;
	$: statusColor = getStatusColor(order.status);
	$: statusLabel = getStatusLabel(order.status);
	$: daysUntilDue = getDaysUntilDue(order.dueDate);
	$: isOverdue = daysUntilDue < 0 && order.status !== 'completed' && order.status !== 'delivered';
	$: isDueSoon = daysUntilDue <= 1 && daysUntilDue >= 0 && order.status !== 'completed' && order.status !== 'delivered';

	function handleCardClick() {
		// Navigate to order detail page
		window.location.href = `/orders/${order.id}`;
	}
</script>

<div 
	class="card hover:shadow-md transition-shadow cursor-pointer {compact ? 'p-4' : 'p-6'}"
	on:click={handleCardClick}
	on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }}
	role="button"
	tabindex="0"
>
	<!-- Header with status and urgent tag -->
	<div class="flex items-start justify-between mb-3">
		<div class="flex items-center space-x-2">
			<span class="badge badge-{statusColor}">
				{statusLabel}
			</span>
			   {#if urgentTag}
				   <span class="badge badge-danger">
					   <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 12.5C3.962 14.333 4.924 16 6.464 16z" />
					   </svg>
					   Urgente
				   </span>
			   {/if}
			   {#if isOverdue}
				   <span class="badge badge-danger">
					   <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					   </svg>
					   Atrasada
				   </span>
			   {:else if isDueSoon}
				   <span class="badge badge-warning">
					   <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					   </svg>
					   Próxima a vencer
				   </span>
			   {/if}
		</div>
		<div class="text-sm text-gray-500">
			#{order.id.slice(-6)}
		</div>
	</div>

	<!-- Order description -->
	<h3 class="font-medium text-gray-900 mb-2 {compact ? 'text-sm' : 'text-base'}">
		{order.description}
	</h3>

	<!-- Patient info -->
	{#if showPatient && order.patient}
		<div class="flex items-center text-sm text-gray-600 mb-2">
			<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
			</svg>
			{order.patient.name}
		</div>
	{/if}

	<!-- Specialist info -->
	{#if showSpecialist && order.specialist}
		<div class="flex items-center text-sm text-gray-600 mb-2">
			<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
			</svg>
			{order.specialist.name}
		</div>
	{/if}

	<!-- Progress bar for in-progress orders -->
	{#if order.status === 'in_progress' && order.stages.length > 0}
		<div class="mb-3">
			   <div class="flex justify-between text-xs text-gray-500 mb-1">
				   <span>Progreso</span>
				   <span>{order.stages.filter(s => s.status === 'completed').length} / {order.stages.length}</span>
			   </div>
			<div class="w-full bg-gray-200 rounded-full h-2">
				<div 
					class="bg-primary-600 h-2 rounded-full transition-all duration-300"
					style="width: {(order.stages.filter(s => s.status === 'completed').length / order.stages.length) * 100}%"
				></div>
			</div>
		</div>
	{/if}

	<!-- Footer with dates -->
	   <div class="flex justify-between items-center text-xs text-gray-500 {compact ? 'mt-2' : 'mt-3'}">
		   <div class="flex flex-col">
			   <span>Creada: {formatDate(order.createdAt)}</span>
			   {#if order.completedAt}
				   <span>Completada: {formatDate(order.completedAt)}</span>
			   {:else if order.approvedAt}
				   <span>Aprobada: {formatDate(order.approvedAt)}</span>
			   {/if}
		   </div>
		   <div class="flex flex-col text-right">
			   <span class="font-medium {isOverdue ? 'text-danger-600' : isDueSoon ? 'text-warning-600' : ''}">
				   Vence: {formatDate(order.dueDate)}
			   </span>
			   {#if daysUntilDue >= 0}
				   <span class="{isDueSoon ? 'text-warning-600' : ''}">
					   {daysUntilDue} día{daysUntilDue !== 1 ? 's' : ''} restante{daysUntilDue !== 1 ? 's' : ''}
				   </span>
			   {:else}
				   <span class="text-danger-600">
					   {Math.abs(daysUntilDue)} día{Math.abs(daysUntilDue) !== 1 ? 's' : ''} atrasada{Math.abs(daysUntilDue) !== 1 ? 's' : ''}
				   </span>
			   {/if}
		   </div>
	   </div>
</div>