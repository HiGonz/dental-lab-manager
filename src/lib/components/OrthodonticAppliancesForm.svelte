<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PatientSelector from './PatientSelector.svelte';
  import type { Patient } from '$lib/types';

  export let formData = {
    specialistId: '',
    patientId: '',
    branchId: '',
    date: new Date().toISOString().split('T')[0],
    hawleySuper: false,
    hawleyInfer: false,
    essixSuper: false,
    essixInfer: false,
    funcionalSuper: false,
    funcionalInfer: false,
    pistasPlanasSuper: false,
    pistasPlanasInfer: false,
    banda: false,
    hyrax: false,
    pma: false,
    atp: false,
    botonNance: false,
    trampaRejilla: false,
    trampaPicos: false,
    teeth: '',
    specifications: ''
  };

  const dispatch = createEventDispatcher<{
    submit: typeof formData;
    back: void;
  }>();

  let selectedPatient: Patient | null = null;

  // Aparatos que requieren especificaciones
  $: requiresSpecifications = formData.banda || formData.atp || formData.trampaRejilla || formData.trampaPicos || formData.hyrax || formData.pma;
  
  // Solo Banda requiere especificación de dientes
  $: requiresTeeth = formData.banda;

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

    // Verificar que se haya seleccionado al menos un aparato
    const hasSelectedAppliance = formData.hawleySuper || formData.hawleyInfer || 
                                formData.essixSuper || formData.essixInfer || 
                                formData.funcionalSuper || formData.funcionalInfer ||
                                formData.pistasPlanasSuper || formData.pistasPlanasInfer ||
                                formData.banda || formData.hyrax || formData.pma || 
                                formData.atp || formData.botonNance || 
                                formData.trampaRejilla || formData.trampaPicos;

    if (!hasSelectedAppliance) {
      alert('Por favor seleccione al menos un aparato de ortodoncia');
      return;
    }

    // Verificar campos condicionales
    if (formData.banda && !formData.teeth.trim()) {
      alert('Por favor especifique los dientes para la Banda');
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
    <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-4">
      <span class="text-3xl">🔧</span>
    </div>
    <h2 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
      Aparatos de Ortodoncia
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

    <!-- Selección de Aparatos -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
      <div class="flex items-center mb-6">
        <div class="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-xl mr-4">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900">Aparatos de Ortodoncia *</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Guardas Hawley -->
        <div class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-800">Guarda Hawley</h4>
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.hawleySuper}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Superior</span>
            </div>
          </label>
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.hawleyInfer}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Inferior</span>
            </div>
          </label>
        </div>

        <!-- Guardas Oclusal Essix -->
        <div class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-800">Guarda Oclusal Essix</h4>
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.essixSuper}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Superior</span>
            </div>
          </label>
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.essixInfer}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Inferior</span>
            </div>
          </label>
        </div>

        <!-- Guarda Funcional -->
        <div class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-800">Guarda Funcional</h4>
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.funcionalSuper}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Superior</span>
            </div>
          </label>
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.funcionalInfer}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Inferior</span>
            </div>
          </label>
        </div>

        <!-- Guarda Pistas Planas -->
        <div class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-800">Guarda Pistas Planas</h4>
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.pistasPlanasSuper}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Superior</span>
            </div>
          </label>
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.pistasPlanasInfer}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Inferior</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Segunda fila - Otros Aparatos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-800">Otros Aparatos</h4>
          
          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.banda}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Banda</span>
              <p class="text-xs text-gray-500">Requiere especificar dientes</p>
            </div>
          </label>

          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.hyrax}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Hyrax</span>
              <p class="text-xs text-gray-500">Puede requerir especificaciones</p>
            </div>
          </label>

          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.pma}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">PMA</span>
              <p class="text-xs text-gray-500">Puede requerir especificaciones</p>
            </div>
          </label>

          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.atp}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">ATP</span>
              <p class="text-xs text-gray-500">Puede requerir especificaciones</p>
            </div>
          </label>

          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.botonNance}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Botón de Nance</span>
            </div>
          </label>

          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.trampaRejilla}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Trampa Lingual con rejilla</span>
            </div>
          </label>

          <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="checkbox" 
              bind:checked={formData.trampaPicos}
              class="w-5 h-5 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
            <div class="ml-4">
              <span class="text-gray-900 font-medium">Trampa Lingual con picos</span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Campo Dientes (solo si se selecciona Banda) -->
    {#if requiresTeeth}
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
        <div class="flex items-center mb-6">
          <div class="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl mr-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900">Dientes *</h3>
        </div>
        
        <div>
          <label for="teeth" class="block text-sm font-medium text-gray-700 mb-2">
            Especificar dientes para Banda
          </label>
          <input
            id="teeth"
            type="text"
            bind:value={formData.teeth}
            class="input w-full"
            placeholder="Ej: 16, 26, 36, 46 o Superior derecha..."
            required={requiresTeeth}
          />
          <p class="text-sm text-gray-500 mt-2">
            Indique los dientes donde se colocará la banda (numeración FDI o descripción)
          </p>
        </div>
      </div>
    {/if}

    <!-- Especificaciones (aparece si se seleccionan aparatos que lo requieren) -->
    {#if requiresSpecifications}
      <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-100">
        <div class="flex items-center mb-6">
          <div class="flex items-center justify-center w-10 h-10 bg-yellow-600 rounded-xl mr-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
            placeholder="Especifique detalles adicionales para los aparatos seleccionados..."
          ></textarea>
          <p class="text-sm text-gray-500 mt-2">
            Información adicional sobre ajustes, materiales o consideraciones especiales
          </p>
        </div>
      </div>
    {/if}

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
        class="group inline-flex items-center justify-center px-8 py-4 border-2 border-transparent rounded-xl shadow-lg text-lg font-medium text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-200 transform hover:scale-105"
      >
        <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        Crear Orden
      </button>
    </div>
  </form>
</div>