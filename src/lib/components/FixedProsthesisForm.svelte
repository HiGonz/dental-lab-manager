<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PatientSelector from './PatientSelector.svelte';
  import DentalChart from './DentalChart.svelte';
  import type { Patient } from '$lib/types';

  export let formData = {
    specialistId: '',
    patientId: '',
    branchId: '',
    date: new Date().toISOString().split('T')[0],
    sentItems: [],
    color: '',
    material: 'zirconia',
    teeth: [],
    category: 'corona'
  };
  export let selectedPatient: Patient | null = null;

  const dispatch = createEventDispatcher<{
    submit: typeof formData;
    back: void;
  }>();

  // Sent items options
  const sentItems = [
    { id: 'cucharilla', label: 'Cucharilla', description: 'Impresión en alginato o silicona' },
    { id: 'modelo', label: 'Modelo de Yeso', description: 'Modelo de trabajo en yeso' },
    { id: 'registro-mordida', label: 'Registro de Mordida', description: 'Registro oclusal en cera o silicona' },
    { id: 'color-referencia', label: 'Referencia de Color', description: 'Muestra de color del paciente' },
    { id: 'radiografias', label: 'Radiografías', description: 'Radiografías periapicales o panorámica' },
    { id: 'fotos-clinicas', label: 'Fotos Clínicas', description: 'Fotografías intraorales del caso' }
  ];

  // Material options
  const materials = [
    { id: 'zirconia', label: 'Zirconio', description: 'Alta resistencia y estética' },
    { id: 'disilicate', label: 'Disilicato de Litio', description: 'Excelente estética y translucidez' },
    { id: 'metal-ceramic', label: 'Cerámica sobre Metal', description: 'Resistente y económica' },
    { id: 'composite', label: 'Composite', description: 'Reparaciones y carillas directas' }
  ];

  // Category options
  const categories = [
    { id: 'corona', label: 'Corona' },
    { id: 'puente', label: 'Puente' },
    { id: 'carilla', label: 'Carilla' },
    { id: 'incrustacion', label: 'Incrustación' }
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

  function toggleSentItem(itemId: string) {
    if (formData.sentItems.includes(itemId)) {
      formData.sentItems = formData.sentItems.filter(id => id !== itemId);
    } else {
      formData.sentItems = [...formData.sentItems, itemId];
    }
  }

  function isSentItemSelected(itemId: string) {
    return formData.sentItems.includes(itemId);
  }

  function handleSubmit() {
    // Validate required fields
    if (!formData.specialistId || !selectedPatient || !formData.branchId || 
        !formData.color || formData.teeth.length === 0 || formData.sentItems.length === 0) {
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
    <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
      <span class="text-3xl">💎</span>
    </div>
    <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
      Prótesis Fija
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

    <!-- Categoría de Trabajo -->
    <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100">
      <div class="flex items-center mb-6">
        <div class="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl mr-4">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900">Categoría de Trabajo *</h3>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each categories as category}
          <label class="group relative cursor-pointer transition-colors duration-150 select-none">
            <input 
              type="radio" 
              bind:group={formData.category}
              value={category.id}
              class="sr-only"
              required
            >
            <div class="p-4 bg-white rounded-xl border-2 text-center transition-colors duration-150 {formData.category === category.id ? 'border-indigo-400 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-indigo-300'}">
              <span class="text-lg font-medium text-gray-900">{category.label}</span>
            </div>
          </label>
        {/each}
      </div>
    </div>

    <!-- Selección de Dientes -->
    <DentalChart
      bind:selectedTeeth={formData.teeth}
      title="Selección de Dientes"
      required={true}
    />

    <!-- Se Envía -->
    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
      <div class="flex items-center mb-6">
        <div class="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl mr-4">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900">Se Envía *</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each sentItems as item}
          <button
            type="button"
            on:click={() => toggleSentItem(item.id)}
            class="group relative p-4 bg-white rounded-xl border-2 transition-colors duration-150 text-left select-none {isSentItemSelected(item.id) ? 'border-blue-400 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'}"
          >
            <div class="flex items-start">
              <div class="flex-shrink-0 mr-3 mt-1">
                <div class="w-5 h-5 rounded border-2 flex items-center justify-center {isSentItemSelected(item.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}">
                  {#if isSentItemSelected(item.id)}
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  {/if}
                </div>
              </div>
              <div class="flex-1">
                <div class="font-medium text-gray-900 group-hover:text-blue-600">{item.label}</div>
                <div class="text-sm text-gray-500 mt-1">{item.description}</div>
              </div>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Especificaciones Técnicas -->
    <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100">
      <div class="flex items-center mb-6">
        <div class="flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-xl mr-4">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900">Especificaciones Técnicas</h3>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Color -->
        <div class="space-y-4">
          <label for="color-fixed" class="block text-sm font-semibold text-gray-700">
            Color *
          </label>
          <input 
            id="color-fixed"
            type="text"
            bind:value={formData.color}
            placeholder="Especificar color..."
            class="block w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white p-4 text-gray-900 transition-all duration-200"
            required
          />
          <p class="text-sm text-gray-500">Ejemplo: A2, B1, C3, etc.</p>
        </div>

        <!-- Material -->
        <div class="space-y-4">
          <div class="text-sm font-semibold text-gray-700 mb-3">
            Material *
          </div>
          <div class="space-y-3">
            {#each materials as material}
              <label class="group relative flex items-center p-4 bg-white rounded-xl border-2 cursor-pointer transition-colors duration-150 select-none {formData.material === material.id ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}">
                <input 
                  type="radio" 
                  bind:group={formData.material}
                  value={material.id}
                  class="w-5 h-5 border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  required
                >
                <div class="ml-4">
                  <span class="text-gray-900 font-medium">{material.label}</span>
                  <p class="text-sm text-gray-500 mt-1">{material.description}</p>
                </div>
              </label>
            {/each}
          </div>
        </div>
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