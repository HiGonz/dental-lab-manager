import { c as create_ssr_component, a as subscribe, e as each, b as escape, d as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "../../chunks/state.svelte.js";
import { c as currentUser, s as sidebarOpen, i as isAuthenticated } from "../../chunks/stores2.js";
import { g as getRoleColor, a as getRoleLabel } from "../../chunks/utils2.js";
function getNavigationItems(role) {
  const baseItems = [
    {
      name: "Inicio",
      href: "/dashboard",
      icon: "home"
    },
    {
      name: "Órdenes",
      href: "/orders",
      icon: "clipboard"
    }
  ];
  const roleSpecificItems = {
    specialist: [
      {
        name: "Pacientes",
        href: "/patients",
        icon: "users"
      }
    ],
    receptionist: [
      {
        name: "Pacientes",
        href: "/patients",
        icon: "users"
      },
      {
        name: "Calendario",
        href: "/calendar",
        icon: "calendar"
      }
    ],
    manager: [
      {
        name: "Calendario",
        href: "/calendar",
        icon: "calendar"
      },
      {
        name: "Indicadores",
        href: "/kpis",
        icon: "chart"
      }
    ],
    technician: [
      {
        name: "Calendario",
        href: "/calendar",
        icon: "calendar"
      }
    ]
  };
  return [
    ...baseItems,
    ...roleSpecificItems[role] || [],
    {
      name: "Configuración",
      href: "/settings",
      icon: "settings"
    }
  ];
}
function getIconPath(icon) {
  const icons = {
    home: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0zM3 7l9-4 9 4M4 10l8 5 8-5",
    clipboard: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  };
  return icons[icon] || icons.home;
}
const Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let currentPath;
  let navigationItems;
  let $page, $$unsubscribe_page;
  let $currentUser, $$unsubscribe_currentUser;
  let $sidebarOpen, $$unsubscribe_sidebarOpen;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_currentUser = subscribe(currentUser, (value) => $currentUser = value);
  $$unsubscribe_sidebarOpen = subscribe(sidebarOpen, (value) => $sidebarOpen = value);
  function isActiveRoute(href) {
    if (href === "/dashboard") {
      return currentPath === "/dashboard" || currentPath === "/";
    }
    return currentPath.startsWith(href);
  }
  user = $currentUser;
  currentPath = $page.url.pathname;
  navigationItems = user ? getNavigationItems(user.role) : [];
  $$unsubscribe_page();
  $$unsubscribe_currentUser();
  $$unsubscribe_sidebarOpen();
  return ` ${$sidebarOpen ? `<div class="fixed inset-0 z-40 lg:hidden"><div class="fixed inset-0 bg-gray-600 bg-opacity-75" role="button" tabindex="0"></div></div>` : ``}  <div class="${"fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden " + escape($sidebarOpen ? "translate-x-0" : "-translate-x-full", true)}">&gt;
	<div class="flex items-center justify-between h-16 px-4 border-b border-gray-200"><span class="text-xl font-semibold text-gray-800" data-svelte-h="svelte-e0an22">Lab Manager</span> <button type="button" class="text-gray-500 hover:text-gray-700" data-svelte-h="svelte-1qlkqm5"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <nav class="mt-8 px-4"><ul class="space-y-2">${each(navigationItems, (item) => {
    return `<li><a${add_attribute("href", item.href, 0)} class="${"flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors " + escape(
      isActiveRoute(item.href) ? "bg-primary-100 text-primary-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      true
    )}"><svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${add_attribute("d", getIconPath(item.icon), 0)}></path></svg> ${escape(item.name)}</a> </li>`;
  })}</ul></nav></div>  <div class="hidden lg:flex lg:flex-shrink-0"><div class="flex flex-col w-64"><div class="flex flex-col h-screen bg-white border-r border-gray-200 sticky top-0"><div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto"><div class="flex items-center flex-shrink-0 px-4" data-svelte-h="svelte-1rhhdnx"><div class="h-8 w-8 text-primary-600 flex items-center justify-center"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div> <span class="ml-2 text-xl font-semibold text-gray-800">Administrador de Laboratorio</span></div> <nav class="mt-8 flex-1 px-4 space-y-2">${each(navigationItems, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${"flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors " + escape(
      isActiveRoute(item.href) ? "bg-primary-100 text-primary-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      true
    )}"><svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${add_attribute("d", getIconPath(item.icon), 0)}></path></svg> ${escape(item.name)} </a>`;
  })}</nav></div> ${user ? `<div class="flex-shrink-0 flex border-t border-gray-200 p-4"><div class="flex items-center w-full group"><div class="flex-shrink-0"><div class="${"inline-flex items-center justify-center h-10 w-10 rounded-full bg-" + escape(getRoleColor(user.role), true) + "-100"}"><span class="${"text-sm font-medium text-" + escape(getRoleColor(user.role), true) + "-800"}">${escape(user.name.charAt(0).toUpperCase())}</span></div></div> <div class="ml-3 flex-1"><p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">${escape(user.name)}</p> <p class="text-xs text-gray-500">${escape(getRoleLabel(user.role))}</p></div> <button type="button" class="ml-3 text-gray-400 hover:text-gray-600" title="Cerrar sesión" data-svelte-h="svelte-b1hcii"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></button></div></div>` : ``}</div></div></div>`;
});
const css = {
  code: "html, body{height:100%}#svelte{height:100%}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import \\"../app.css\\";\\nimport { onMount } from \\"svelte\\";\\nimport { page } from \\"$app/stores\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport { currentUser, isAuthenticated, sidebarOpen } from \\"$lib/stores\\";\\nimport Navigation from \\"$lib/components/Navigation.svelte\\";\\nimport { demoUsers } from \\"$lib/data/demo-users\\";\\n$: isLoginPage = $page.url.pathname === \\"/login\\";\\n$: shouldShowNavigation = $isAuthenticated && !isLoginPage;\\nonMount(() => {\\n  console.log(\\"Layout onMount called\\");\\n  const savedUser = localStorage.getItem(\\"currentUser\\");\\n  console.log(\\"Saved user from localStorage:\\", savedUser);\\n  if (savedUser) {\\n    try {\\n      const user = JSON.parse(savedUser);\\n      console.log(\\"Parsed user:\\", user);\\n      currentUser.set(user);\\n    } catch (error) {\\n      console.error(\\"Failed to parse saved user:\\", error);\\n      localStorage.removeItem(\\"currentUser\\");\\n      const managerUser = demoUsers.find((user) => user.role === \\"manager\\");\\n      console.log(\\"Loading fallback manager user:\\", managerUser);\\n      if (managerUser) {\\n        currentUser.set(managerUser);\\n        localStorage.setItem(\\"currentUser\\", JSON.stringify(managerUser));\\n      }\\n    }\\n  } else {\\n    const managerUser = demoUsers.find((user) => user.role === \\"manager\\");\\n    console.log(\\"No saved user, loading default manager:\\", managerUser);\\n    if (managerUser) {\\n      currentUser.set(managerUser);\\n      localStorage.setItem(\\"currentUser\\", JSON.stringify(managerUser));\\n    }\\n  }\\n});\\nfunction toggleSidebar() {\\n  sidebarOpen.update((open) => !open);\\n}\\n<\/script>\\r\\n\\r\\n\\r\\n<div class=\\"min-h-screen bg-gray-50\\">\\r\\n   {#if shouldShowNavigation}\\r\\n\\t   <div class=\\"flex min-h-screen\\">\\r\\n\\t\\t   <!-- Navigation -->\\r\\n\\t\\t   <Navigation />\\r\\n\\r\\n\\t\\t   <!-- Encabezado móvil -->\\r\\n\\t\\t   <div class=\\"lg:hidden fixed top-0 left-0 right-0 z-30\\">\\r\\n\\t\\t\\t   <div class=\\"flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200\\">\\r\\n\\t\\t\\t\\t   <button\\r\\n\\t\\t\\t\\t\\t   type=\\"button\\"\\r\\n\\t\\t\\t\\t\\t   class=\\"text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700\\"\\r\\n\\t\\t\\t\\t\\t   on:click={toggleSidebar}\\r\\n\\t\\t\\t\\t   >\\r\\n\\t\\t\\t\\t\\t   <svg class=\\"h-6 w-6\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke=\\"currentColor\\">\\r\\n\\t\\t\\t\\t\\t\\t   <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M4 6h16M4 12h16M4 18h16\\" />\\r\\n\\t\\t\\t\\t\\t   </svg>\\r\\n\\t\\t\\t\\t   </button>\\r\\n\\t\\t\\t\\t   <h1 class=\\"text-lg font-semibold text-gray-800\\">Administrador de Laboratorio</h1>\\r\\n\\t\\t\\t\\t   <div class=\\"w-6\\"></div> <!-- Espaciador para centrar -->\\r\\n\\t\\t\\t   </div>\\r\\n\\t\\t   </div>\\r\\n\\r\\n\\t\\t   <!-- Contenido principal -->\\r\\n\\t\\t   <div class=\\"flex-1 flex flex-col lg:ml-0 min-h-screen\\">\\r\\n\\t\\t\\t   <main class=\\"flex-1 pt-16 lg:pt-0\\">\\r\\n\\t\\t\\t\\t   <slot />\\r\\n\\t\\t\\t   </main>\\r\\n\\t\\t   </div>\\r\\n\\t   </div>\\r\\n   {:else}\\r\\n\\t   <!-- Página de inicio de sesión sin navegación -->\\r\\n\\t   <slot />\\r\\n   {/if}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t:global(html, body) {\\r\\n\\t\\theight: 100%;\\r\\n\\t}\\r\\n\\t\\r\\n\\t:global(#svelte) {\\r\\n\\t\\theight: 100%;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAgFS,UAAY,CACnB,MAAM,CAAE,IACT,CAEQ,OAAS,CAChB,MAAM,CAAE,IACT"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isLoginPage;
  let shouldShowNavigation;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let $page, $$unsubscribe_page;
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  isLoginPage = $page.url.pathname === "/login";
  shouldShowNavigation = $isAuthenticated && !isLoginPage;
  $$unsubscribe_isAuthenticated();
  $$unsubscribe_page();
  return `<div class="min-h-screen bg-gray-50">${shouldShowNavigation ? `<div class="flex min-h-screen"> ${validate_component(Navigation, "Navigation").$$render($$result, {}, {}, {})}  <div class="lg:hidden fixed top-0 left-0 right-0 z-30"><div class="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200"><button type="button" class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" data-svelte-h="svelte-1fxd3w5"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button> <h1 class="text-lg font-semibold text-gray-800" data-svelte-h="svelte-34urnf">Administrador de Laboratorio</h1> <div class="w-6"></div> </div></div>  <div class="flex-1 flex flex-col lg:ml-0 min-h-screen"><main class="flex-1 pt-16 lg:pt-0">${slots.default ? slots.default({}) : ``}</main></div></div>` : ` ${slots.default ? slots.default({}) : ``}`} </div>`;
});
export {
  Layout as default
};
