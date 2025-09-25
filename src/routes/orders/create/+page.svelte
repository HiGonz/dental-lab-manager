<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/stores';
  import { canCreateOrder } from '$lib/utils';
  import OrderTypeSelector from '$lib/components/OrderTypeSelector.svelte';
  import AcrylicProsthesisForm from '$lib/components/AcrylicProsthesisForm.svelte';
  import FixedProsthesisForm from '$lib/components/FixedProsthesisForm.svelte';
  import AlignersForm from '$lib/components/AlignersForm.svelte';
  import OrthodonticAppliancesForm from '$lib/components/OrthodonticAppliancesForm.svelte';
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
    sentItems: [] as string[],
    color: '',
    material: 'zirconia',
    teeth: [] as string[],
    category: 'corona',
    digitalScan: false
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

  // Form data for Aparatos de Ortodoncia
  let orthodonticForm = {
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

  // Patient selection
  let selectedPatient: Patient | null = null;
  let selectedPatientFixed: Patient | null = null;
  let selectedPatientAligners: Patient | null = null;
  let selectedPatientOrthodontic: Patient | null = null;

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

  function handleOrthodonticSubmit(event: CustomEvent<typeof orthodonticForm>) {
    const formData = event.detail;
    
    console.log('Formulario de Aparatos de Ortodoncia:', {
      ...formData,
      selectedPatientOrthodontic
    });
    
    // TODO: Send to API
    alert('Orden de Aparatos de Ortodoncia creada exitosamente');
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
      sentItems: [] as string[],
      color: '',
      material: 'zirconia',
      teeth: [] as string[],
      category: 'corona',
      digitalScan: false
    };
    alignersForm = {
      specialistId: '',
      patientId: '',
      branchId: '',
      date: new Date().toISOString().split('T')[0],
      digitalScan: false,
      specifications: ''
    };
    orthodonticForm = {
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
    selectedPatient = null;
    selectedPatientFixed = null;
    selectedPatientAligners = null;
    selectedPatientOrthodontic = null;
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
        on:submit={handleAlignersSubmit}
        on:back={handleBack}
      />
      
    {:else if selectedOrderType === 'orthodontic-appliances'}
      <!-- Orthodontic Appliances Form -->
      <OrthodonticAppliancesForm 
        bind:formData={orthodonticForm}
        on:submit={handleOrthodonticSubmit}
        on:back={handleBack}
      />
    {/if}
  </div>
</div>