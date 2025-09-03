<script lang="ts">
	import { goto } from '$app/navigation';
	import { api } from '$lib/api';
	import { currentUser } from '$lib/stores';
	import { onMount } from 'svelte';

	let username = '';
	let password = '';
	let isLoading = false;
	let error = '';

	// Demo users info
	const demoUsers = [
		{ username: 'especialista1', name: 'Dr. María González', role: 'Specialist' },
		{ username: 'recepcionista1', name: 'Ana Martínez', role: 'Receptionist' },
		{ username: 'gerente1', name: 'Carlos Rodriguez', role: 'Branch Manager' },
		{ username: 'tecnico1', name: 'Luis Fernández', role: 'Lab Technician' }
	];

	onMount(() => {
		// Check if user is already logged in
		const savedUser = localStorage.getItem('currentUser');
		if (savedUser) {
			currentUser.set(JSON.parse(savedUser));
			goto('/dashboard');
		}
	});

	async function handleLogin() {
		if (!username || !password) {
			error = 'Please enter both username and password';
			return;
		}

		isLoading = true;
		error = '';

		try {
			const user = await api.login(username, password);
			if (user) {
				currentUser.set(user);
				localStorage.setItem('currentUser', JSON.stringify(user));
				goto('/dashboard');
			}
		} catch (err) {
			error = 'Invalid username or password';
		} finally {
			isLoading = false;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleLogin();
		}
	}

	function fillDemoCredentials(demoUsername: string) {
		username = demoUsername;
		password = 'demo123';
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<div class="mx-auto h-12 w-12 text-primary-600 flex items-center justify-center">
				<svg class="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
				</svg>
			</div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Dental Lab Manager
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Sign in to your account
			</p>
		</div>

		<form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
			<div class="card space-y-4">
				<div>
					<label for="username" class="block text-sm font-medium text-gray-700">
						Username
					</label>
					<input
						id="username"
						name="username"
						type="text"
						autocomplete="username"
						required
						class="input mt-1"
						placeholder="Enter your username"
						bind:value={username}
						on:keypress={handleKeyPress}
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="input mt-1"
						placeholder="Enter your password"
						bind:value={password}
						on:keypress={handleKeyPress}
					/>
				</div>

				{#if error}
					<div class="text-danger-600 text-sm text-center">
						{error}
					</div>
				{/if}

				<button
					type="submit"
					disabled={isLoading}
					class="w-full btn btn-primary h-10 text-sm font-medium"
				>
					{#if isLoading}
						<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Signing in...
					{:else}
						Sign in
					{/if}
				</button>
			</div>
		</form>

		<div class="mt-8">
			<div class="text-center">
				<p class="text-sm text-gray-600 mb-4">Demo Users (Password: demo123)</p>
				<div class="grid grid-cols-1 gap-2">
					{#each demoUsers as user}
						<button
							type="button"
							class="text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
							on:click={() => fillDemoCredentials(user.username)}
						>
							<div class="font-medium text-sm text-gray-900">{user.name}</div>
							<div class="text-xs text-gray-500">{user.role} • {user.username}</div>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>