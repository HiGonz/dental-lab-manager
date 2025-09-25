<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { api } from '$lib/api';
  import type { Patient } from '$lib/types';

  export let selectedPatient: Patient | null = null;
  export let placeholder: string = 'Buscar paciente...';
  export let required: boolean = false;

  const dispatch = createEventDispatcher();

  let searchQuery = '';
  let suggestions: Patient[] = [];
  let showSuggestions = false;
  let isLoading = false;
  let debounceTimer: NodeJS.Timeout;
  let inputElement: HTMLInputElement;
  let dropdownElement: HTMLDivElement;
  let selectedIndex = -1;

  // API call for patient search
  async function searchPatients(query: string): Promise<Patient[]> {
    try {
      return await api.searchPatients(query);
    } catch (error) {
      console.error('Error searching patients:', error);
      return [];
    }
  }

  function debounceSearch(query: string) {
    clearTimeout(debounceTimer);
    
    if (query.length < 2) {
      suggestions = [];
      showSuggestions = false;
      return;
    }

    isLoading = true;
    
    debounceTimer = setTimeout(async () => {
      try {
        suggestions = await searchPatients(query);
        showSuggestions = true;
        selectedIndex = -1;
      } catch (error) {
        console.error('Error searching patients:', error);
        suggestions = [];
      } finally {
        isLoading = false;
      }
    }, 300); // 300ms debounce
  }

  function selectPatient(patient: Patient) {
    selectedPatient = patient;
    searchQuery = patient.name;
    showSuggestions = false;
    dispatch('select', patient);
  }

  function clearSelection() {
    selectedPatient = null;
    searchQuery = '';
    suggestions = [];
    showSuggestions = false;
    dispatch('select', null);
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    
    // Clear selection if user changes the text
    if (selectedPatient && searchQuery !== selectedPatient.name) {
      selectedPatient = null;
      dispatch('select', null);
    }
    
    debounceSearch(searchQuery);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!showSuggestions) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          selectPatient(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        showSuggestions = false;
        selectedIndex = -1;
        break;
    }
  }

  function handleFocus() {
    if (searchQuery.length >= 2) {
      showSuggestions = true;
    }
  }

  function handleBlur(event: FocusEvent) {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      if (!dropdownElement?.contains(event.relatedTarget as Node)) {
        showSuggestions = false;
        selectedIndex = -1;
      }
    }, 150);
  }

  // Initialize with selected patient name if provided
  $: if (selectedPatient && !searchQuery) {
    searchQuery = selectedPatient.name;
  }

  onMount(() => {
    return () => {
      clearTimeout(debounceTimer);
    };
  });
</script>

<div class="relative">
  <!-- Input Field -->
  <div class="relative">
    <input
      bind:this={inputElement}
      type="text"
      bind:value={searchQuery}
      on:input={handleInput}
      on:keydown={handleKeydown}
      on:focus={handleFocus}
      on:blur={handleBlur}
      {placeholder}
      {required}
      class="block w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-4 pr-12 text-gray-900 transition-all duration-200 {selectedPatient ? 'border-green-300 bg-green-50' : ''}"
      autocomplete="off"
    />
    
    <!-- Loading Spinner -->
    {#if isLoading}
      <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
        <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    {:else if selectedPatient}
      <!-- Success Check -->
      <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <button
            type="button"
            on:click={clearSelection}
            class="text-gray-400 hover:text-gray-600 transition-colors"
            title="Limpiar selección"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    {:else if searchQuery}
      <!-- Search Icon -->
      <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    {/if}
  </div>

  <!-- Suggestions Dropdown -->
  {#if showSuggestions}
    <div 
      bind:this={dropdownElement}
      class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-64 overflow-y-auto"
    >
      {#if suggestions.length === 0 && !isLoading}
        <div class="px-4 py-3 text-sm text-gray-500 text-center">
          No se encontraron pacientes
        </div>
      {:else}
        {#each suggestions as patient, index (patient.id)}
          <button
            type="button"
            class="w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0 {index === selectedIndex ? 'bg-blue-50' : ''}"
            on:click={() => selectPatient(patient)}
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-900">{patient.name}</div>
                <div class="text-sm text-gray-500">{patient.email}</div>
                <div class="text-xs text-gray-400">{patient.phone}</div>
              </div>
              <div class="text-xs text-gray-400">
                {new Date(patient.dateOfBirth).toLocaleDateString('es-ES')}
              </div>
            </div>
          </button>
        {/each}
      {/if}
    </div>
  {/if}

  <!-- Selected Patient Info -->
  {#if selectedPatient}
    <div class="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <div>
          <div class="font-medium text-green-900">{selectedPatient.name}</div>
          <div class="text-sm text-green-700">{selectedPatient.email} • {selectedPatient.phone}</div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Hide browser autocomplete dropdown */
  input[autocomplete="off"]::-webkit-outer-spin-button,
  input[autocomplete="off"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>