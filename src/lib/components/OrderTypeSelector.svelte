<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    select: string;
  }>();

  const orderTypes = [
    {
      id: 'acrylic-prosthesis',
      title: 'Prótesis Acrílicas',
      description: 'Prótesis removibles fabricadas en resina acrílica',
      icon: '🦷',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'hover:border-blue-300'
    },
    {
      id: 'fixed-prosthesis',
      title: 'Prótesis Fija',
      description: 'Coronas, puentes y carillas en diferentes materiales',
      icon: '💎',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'hover:border-purple-300'
    },
    {
      id: 'orthodontic-appliances',
      title: 'Aparatos de Ortodoncia',
      description: 'Aparatos removibles y sistemas de retención',
      icon: '🔧',
      gradient: 'from-green-500 to-teal-600',
      bgGradient: 'from-green-50 to-teal-50',
      borderColor: 'hover:border-green-300'
    },
    {
      id: 'aligners',
      title: 'Alineadores',
      description: 'Alineadores dentales para corrección ortodóntica',
      icon: '📐',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      borderColor: 'hover:border-orange-300'
    }
  ];

  function selectOrderType(typeId: string) {
    dispatch('select', typeId);
  }
</script>

<div class="max-w-6xl mx-auto">
  <div class="text-center mb-12">
    <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl mb-6 shadow-lg">
      <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </div>
    <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
      Crear Nueva Orden
    </h1>
    <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Seleccione el tipo de trabajo que desea solicitar para comenzar con el proceso
    </p>
  </div>

  <div class="grid md:grid-cols-3 gap-8">
    {#each orderTypes as orderType}
      <button
        type="button"
        on:click={() => selectOrderType(orderType.id)}
        class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-left border-2 border-transparent {orderType.borderColor} hover:-translate-y-1 overflow-hidden"
      >
        <!-- Background gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-br {orderType.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        
        <!-- Content -->
        <div class="relative z-10">
          <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br {orderType.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
            <span class="text-3xl">{orderType.icon}</span>
          </div>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
            {orderType.title}
          </h3>
          
          <p class="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700">
            {orderType.description}
          </p>
          
          <div class="flex items-center text-blue-600 group-hover:text-blue-700 font-semibold">
            <span class="mr-2">Seleccionar</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        <!-- Decorative element -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br {orderType.gradient} rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
    {/each}
  </div>
</div>