import { c as create_ssr_component, a as subscribe, d as add_attribute, b as escape, e as each } from "../../../chunks/ssr.js";
import { p as patients, c as currentUser, l as loading } from "../../../chunks/stores2.js";
import { i as canManagePatients, f as formatDate } from "../../../chunks/utils2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let canManage;
  let filteredPatients;
  let $patients, $$unsubscribe_patients;
  let $currentUser, $$unsubscribe_currentUser;
  let $loading, $$unsubscribe_loading;
  $$unsubscribe_patients = subscribe(patients, (value) => $patients = value);
  $$unsubscribe_currentUser = subscribe(currentUser, (value) => $currentUser = value);
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  let searchQuery = "";
  user = $currentUser;
  canManage = user ? canManagePatients(user.role) : false;
  filteredPatients = $patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || patient.email.toLowerCase().includes(searchQuery.toLowerCase()) || patient.phone.includes(searchQuery));
  $$unsubscribe_patients();
  $$unsubscribe_currentUser();
  $$unsubscribe_loading();
  return `<div class="p-6"> <div class="flex items-center justify-between mb-6"><div data-svelte-h="svelte-138n1ht"><h1 class="text-2xl font-bold text-gray-900">Patients</h1> <p class="mt-1 text-sm text-gray-600">Manage patient information and history</p></div> ${canManage ? `<button type="button" class="btn btn-primary" data-svelte-h="svelte-e0bt90"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
				Add Patient</button>` : ``}</div>  <div class="mb-6"><input type="text" placeholder="Search patients by name, email, or phone..." class="input w-full max-w-md"${add_attribute("value", searchQuery, 0)}></div>  ${$loading ? `<div class="flex items-center justify-center py-12" data-svelte-h="svelte-7h336x"><div class="flex items-center space-x-2"><svg class="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> <span class="text-gray-600">Loading patients...</span></div></div>` : ` ${filteredPatients.length === 0 ? `<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> <h3 class="text-lg font-medium text-gray-900 mb-2">${escape("No patients yet")}</h3> <p class="text-gray-600 mb-4">${escape("Get started by adding your first patient.")}</p> ${canManage && !searchQuery ? `<button type="button" class="btn btn-primary" data-svelte-h="svelte-1h8rv4m">Add First Patient</button>` : ``}</div>` : `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${each(filteredPatients, (patient) => {
    return `<div class="card hover:shadow-md transition-shadow cursor-pointer"><div class="flex items-start justify-between mb-4"><div class="flex items-center"><div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"><span class="text-sm font-medium text-primary-800">${escape(patient.name.charAt(0).toUpperCase())} </span></div> <div class="ml-3"><h3 class="text-sm font-medium text-gray-900">${escape(patient.name)}</h3> <p class="text-sm text-gray-500" data-svelte-h="svelte-szlntb">Patient</p></div> </div></div> <div class="space-y-2 text-sm text-gray-600"><div class="flex items-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> ${escape(patient.email)}</div> <div class="flex items-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> ${escape(patient.phone)}</div> <div class="flex items-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
								Born: ${escape(formatDate(patient.dateOfBirth))}</div> <div class="flex items-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
								Registered: ${escape(formatDate(patient.createdAt))} </div></div> <div class="mt-4 pt-4 border-t border-gray-200"><div class="flex justify-between items-center"><button type="button" class="text-sm text-primary-600 hover:text-primary-700" data-svelte-h="svelte-mi2bdt">View History</button> ${canManage ? `<button type="button" class="text-sm text-gray-600 hover:text-gray-700" data-svelte-h="svelte-10pp15y">Edit
									</button>` : ``} </div></div> </div>`;
  })}</div>`}`}</div>`;
});
export {
  Page as default
};
