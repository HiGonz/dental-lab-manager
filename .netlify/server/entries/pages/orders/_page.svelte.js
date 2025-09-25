import { c as create_ssr_component, b as escape, d as add_attribute, e as each, v as validate_component, a as subscribe } from "../../../chunks/ssr.js";
import { c as currentUser, l as loading, o as orders } from "../../../chunks/stores2.js";
import { b as getStatusColor, d as getStatusLabel, e as getDaysUntilDue, f as formatDate, h as groupBy } from "../../../chunks/utils2.js";
const OrderCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let urgentTag;
  let statusColor;
  let statusLabel;
  let daysUntilDue;
  let isOverdue;
  let isDueSoon;
  let { order } = $$props;
  let { showPatient = true } = $$props;
  let { showSpecialist = true } = $$props;
  let { compact = false } = $$props;
  if ($$props.order === void 0 && $$bindings.order && order !== void 0) $$bindings.order(order);
  if ($$props.showPatient === void 0 && $$bindings.showPatient && showPatient !== void 0) $$bindings.showPatient(showPatient);
  if ($$props.showSpecialist === void 0 && $$bindings.showSpecialist && showSpecialist !== void 0) $$bindings.showSpecialist(showSpecialist);
  if ($$props.compact === void 0 && $$bindings.compact && compact !== void 0) $$bindings.compact(compact);
  urgentTag = order.urgentTag;
  statusColor = getStatusColor(order.status);
  statusLabel = getStatusLabel(order.status);
  daysUntilDue = getDaysUntilDue(order.dueDate);
  isOverdue = daysUntilDue < 0 && order.status !== "completed" && order.status !== "delivered";
  isDueSoon = daysUntilDue <= 1 && daysUntilDue >= 0 && order.status !== "completed" && order.status !== "delivered";
  return `<div class="${"card hover:shadow-md transition-shadow cursor-pointer " + escape(compact ? "p-4" : "p-6", true)}" role="button" tabindex="0"> <div class="flex items-start justify-between mb-3"><div class="flex items-center space-x-2"><span class="${"badge badge-" + escape(statusColor, true)}">${escape(statusLabel)}</span> ${urgentTag ? `<span class="badge badge-danger" data-svelte-h="svelte-ume19h"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 12.5C3.962 14.333 4.924 16 6.464 16z"></path></svg>
					   Urgente</span>` : ``} ${isOverdue ? `<span class="badge badge-danger" data-svelte-h="svelte-i9pyvc"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					   Atrasada</span>` : `${isDueSoon ? `<span class="badge badge-warning" data-svelte-h="svelte-jjz2a4"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					   Próxima a vencer</span>` : ``}`}</div> <div class="text-sm text-gray-500">#${escape(order.id.slice(-6))}</div></div>  <h3 class="${"font-medium text-gray-900 mb-2 " + escape(compact ? "text-sm" : "text-base", true)}">${escape(order.description)}</h3>  ${showPatient && order.patient ? `<div class="flex items-center text-sm text-gray-600 mb-2"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> ${escape(order.patient.name)}</div>` : ``}  ${showSpecialist && order.specialist ? `<div class="flex items-center text-sm text-gray-600 mb-2"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> ${escape(order.specialist.name)}</div>` : ``}  ${order.status === "in_progress" && order.stages.length > 0 ? `<div class="mb-3"><div class="flex justify-between text-xs text-gray-500 mb-1"><span data-svelte-h="svelte-3b2cf1">Progreso</span> <span>${escape(order.stages.filter((s) => s.status === "completed").length)} / ${escape(order.stages.length)}</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-primary-600 h-2 rounded-full transition-all duration-300" style="${"width: " + escape(order.stages.filter((s) => s.status === "completed").length / order.stages.length * 100, true) + "%"}"></div></div></div>` : ``}  <div class="${"flex justify-between items-center text-xs text-gray-500 " + escape(compact ? "mt-2" : "mt-3", true)}"><div class="flex flex-col"><span>Creada: ${escape(formatDate(order.createdAt))}</span> ${order.completedAt ? `<span>Completada: ${escape(formatDate(order.completedAt))}</span>` : `${order.approvedAt ? `<span>Aprobada: ${escape(formatDate(order.approvedAt))}</span>` : ``}`}</div> <div class="flex flex-col text-right"><span class="${"font-medium " + escape(
    isOverdue ? "text-danger-600" : isDueSoon ? "text-warning-600" : "",
    true
  )}">Vence: ${escape(formatDate(order.dueDate))}</span> ${daysUntilDue >= 0 ? `<span${add_attribute("class", isDueSoon ? "text-warning-600" : "", 0)}>${escape(daysUntilDue)} día${escape(daysUntilDue !== 1 ? "s" : "")} restante${escape(daysUntilDue !== 1 ? "s" : "")}</span>` : `<span class="text-danger-600">${escape(Math.abs(daysUntilDue))} día${escape(Math.abs(daysUntilDue) !== 1 ? "s" : "")} atrasada${escape(Math.abs(daysUntilDue) !== 1 ? "s" : "")}</span>`}</div></div></div>`;
});
const KanbanBoard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let groupedOrders;
  let filteredOrders;
  let filteredGroupedOrders;
  let filteredOrderCounts;
  let { orders: orders2 = [] } = $$props;
  let { allowDragDrop = true } = $$props;
  let { showFilters = true } = $$props;
  const columns = [
    {
      id: "pending",
      title: "Pendiente de revisión",
      color: "warning",
      description: "Órdenes esperando aprobación"
    },
    {
      id: "approved",
      title: "Aprobada",
      color: "primary",
      description: "Órdenes listas para producción"
    },
    {
      id: "in_progress",
      title: "En proceso",
      color: "primary",
      description: "Órdenes en fabricación"
    },
    {
      id: "completed",
      title: "Completada",
      color: "success",
      description: "Órdenes listas para entrega"
    },
    {
      id: "delivered",
      title: "Entregada",
      color: "secondary",
      description: "Órdenes entregadas al paciente"
    },
    {
      id: "rejected",
      title: "Rechazada",
      color: "danger",
      description: "Órdenes que requieren revisión"
    }
  ];
  let searchQuery = "";
  let urgentOnly = false;
  let overdueOnly = false;
  let dragOverColumn = null;
  if ($$props.orders === void 0 && $$bindings.orders && orders2 !== void 0) $$bindings.orders(orders2);
  if ($$props.allowDragDrop === void 0 && $$bindings.allowDragDrop && allowDragDrop !== void 0) $$bindings.allowDragDrop(allowDragDrop);
  if ($$props.showFilters === void 0 && $$bindings.showFilters && showFilters !== void 0) $$bindings.showFilters(showFilters);
  groupedOrders = groupBy(orders2, "status");
  columns.map((col) => ({
    ...col,
    count: groupedOrders[col.id]?.length || 0,
    orders: groupedOrders[col.id] || []
  }));
  filteredOrders = orders2.filter((order) => {
    const matchesSearch = !searchQuery;
    const matchesUrgent = !urgentOnly;
    const isOverdue = true;
    return matchesSearch && matchesUrgent && isOverdue;
  });
  filteredGroupedOrders = groupBy(filteredOrders, "status");
  filteredOrderCounts = columns.map((col) => ({
    ...col,
    count: filteredGroupedOrders[col.id]?.length || 0,
    orders: filteredGroupedOrders[col.id] || []
  }));
  return `<div class="space-y-6"> ${showFilters ? `<div class="bg-white p-4 rounded-lg border border-gray-200 space-y-4"><div class="flex flex-wrap items-center gap-4"><div class="flex-1 min-w-64"><input type="text" placeholder="Buscar órdenes, pacientes o especialistas..." class="input w-full"${add_attribute("value", searchQuery, 0)}></div> <div class="flex items-center space-x-4"><label class="flex items-center"><input type="checkbox" class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"${add_attribute("checked", urgentOnly, 1)}> <span class="ml-2 text-sm text-gray-700" data-svelte-h="svelte-1vk5sfq">Solo urgentes</span></label> <label class="flex items-center"><input type="checkbox" class="rounded border-gray-300 text-danger-600 shadow-sm focus:border-danger-300 focus:ring focus:ring-danger-200 focus:ring-opacity-50"${add_attribute("checked", overdueOnly, 1)}> <span class="ml-2 text-sm text-gray-700" data-svelte-h="svelte-1tjyien">Solo atrasadas</span></label> ${``}</div></div></div>` : ``}  <div class="relative"> <div class="absolute top-0 right-0 z-10 bg-gradient-to-l from-white via-white to-transparent w-8 h-full pointer-events-none lg:hidden"></div> <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"><div class="flex space-x-6 min-w-max pb-4" style="width: max-content;">${each(filteredOrderCounts, (column) => {
    return `<div class="${"flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4 " + escape(
      dragOverColumn === column.id ? "ring-2 ring-primary-500 bg-primary-50" : "",
      true
    )}" role="region" aria-label="${escape(column.title, true) + " column"}"> <div class="flex items-center justify-between mb-4"><div><h3 class="font-semibold text-gray-900 text-sm">${escape(column.title)}</h3> <p class="text-xs text-gray-500 mt-1">${escape(column.description)} </p></div> <span class="${"bg-" + escape(column.color, true) + "-100 text-" + escape(column.color, true) + "-800 text-xs font-medium px-2.5 py-0.5 rounded-full"}">${escape(column.count)} </span></div>  <div class="space-y-3 min-h-32">${each(column.orders, (order) => {
      return `<div${add_attribute("draggable", allowDragDrop, 0)} class="${"transform transition-transform " + escape(allowDragDrop ? "hover:scale-105 cursor-move" : "", true)}" role="button" tabindex="0">${validate_component(OrderCard, "OrderCard").$$render($$result, { order, compact: true }, {}, {})} </div>`;
    })} ${column.orders.length === 0 ? `<div class="text-center py-8 text-gray-400" data-svelte-h="svelte-1i8fict"><svg class="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg> <p class="text-sm">Sin órdenes</p> </div>` : ``}</div> </div>`;
  })}</div></div></div>  <div class="bg-white p-4 rounded-lg border border-gray-200"><div class="grid grid-cols-2 md:grid-cols-6 gap-4">${each(filteredOrderCounts, (column) => {
    return `<div class="text-center"><div class="${"text-2xl font-bold text-" + escape(column.color, true) + "-600"}">${escape(column.count)}</div> <div class="text-sm text-gray-600">${escape(column.title)}</div> </div>`;
  })}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let canCreateOrder;
  let canApproveOrder;
  let canManageProduction;
  let $currentUser, $$unsubscribe_currentUser;
  let $loading, $$unsubscribe_loading;
  let $orders, $$unsubscribe_orders;
  $$unsubscribe_currentUser = subscribe(currentUser, (value) => $currentUser = value);
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  $$unsubscribe_orders = subscribe(orders, (value) => $orders = value);
  user = $currentUser;
  canCreateOrder = user?.role === "specialist" || user?.role === "receptionist";
  canApproveOrder = user?.role === "manager";
  canManageProduction = user?.role === "technician";
  $$unsubscribe_currentUser();
  $$unsubscribe_loading();
  $$unsubscribe_orders();
  return `<div class="p-6 min-w-0 overflow-x-auto"> <div class="flex items-center justify-between mb-6"><div data-svelte-h="svelte-iarnhx"><h1 class="text-2xl font-bold text-gray-900">Órdenes</h1> <p class="mt-1 text-sm text-gray-600">Administrar y seguir órdenes del laboratorio dental</p></div> <div class="flex items-center space-x-3"> <div class="flex rounded-lg border border-gray-300 p-1"><button type="button" class="${"px-3 py-1 text-sm font-medium rounded " + escape(
    "bg-primary-100 text-primary-700",
    true
  )}"><svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
					Kanban</button> <button type="button" class="${"px-3 py-1 text-sm font-medium rounded " + escape(
    "text-gray-500 hover:text-gray-700",
    true
  )}"><svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
					List</button></div>  ${canCreateOrder ? `<a href="/orders/create" class="btn btn-primary" data-svelte-h="svelte-1ifljsq"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
					Nueva Orden</a>` : ``}</div></div>  ${$loading ? `<div class="flex items-center justify-center py-12" data-svelte-h="svelte-jw9wii"><div class="flex items-center space-x-2"><svg class="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> <span class="text-gray-600">Cargando órdenes...</span></div></div>` : ` ${`${validate_component(KanbanBoard, "KanbanBoard").$$render(
    $$result,
    {
      orders: $orders,
      allowDragDrop: canApproveOrder || canManageProduction,
      showFilters: true
    },
    {},
    {}
  )}`}`}</div>`;
});
export {
  Page as default
};
