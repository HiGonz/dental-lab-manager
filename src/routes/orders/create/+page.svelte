<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/stores';
  import { canCreateOrder } from '$lib/utils';
  import OrderTypeSelector from '$lib/components/OrderTypeSelector.svelte';
  import AcrylicProsthesisForm from '$lib/components/AcrylicProsthesisForm.svelte';
  import FixedProsthesisForm from '$lib/components/FixedProsthesisForm.svelte';
  import AlignersForm from '$lib/components/AlignersForm.svelte';
  import type { Patient } from '$lib/types';

  let selectedOrderType: string = '';
  let showForm = false;
  let user: any;

  // Form data for Prótesis Acrílicas
  let acrylicForm = {
    specialistId: '',
    patientId: '',
    branchId: '',
    date: new Date().toISOString().split('T')[0],
    acrylicHooks: false,
    lockHooks: false,
    color: 'A1',
    action: 'cucharillas'
  };

  // Form data for Prótesis Fija
  let fixedForm = {
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

  // Form data for Alineadores
  let alignersForm = {
    specialistId: '',
    patientId: '',
    branchId: '',
    date: new Date().toISOString().split('T')[0],
    digitalScan: false,
    specifications: ''
  };

  // Patient selection
  let selectedPatient: Patient | null = null;
  let selectedPatientFixed: Patient | null = null;
  let selectedPatientAligners: Patient | null = null;

  onMount(() => {
    // Check if user is logged in
    const unsubscribe = currentUser.subscribe(value => {
      user = value;
      console.log("🚀 ~ user:", user)
      if (!user) {
        goto('/login');
        return;
      }
      
      // Check permissions
      if (!canCreateOrder(user.role)) {
        alert('No tiene permisos para crear órdenes');
        goto('/dashboard');
        return;
      }
    });

    return unsubscribe;
  });

  function handleOrderTypeSelect(event: CustomEvent<string>) {
    selectedOrderType = event.detail;
    showForm = true;
  }

  function handleAcrylicSubmit(event: CustomEvent<typeof acrylicForm>) {
    const formData = event.detail;
    
    console.log('Formulario de Prótesis Acrílicas:', {
      ...formData,
      selectedPatient
    });
    
    // TODO: Send to API
    alert('Orden de Prótesis Acrílicas creada exitosamente');
    goto('/orders');
  }

  function handleFixedSubmit(event: CustomEvent<typeof fixedForm>) {
    const formData = event.detail;
    
    console.log('Formulario de Prótesis Fija:', {
      ...formData,
      selectedPatientFixed
    });
    
    // TODO: Send to API
    alert('Orden de Prótesis Fija creada exitosamente');
    goto('/orders');
  }

  function handleAlignersSubmit(event: CustomEvent<typeof alignersForm>) {
    const formData = event.detail;
    
    console.log('Formulario de Alineadores:', {
      ...formData,
      selectedPatientAligners
    });
    
    // TODO: Send to API
    alert('Orden de Alineadores creada exitosamente');
    goto('/orders');
  }

  function handleBack() {
    selectedOrderType = '';
    showForm = false;
    // Reset forms
    acrylicForm = {
      specialistId: '',
      patientId: '',
      branchId: '',
      date: new Date().toISOString().split('T')[0],
      acrylicHooks: false,
      lockHooks: false,
      color: 'A1',
      action: 'cucharillas'
    };
    fixedForm = {
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
    alignersForm = {
      specialistId: '',
      patientId: '',
      branchId: '',
      date: new Date().toISOString().split('T')[0],
      digitalScan: false,
      specifications: ''
    };
    selectedPatient = null;
    selectedPatientFixed = null;
    selectedPatientAligners = null;
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
  <div class="container mx-auto px-4 py-8">
    {#if !showForm}
      <!-- Back button -->
      <button
        on:click={() => goto('/orders')}
        class="mb-6 inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 shadow-sm border border-gray-200"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Volver a Órdenes
      </button>

      <!-- Order Type Selection -->
      <OrderTypeSelector on:select={handleOrderTypeSelect} />
      
    {:else if selectedOrderType === 'acrylic-prosthesis'}
      <!-- Acrylic Prosthesis Form -->
      <AcrylicProsthesisForm 
        bind:formData={acrylicForm}
        bind:selectedPatient
        on:submit={handleAcrylicSubmit}
        on:back={handleBack}
      />
      
    {:else if selectedOrderType === 'fixed-prosthesis'}
      <!-- Fixed Prosthesis Form -->
      <FixedProsthesisForm 
        bind:formData={fixedForm}
        bind:selectedPatient={selectedPatientFixed}
        on:submit={handleFixedSubmit}
        on:back={handleBack}
      />
      
    {:else if selectedOrderType === 'aligners'}
      <!-- Aligners Form -->
      <AlignersForm 
        bind:formData={alignersForm}
        bind:selectedPatient={selectedPatientAligners}
        on:submit={handleAlignersSubmit}
        on:back={handleBack}
      />
      
    {:else if selectedOrderType === 'orthodontic-appliances'}
      <!-- Orthodontic Appliances Form -->
      <div class="space-y-8">
        <div class="text-center border-b border-gray-200 pb-6">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-4">
            <span class="text-3xl">🔧</span>
          </div>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Aparatos de Ortodoncia
          </h2>
          <p class="text-gray-600 mt-2">Esta funcionalidad estará disponible próximamente</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
          <div class="mb-6">
            <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Próximamente</h3>
            <p class="text-gray-600">El formulario para aparatos de ortodoncia se implementará en una próxima actualización.</p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              on:click={handleBack}
              class="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Regresar
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>