import { c as create_ssr_component } from "../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "../../chunks/state.svelte.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen flex items-center justify-center" data-svelte-h="svelte-164y8ot"><div class="text-center"><h1 class="text-4xl font-bold text-gray-900 mb-4">Dental Lab Manager</h1> <p class="text-gray-600">Redirecting to login...</p></div></div>`;
});
export {
  Page as default
};
