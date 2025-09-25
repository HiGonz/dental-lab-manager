<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PatientSelector from './PatientSelector.svelte';
  import type { Patient } from '$lib/types';

  export let formData = {
    specialistId: '',
    patientId: '',
    branchId: '',
    date: new Date().toISOString().split('T')[0],
    acrylicHooks: false,
    lockHooks: false,
    color: 'A1',
    action: 'cucharillas'
  };
  export let selectedPatient: Patient | null = null;

  const dispatch = createEventDispatcher<{
    submit: typeof formData;
    back: void;
  }>();

  // Available colors for prosthesis
  const colors = [
    'A1', 'A2', 'A3.5', 'B1', 'B2', 'B3', 
    'C1', 'C2', 'C3', 'D1', 'D2', 'D3'
  ];

  // Available actions/processes
  const actions = [
    { id: 'cucharillas', label: 'Toma de Cucharillas' },
    { id: 'prueba', label: 'Prueba de Oclusión' },
    { id: 'terminado', label: 'Trabajo Terminado' }
  ];

  function handlePatientChange(event: CustomEvent<Patient | null>) {
    selectedPatient = event.detail;
    formData.patientId = selectedPatient?.id || '';
  }

  function handleSpecialistChange(event: CustomEvent<string>) {
    formData.specialistId = event.detail;
  }

  function handleBranchChange(event: CustomEvent<string>) {
    formData.branchId = event.detail;
  }

  function handleDateChange(event: CustomEvent<string>) {
    formData.date = event.detail;
  }

  function handleSubmit() {
    // Validate required fields
    if (!formData.specialistId || !selectedPatient || !formData.branchId) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    // Set patient ID
    formData.patientId = selectedPatient.id;
    
    dispatch('submit', formData);
  }

  function handleBack() {
    dispatch('back');
  }
</script>

<div class="space-y-8">
  <div class="text-center border-b border-gray-200 pb-6">
    <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4">
      <span class="text-3xl">🦷</span>
    </div>
    <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
      Prótesis Acrílicas
    </h2>
    <p class="text-gray-600 mt-2">Complete la información para crear la orden</p>
  </div>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-8">
    <!-- Información básica -->
    <PatientSelector
      bind:selectedPatient
      bind:specialistId={formData.specialistId}
      bind:branchId={formData.branchId}
      bind:date={formData.date}
      title="Información Básica"
      on:patient-change={handlePatientChange}
      on:specialist-change={handleSpecialistChange}
      on:branch-change={handleBranchChange}
      on:date-change={handleDateChange}
    />

    <!-- Especificaciones del Trabajo -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
      <div class="flex items-center mb-6">
        <div class="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-xl mr-4">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900">Especificaciones del Trabajo</h3>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Ganchos -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Tipos de Ganchos</h4>
          <div class="space-y-4">
            <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
              <input 
                type="checkbox" 
                bind:checked={formData.acrylicHooks}
                class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
              <div class="ml-4">
                <span class="text-gray-900 font-medium">Ganchos Acrílicos</span>
                <p class="text-sm text-gray-500 mt-1">Ganchos fabricados en resina acrílica</p>
              </div>
            </label>
            <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
              <input 
                type="checkbox" 
                bind:checked={formData.lockHooks}
                class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
              <div class="ml-4">
                <span class="text-gray-900 font-medium">Ganchos Candado</span>
                <p class="text-sm text-gray-500 mt-1">Ganchos con sistema de retención candado</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Color -->
        <div class="space-y-4">
          <label for="color" class="block text-sm font-semibold text-gray-700">
            Color *
          </label>
          <select 
            id="color"
            bind:value={formData.color}
            class="block w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-white p-4 text-gray-900 transition-all duration-200"
            required
          >
            {#each colors as color}
              <option value={color}>{color}</option>
            {/each}
          </select>
          <p class="text-sm text-gray-500 mt-2">Seleccione el color según la carta de colores</p>
        </div>
      </div>
    </div>

    <!-- Acciones/Proceso -->
    <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100">
      <div class="flex items-center mb-6">
        <div class="flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-xl mr-4">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900">Proceso a Realizar</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each actions as action}
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-emerald-300 cursor-pointer transition-colors duration-150 select-none {formData.action === action.id ? 'border-emerald-400 bg-emerald-50' : ''}">
            <input 
              type="radio" 
              bind:group={formData.action}
              value={action.id}
              class="w-5 h-5 border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            >
            <span class="ml-4 text-gray-900 font-medium">{action.label}</span>
          </label>
        {/each}
      </div>
    </div>

    <!-- Botones -->
    <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
      <button
        type="button"
        on:click={handleBack}
        class="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 rounded-xl shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200"
      >
        <svg class="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Regresar
      </button>
      
      <button
        type="submit"
        class="group inline-flex items-center justify-center px-8 py-4 border-2 border-transparent rounded-xl shadow-lg text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-105"
      >
        <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        Crear Orden
      </button>
    </div>
  </form>
</div>