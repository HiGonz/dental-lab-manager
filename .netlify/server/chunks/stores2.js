import { d as derived, w as writable } from "./index.js";
const currentUser = writable(null);
const isAuthenticated = derived(currentUser, ($user) => $user !== null);
const loading = writable(false);
const orders = writable([]);
const patients = writable([]);
const dashboardStats = writable({
  totalOrders: 0,
  pendingOrders: 0,
  overdueOrders: 0,
  completedToday: 0,
  averageDeliveryTime: 0,
  currentScore: 0
});
const sidebarOpen = writable(false);
const preferences = writable({
  notifications: true,
  emailAlerts: true,
  theme: "light"
});
export {
  preferences as a,
  currentUser as c,
  dashboardStats as d,
  isAuthenticated as i,
  loading as l,
  orders as o,
  patients as p,
  sidebarOpen as s
};
