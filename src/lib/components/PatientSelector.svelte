<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PatientAutocomplete from './PatientAutocomplete.svelte';
  import { demoUsers } from '$lib/data/demo-users';
  import { demoBranches } from '$lib/data/demo-branches';
  import type { Patient } from '$lib/types';

  export let selectedPatient: Patient | null = null;
  export let specialistId: string = '';
  export let branchId: string = '';
  export let date: string = new Date().toISOString().split('T')[0];
  export let title: string = 'Información Básica';

  const dispatch = createEventDispatcher<{
    'patient-change': Patient | null;
    'specialist-change': string;
    'branch-change': string;
    'date-change': string;
  }>();

  function handlePatientSelect(event: CustomEvent<Patient>) {
    selectedPatient = event.detail;
    dispatch('patient-change', selectedPatient);
  }

  function handleSpecialistChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    specialistId = target.value;
    dispatch('specialist-change', specialistId);
  }

  function handleBranchChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    branchId = target.value;
    dispatch('branch-change', branchId);
  }

  function handleDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    date = target.value;
    dispatch('date-change', date);
  }
</script>

<div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
  <div class="flex items-center mb-6">
    <div class="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl mr-4">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
    <h3 class="text-2xl font-semibold text-gray-900">{title}</h3>
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Especialista -->
    <div class="space-y-4">
      <label for="specialist" class="block text-sm font-semibold text-gray-700">
        Especialista *
      </label>
      <select 
        id="specialist"
        bind:value={specialistId}
        on:change={handleSpecialistChange}
        class="block w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-4 text-gray-900 transition-all duration-200"
        required
      >
        <option value="">Seleccione un especialista</option>
        {#each demoUsers as user}
          <option value={user.id}>{user.name}</option>
        {/each}
      </select>
    </div>

    <!-- Paciente -->
    <div class="space-y-4">
      <label for="patient-autocomplete" class="block text-sm font-semibold text-gray-700">
        Paciente *
      </label>
      <PatientAutocomplete 
        {selectedPatient}
        on:select={handlePatientSelect}
      />
      {#if selectedPatient}
        <div class="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full mr-3">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-green-900">{selectedPatient.name}</p>
            <p class="text-xs text-green-700">{selectedPatient.phone}</p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Sucursal -->
    <div class="space-y-4">
      <label for="branch" class="block text-sm font-semibold text-gray-700">
        Sucursal *
      </label>
      <select 
        id="branch"
        bind:value={branchId}
        on:change={handleBranchChange}
        class="block w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-4 text-gray-900 transition-all duration-200"
        required
      >
        <option value="">Seleccione una sucursal</option>
        {#each demoBranches as branch}
          <option value={branch.id}>{branch.name}</option>
        {/each}
      </select>
    </div>

    <!-- Fecha -->
    <div class="space-y-4">
      <label for="date" class="block text-sm font-semibold text-gray-700">
        Fecha de Solicitud *
      </label>
      <div class="relative">
        <input 
          id="date"
          type="date"
          bind:value={date}
          on:change={handleDateChange}
          class="block w-full rounded-xl border-2 border-gray-200 shadow-sm bg-gray-50 p-4 text-gray-900"
          readonly
          disabled
        >
        <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>