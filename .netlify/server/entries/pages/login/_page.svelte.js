import { c as create_ssr_component, d as add_attribute, e as each, b as escape } from "../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "../../../chunks/state.svelte.js";
import "../../../chunks/stores2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let username = "";
  let password = "";
  const demoUsers = [
    {
      username: "especialista1",
      name: "Dr. María González",
      role: "Specialist"
    },
    {
      username: "recepcionista1",
      name: "Ana Martínez",
      role: "Receptionist"
    },
    {
      username: "gerente1",
      name: "Carlos Rodriguez",
      role: "manager"
    },
    {
      username: "tecnico1",
      name: "Luis Fernández",
      role: "Lab Technician"
    }
  ];
  return `<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-md w-full space-y-8"><div data-svelte-h="svelte-1lh8gn1"><div class="mx-auto h-12 w-12 text-primary-600 flex items-center justify-center"><svg class="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Dental Lab Manager</h2> <p class="mt-2 text-center text-sm text-gray-600">Sign in to your account</p></div> <form class="mt-8 space-y-6"><div class="card space-y-4"><div><label for="username" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-10hwsxv">Username</label> <input id="username" name="username" type="text" autocomplete="username" required class="input mt-1" placeholder="Enter your username"${add_attribute("value", username, 0)}></div> <div><label for="password" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-1cf2mnt">Password</label> <input id="password" name="password" type="password" autocomplete="current-password" required class="input mt-1" placeholder="Enter your password"${add_attribute("value", password, 0)}></div> ${``} <button type="submit" ${""} class="w-full btn btn-primary h-10 text-sm font-medium">${`Sign in`}</button></div></form> <div class="mt-8"><div class="text-center"><p class="text-sm text-gray-600 mb-4" data-svelte-h="svelte-e93yur">Demo Users (Password: demo123)</p> <div class="grid grid-cols-1 gap-2">${each(demoUsers, (user) => {
    return `<button type="button" class="text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"><div class="font-medium text-sm text-gray-900">${escape(user.name)}</div> <div class="text-xs text-gray-500">${escape(user.role)} • ${escape(user.username)}</div> </button>`;
  })}</div></div></div></div></div>`;
});
export {
  Page as default
};
