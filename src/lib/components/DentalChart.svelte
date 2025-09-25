<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';

  export let selectedTeeth: string[] = [];
  export let title: string = 'Selección de Dientes';
  export let required: boolean = true;

  const dispatch = createEventDispatcher<{
    'teeth-change': string[];
  }>();

  // Reactive statement para debug
  $: {
    console.log('🦷 selectedTeeth changed:', selectedTeeth);
  }

  // Función reactiva para verificar selección
  $: getToothClass = (toothNumber: string) => {
    const selected = selectedTeeth.includes(toothNumber);
    return selected 
      ? 'bg-orange-500 border-orange-600 text-white shadow-lg hover:bg-orange-600 hover:shadow-xl' 
      : 'bg-white border-gray-300 hover:border-orange-300 hover:bg-orange-50';
  };

  // Dental chart - Numeración FDI
  const dentalChart = {
    adult: [
      // Upper jaw
      { number: '18', name: '3° Molar', quadrant: 'upper-right' },
      { number: '17', name: '2° Molar', quadrant: 'upper-right' },
      { number: '16', name: '1° Molar', quadrant: 'upper-right' },
      { number: '15', name: '2° Premolar', quadrant: 'upper-right' },
      { number: '14', name: '1° Premolar', quadrant: 'upper-right' },
      { number: '13', name: 'Canino', quadrant: 'upper-right' },
      { number: '12', name: 'Incisivo Lateral', quadrant: 'upper-right' },
      { number: '11', name: 'Incisivo Central', quadrant: 'upper-right' },
      { number: '21', name: 'Incisivo Central', quadrant: 'upper-left' },
      { number: '22', name: 'Incisivo Lateral', quadrant: 'upper-left' },
      { number: '23', name: 'Canino', quadrant: 'upper-left' },
      { number: '24', name: '1° Premolar', quadrant: 'upper-left' },
      { number: '25', name: '2° Premolar', quadrant: 'upper-left' },
      { number: '26', name: '1° Molar', quadrant: 'upper-left' },
      { number: '27', name: '2° Molar', quadrant: 'upper-left' },
      { number: '28', name: '3° Molar', quadrant: 'upper-left' },
      // Lower jaw
      { number: '48', name: '3° Molar', quadrant: 'lower-right' },
      { number: '47', name: '2° Molar', quadrant: 'lower-right' },
      { number: '46', name: '1° Molar', quadrant: 'lower-right' },
      { number: '45', name: '2° Premolar', quadrant: 'lower-right' },
      { number: '44', name: '1° Premolar', quadrant: 'lower-right' },
      { number: '43', name: 'Canino', quadrant: 'lower-right' },
      { number: '42', name: 'Incisivo Lateral', quadrant: 'lower-right' },
      { number: '41', name: 'Incisivo Central', quadrant: 'lower-right' },
      { number: '31', name: 'Incisivo Central', quadrant: 'lower-left' },
      { number: '32', name: 'Incisivo Lateral', quadrant: 'lower-left' },
      { number: '33', name: 'Canino', quadrant: 'lower-left' },
      { number: '34', name: '1° Premolar', quadrant: 'lower-left' },
      { number: '35', name: '2° Premolar', quadrant: 'lower-left' },
      { number: '36', name: '1° Molar', quadrant: 'lower-left' },
      { number: '37', name: '2° Molar', quadrant: 'lower-left' },
      { number: '38', name: '3° Molar', quadrant: 'lower-left' }
    ]
  };

  async function toggleTooth(toothNumber: string) {
    console.log('🦷 Toggling tooth:', toothNumber);
    console.log('🦷 Current selectedTeeth:', selectedTeeth);
    
    if (selectedTeeth.includes(toothNumber)) {
      selectedTeeth = selectedTeeth.filter(num => num !== toothNumber);
    } else {
      selectedTeeth = [...selectedTeeth, toothNumber];
    }
    
    // Asegurar que el DOM se actualice
    await tick();
    
    console.log('🦷 New selectedTeeth after tick:', selectedTeeth);
    dispatch('teeth-change', selectedTeeth);
  }

  function isToothSelected(toothNumber: string) {
    const selected = selectedTeeth.includes(toothNumber);
    // console.log('🦷 Is tooth', toothNumber, 'selected?', selected); // Comentado para evitar spam
    return selected;
  }
</script>

<div class="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100">
  <div class="flex items-center mb-6">
    <div class="flex items-center justify-center w-10 h-10 bg-orange-600 rounded-xl mr-4">
      <span class="text-white text-lg">🦷</span>
    </div>
    <h3 class="text-2xl font-semibold text-gray-900">{title}{required ? ' *' : ''}</h3>
  </div>

  <div class="bg-white p-6 rounded-2xl shadow-sm">
    <div class="text-center mb-6">
      <p class="text-sm text-gray-600 mb-2">Haga clic en los dientes que requieren tratamiento</p>
      <div class="text-xs text-gray-500">
        Seleccionados: <span class="font-medium text-orange-600">{selectedTeeth.join(', ') || 'Ninguno'}</span>
      </div>
    </div>

    <!-- Upper Jaw -->
    <div class="mb-6">
      <div class="text-sm font-medium text-gray-700 mb-3 text-center">Maxilar Superior</div>
      <div class="flex justify-center space-x-1 mb-2">
        {#each dentalChart.adult.slice(0, 8) as tooth (tooth.number)}
          <button
            type="button"
            on:click={() => toggleTooth(tooth.number)}
            class="group relative w-8 h-10 rounded-t-full border-2 transition-colors duration-200 {getToothClass(tooth.number)}"
            title="{tooth.number} - {tooth.name}"
          >
            <span class="text-xs font-bold">{tooth.number}</span>
          </button>
        {/each}
        <div class="w-4"></div>
        {#each dentalChart.adult.slice(8, 16) as tooth (tooth.number)}
          <button
            type="button"
            on:click={() => toggleTooth(tooth.number)}
            class="group relative w-8 h-10 rounded-t-full border-2 transition-colors duration-200 {getToothClass(tooth.number)}"
            title="{tooth.number} - {tooth.name}"
          >
            <span class="text-xs font-bold">{tooth.number}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Lower Jaw -->
    <div>
      <div class="text-sm font-medium text-gray-700 mb-3 text-center">Maxilar Inferior</div>
      <div class="flex justify-center space-x-1">
        {#each dentalChart.adult.slice(16, 24).reverse() as tooth (tooth.number)}
          <button
            type="button"
            on:click={() => toggleTooth(tooth.number)}
            class="group relative w-8 h-10 rounded-b-full border-2 transition-colors duration-200 {getToothClass(tooth.number)}"
            title="{tooth.number} - {tooth.name}"
          >
            <span class="text-xs font-bold">{tooth.number}</span>
          </button>
        {/each}
        <div class="w-4"></div>
        {#each dentalChart.adult.slice(24, 32).reverse() as tooth (tooth.number)}
          <button
            type="button"
            on:click={() => toggleTooth(tooth.number)}
            class="group relative w-8 h-10 rounded-b-full border-2 transition-colors duration-200 {getToothClass(tooth.number)}"
            title="{tooth.number} - {tooth.name}"
          >
            <span class="text-xs font-bold">{tooth.number}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>