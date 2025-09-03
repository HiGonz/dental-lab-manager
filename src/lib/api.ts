import type { User, Order, Patient, Alert, Score, KPI } from './types';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
	private apiUrl = '/api'; // This would be your actual API URL in production

	// Authentication
	async login(username: string, password: string): Promise<User | null> {
		await delay(1000); // Simulate network delay
		
		// Demo users authentication
		const demoUsers = await this.getDemoUsers();
		const user = demoUsers.find(u => u.username === username);
		
		if (user && password === 'demo123') {
			return user;
		}
		
		throw new Error('Invalid credentials');
	}

	async logout(): Promise<void> {
		await delay(500);
		// Clear session storage or cookies
		localStorage.removeItem('currentUser');
	}

	// Users
	async getDemoUsers(): Promise<User[]> {
		const { demoUsers } = await import('./data/demo-users');
		return demoUsers;
	}

	// Orders
	async getOrders(): Promise<Order[]> {
		await delay(800);
		const { demoOrders } = await import('./data/demo-orders');
		return demoOrders;
	}

	async getOrderById(id: string): Promise<Order | null> {
		await delay(500);
		const orders = await this.getOrders();
		return orders.find(order => order.id === id) || null;
	}

	async createOrder(orderData: Partial<Order>): Promise<Order> {
		await delay(1000);
		// In a real app, this would make a POST request
		const newOrder: Order = {
			id: crypto.randomUUID(),
			status: 'pending',
			urgentTag: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
			stages: [],
			notes: [],
			version: 1,
			...orderData
		} as Order;
		
		return newOrder;
	}

	async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
		await delay(800);
		// In a real app, this would make a PUT request
		const order = await this.getOrderById(id);
		if (!order) throw new Error('Order not found');
		
		return { ...order, ...updates, updatedAt: new Date() };
	}

	async deleteOrder(id: string): Promise<void> {
		await delay(500);
		// In a real app, this would make a DELETE request
	}

	// Patients
	async getPatients(): Promise<Patient[]> {
		await delay(600);
		const { demoPatients } = await import('./data/demo-patients');
		return demoPatients;
	}

	async getPatientById(id: string): Promise<Patient | null> {
		await delay(400);
		const patients = await this.getPatients();
		return patients.find(patient => patient.id === id) || null;
	}

	async createPatient(patientData: Partial<Patient>): Promise<Patient> {
		await delay(800);
		const newPatient: Patient = {
			id: crypto.randomUUID(),
			createdAt: new Date(),
			...patientData
		} as Patient;
		
		return newPatient;
	}

	// Alerts
	async getAlerts(userId?: string): Promise<Alert[]> {
		await delay(400);
		// In a real app, this would filter by user role and permissions
		return [];
	}

	async markAlertAsRead(id: string): Promise<void> {
		await delay(300);
		// In a real app, this would update the alert
	}

	// KPIs and Scores
	async getKPIs(period: 'daily' | 'weekly' | 'monthly' = 'weekly'): Promise<KPI[]> {
		await delay(600);
		// In a real app, this would calculate real KPIs
		return [];
	}

	async getScores(userId?: string): Promise<Score[]> {
		await delay(500);
		// In a real app, this would calculate user scores
		return [];
	}

	// Dashboard stats
	async getDashboardStats(userId: string, role: string): Promise<any> {
		await delay(700);
		const orders = await this.getOrders();
		
		// Calculate stats based on role
		const now = new Date();
		const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		
		return {
			totalOrders: orders.length,
			pendingOrders: orders.filter(o => o.status === 'pending').length,
			overdueOrders: orders.filter(o => new Date(o.dueDate) < now && o.status !== 'completed' && o.status !== 'delivered').length,
			completedToday: orders.filter(o => o.completedAt && new Date(o.completedAt) >= todayStart).length,
			averageDeliveryTime: 5.2, // days
			currentScore: 4.3 // out of 5
		};
	}
}

export const api = new ApiService();