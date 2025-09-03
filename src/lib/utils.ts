import type { OrderStatus, UserRole } from './types';

// Date utilities
export function formatDate(date: Date | string): string {
	const d = new Date(date);
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

export function formatDateTime(date: Date | string): string {
	const d = new Date(date);
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

export function formatRelativeTime(date: Date | string): string {
	const d = new Date(date);
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffMinutes = Math.floor(diffMs / (1000 * 60));

	if (diffDays > 0) {
		return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
	} else if (diffHours > 0) {
		return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
	} else if (diffMinutes > 0) {
		return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
	} else {
		return 'Just now';
	}
}

export function getDaysUntilDue(dueDate: Date | string): number {
	const due = new Date(dueDate);
	const now = new Date();
	const diffMs = due.getTime() - now.getTime();
	return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

// Status utilities
export function getStatusColor(status: OrderStatus): string {
	const colors = {
		pending: 'warning',
		approved: 'primary',
		in_progress: 'primary',
		rejected: 'danger',
		completed: 'success',
		delivered: 'secondary'
	};
	return colors[status] || 'secondary';
}

export function getStatusLabel(status: OrderStatus): string {
	const labels = {
		pending: 'Pending Review',
		approved: 'Approved',
		in_progress: 'In Progress',
		rejected: 'Rejected',
		completed: 'Completed',
		delivered: 'Delivered'
	};
	return labels[status] || status;
}

export function getRoleLabel(role: UserRole): string {
	const labels = {
		specialist: 'Specialist',
		receptionist: 'Receptionist',
		manager: 'Branch Manager',
		technician: 'Lab Technician'
	};
	return labels[role] || role;
}

export function getRoleColor(role: UserRole): string {
	const colors = {
		specialist: 'primary',
		receptionist: 'success',
		manager: 'warning',
		technician: 'secondary'
	};
	return colors[role] || 'secondary';
}

// Validation utilities
export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
	const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
	return phoneRegex.test(phone);
}

// Permission utilities
export function canCreateOrder(role: UserRole): boolean {
	return ['specialist', 'receptionist'].includes(role);
}

export function canApproveOrder(role: UserRole): boolean {
	return role === 'manager';
}

export function canManageProduction(role: UserRole): boolean {
	return role === 'technician';
}

export function canViewKPIs(role: UserRole): boolean {
	return ['manager', 'technician'].includes(role);
}

export function canManagePatients(role: UserRole): boolean {
	return ['receptionist', 'manager'].includes(role);
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
	return array.reduce((groups, item) => {
		const value = String(item[key]);
		if (!groups[value]) {
			groups[value] = [];
		}
		groups[value].push(item);
		return groups;
	}, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
	return array.sort((a, b) => {
		const aVal = a[key];
		const bVal = b[key];
		
		if (aVal < bVal) return direction === 'asc' ? -1 : 1;
		if (aVal > bVal) return direction === 'asc' ? 1 : -1;
		return 0;
	});
}

// Local storage utilities
export function saveToLocalStorage(key: string, data: any): void {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.error('Failed to save to localStorage:', error);
	}
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : defaultValue;
	} catch (error) {
		console.error('Failed to load from localStorage:', error);
		return defaultValue;
	}
}

export function removeFromLocalStorage(key: string): void {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error('Failed to remove from localStorage:', error);
	}
}

// Number utilities
export function formatScore(score: number, maxScore: number = 5): string {
	return `${score.toFixed(1)}/${maxScore}`;
}

export function calculatePercentage(value: number, total: number): number {
	if (total === 0) return 0;
	return Math.round((value / total) * 100);
}

// String utilities
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - 3) + '...';
}

export function capitalizeFirst(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

// ID generation
export function generateId(): string {
	return crypto.randomUUID();
}