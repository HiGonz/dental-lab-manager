

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/calendar/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.VQXiwzJ1.js","_app/immutable/chunks/CxZMmCqV.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/DqiJUgCJ.js","_app/immutable/chunks/ZQdRjD4P.js"];
export const stylesheets = [];
export const fonts = [];
