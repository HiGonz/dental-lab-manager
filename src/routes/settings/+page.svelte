<script lang="ts">
	import { currentUser, preferences } from '$lib/stores';
	import { getRoleLabel } from '$lib/utils';

	$: user = $currentUser;
</script>

<div class="p-6">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900">Settings</h1>
		<p class="mt-1 text-sm text-gray-600">
			Manage your account and application preferences
		</p>
	</div>

	<div class="max-w-4xl space-y-8">
		<!-- Profile Information -->
		<div class="card">
			<h2 class="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
			
			{#if user}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Full Name
						</label>
						<input
							type="text"
							class="input"
							value={user.name}
							readonly
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Role
						</label>
						<input
							type="text"
							class="input"
							value={getRoleLabel(user.role)}
							readonly
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Email
						</label>
						<input
							type="email"
							class="input"
							value={user.email}
							readonly
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Username
						</label>
						<input
							type="text"
							class="input"
							value={user.username}
							readonly
						/>
					</div>
				</div>
				
				<div class="mt-6 pt-6 border-t border-gray-200">
					<p class="text-sm text-gray-500">
						This is a demo application. Profile information is read-only.
					</p>
				</div>
			{/if}
		</div>

		<!-- Notifications -->
		<div class="card">
			<h2 class="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
			
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="text-sm font-medium text-gray-900">Push Notifications</h3>
						<p class="text-sm text-gray-500">Receive push notifications for important updates</p>
					</div>
					<label class="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							class="sr-only peer"
							bind:checked={$preferences.notifications}
						/>
						<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
					</label>
				</div>

				<div class="flex items-center justify-between">
					<div>
						<h3 class="text-sm font-medium text-gray-900">Email Alerts</h3>
						<p class="text-sm text-gray-500">Receive email alerts for overdue orders and urgent tasks</p>
					</div>
					<label class="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							class="sr-only peer"
							bind:checked={$preferences.emailAlerts}
						/>
						<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
					</label>
				</div>
			</div>
		</div>

		<!-- App Information -->
		<div class="card">
			<h2 class="text-lg font-medium text-gray-900 mb-4">Application Information</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
				<div>
					<h3 class="font-medium text-gray-900 mb-2">Version</h3>
					<p class="text-gray-600">Dental Lab Manager v0.1.0</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 mb-2">Build</h3>
					<p class="text-gray-600">Demo Build - {new Date().toLocaleDateString()}</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 mb-2">Framework</h3>
					<p class="text-gray-600">SvelteKit with TailwindCSS</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 mb-2">Data</h3>
					<p class="text-gray-600">Demo data included</p>
				</div>
			</div>
		</div>

		<!-- Demo Information -->
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
			<div class="flex items-start">
				<svg class="w-6 h-6 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<div>
					<h3 class="text-sm font-medium text-blue-900 mb-1">Demo Application</h3>
					<div class="text-sm text-blue-800 space-y-2">
						<p>This is a demonstration of the Dental Lab Manager application.</p>
						<div>
							<p class="font-medium mb-1">Available demo users:</p>
							<ul class="list-disc list-inside space-y-1 ml-4">
								<li><strong>especialista1</strong> - Dr. María González (Specialist)</li>
								<li><strong>recepcionista1</strong> - Ana Martínez (Receptionist)</li>
								<li><strong>gerente1</strong> - Carlos Rodriguez (Branch Manager)</li>
								<li><strong>tecnico1</strong> - Luis Fernández (Lab Technician)</li>
							</ul>
							<p class="mt-2">All demo users use password: <code class="bg-blue-100 px-1 rounded">demo123</code></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>