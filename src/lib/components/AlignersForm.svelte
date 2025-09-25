<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PatientSelector from './PatientSelector.svelte';
  import type { Patient } from '$lib/types';

  export let formData = {
    specialistId: '',
    patientId: '',
    branchId: '',
    date: new Date().toISOString().split('T')[0],
    digitalScan: false,
    specifications: ''
  };

  const dispatch = createEventDispatcher<{
    submit: typeof formData;
    back: void;
  }>();

  let selectedPatient: Patient | null = null;

  function handlePatientChange(event: CustomEvent<Patient | null>) {
    selectedPatient = event.detail;
    if (event.detail) {
      formData.patientId = event.detail.id;
    }
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
  <!-- Header -->
  <div class="text-center border-b border-gray-200 pb-6">
    <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4">
      <span class="text-3xl">📐</span>
    </div>
    <h2 class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
      Alineadores
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

    <!-- Se Envía -->
    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
      <div class="flex items-center mb-6">
        <div class="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl mr-4">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900">Se Envía</h3>
      </div>
      
      <div class="space-y-4">
        <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-colors duration-150 select-none">
          <input
            type="checkbox"
            bind:checked={formData.digitalScan}
            class="w-5 h-5 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div class="ml-4">
            <span class="text-gray-900 font-medium">Escaneo Digital</span>
            <p class="text-sm text-gray-500 mt-1">Archivo de escaneo digital del paciente</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Especificaciones -->
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
      <div class="flex items-center mb-6">
        <div class="flex items-center justify-center w-10 h-10 bg-green-600 rounded-xl mr-4">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900">Especificaciones</h3>
      </div>
      
      <div>
        <label for="specifications" class="block text-sm font-medium text-gray-700 mb-2">
          Especificaciones adicionales
        </label>
        <textarea
          id="specifications"
          bind:value={formData.specifications}
          class="textarea w-full"
          rows="4"
          placeholder="Escriba aquí cualquier especificación adicional para los alineadores..."
        ></textarea>
      </div>
    </div>

    <!-- Botones -->
    <div class="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6">
      <button
        type="button"
        on:click={handleBack}
        class="group inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200"
      >
        <svg class="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Regresar
      </button>
      
      <button
        type="submit"
        class="group inline-flex items-center justify-center px-8 py-4 border-2 border-transparent rounded-xl shadow-lg text-lg font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 transform hover:scale-105"
      >
        <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        Crear Orden
      </button>
    </div>
  </form>
</div>