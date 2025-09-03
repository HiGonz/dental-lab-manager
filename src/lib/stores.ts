import { writable, derived } from 'svelte/store';
import type { User, Order, Patient, Alert, DashboardStats } from './types';

// Auth store
export const currentUser = writable<User | null>(null);
export const isAuthenticated = derived(currentUser, ($user) => $user !== null);

// UI stores
export const loading = writable(false);
export const notifications = writable<Alert[]>([]);

// Data stores
export const orders = writable<Order[]>([]);
export const patients = writable<Patient[]>([]);
export const alerts = writable<Alert[]>([]);

// Dashboard stats
export const dashboardStats = writable<DashboardStats>({
	totalOrders: 0,
	pendingOrders: 0,
	overdueOrders: 0,
	completedToday: 0,
	averageDeliveryTime: 0,
	currentScore: 0
});

// Filter and search
export const searchQuery = writable('');
export const statusFilter = writable<string>('all');

// Modal and UI state
export const activeModal = writable<string | null>(null);
export const sidebarOpen = writable(false);

// Theme and preferences
export const darkMode = writable(false);
export const preferences = writable({
	notifications: true,
	emailAlerts: true,
	theme: 'light'
});