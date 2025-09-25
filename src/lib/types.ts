export type UserRole = 'specialist' | 'receptionist' | 'manager' | 'technician';

export interface User {
	id: string;
	username: string;
	name: string;
	role: UserRole;
	email: string;
	createdAt: Date;
}

export type OrderStatus = 'pending' | 'approved' | 'in_progress' | 'rejected' | 'completed' | 'delivered';

export interface Patient {
	id: string;
	name: string;
	email: string;
	phone: string;
	dateOfBirth: Date;
	createdAt: Date;
}

export interface Branch {
	id: string;
	name: string;
	address: string;
	phone: string;
	email: string;
	isActive: boolean;
}

export interface OrderStage {
	id: string;
	name: string;
	description: string;
	order: number;
	estimatedDays: number;
}

export interface Order {
	id: string;
	patientId: string;
	patient?: Patient;
	specialistId: string;
	specialist?: User;
	technicianId?: string;
	technician?: User;
	status: OrderStatus;
	description: string;
	urgentTag: boolean;
	createdAt: Date;
	updatedAt: Date;
	approvedAt?: Date;
	rejectedAt?: Date;
	completedAt?: Date;
	deliveredAt?: Date;
	dueDate: Date;
	stages: OrderStageProgress[];
	notes: OrderNote[];
	version: number;
}

export interface OrderStageProgress {
	id: string;
	orderId: string;
	stageId: string;
	stage?: OrderStage;
	status: 'pending' | 'in_progress' | 'completed';
	startedAt?: Date;
	completedAt?: Date;
	notes?: string;
}

export interface OrderNote {
	id: string;
	orderId: string;
	userId: string;
	user?: User;
	content: string;
	createdAt: Date;
}

export interface ActivityLog {
	id: string;
	orderId: string;
	userId: string;
	user?: User;
	action: string;
	description: string;
	createdAt: Date;
}

export interface Score {
	id: string;
	userId: string;
	user?: User;
	orderId: string;
	order?: Order;
	type: 'specialist' | 'manager' | 'technician';
	score: number;
	maxScore: number;
	calculatedAt: Date;
	notes?: string;
}

export interface KPI {
	id: string;
	type: 'delivery_time' | 'approval_time' | 'completion_rate' | 'quality_score';
	period: 'daily' | 'weekly' | 'monthly';
	value: number;
	target: number;
	calculatedAt: Date;
	metadata?: Record<string, any>;
}

export interface Alert {
	id: string;
	orderId: string;
	order?: Order;
	type: 'overdue' | 'due_soon' | 'urgent' | 'rejection';
	title: string;
	message: string;
	severity: 'low' | 'medium' | 'high' | 'critical';
	isRead: boolean;
	createdAt: Date;
	expiresAt?: Date;
}

export interface DashboardStats {
	totalOrders: number;
	pendingOrders: number;
	overdueOrders: number;
	completedToday: number;
	averageDeliveryTime: number;
	currentScore: number;
}