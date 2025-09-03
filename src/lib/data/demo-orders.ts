import type { Order, OrderStage } from '../types';

// Default order stages
export const orderStages: OrderStage[] = [
	{
		id: '1',
		name: 'Impression Review',
		description: 'Review and validate dental impressions',
		order: 1,
		estimatedDays: 1
	},
	{
		id: '2',
		name: 'Model Creation',
		description: 'Create dental model from impressions',
		order: 2,
		estimatedDays: 2
	},
	{
		id: '3',
		name: 'Design & Planning',
		description: 'Design the dental prosthetic',
		order: 3,
		estimatedDays: 1
	},
	{
		id: '4',
		name: 'Manufacturing',
		description: 'Manufacture the dental prosthetic',
		order: 4,
		estimatedDays: 2
	},
	{
		id: '5',
		name: 'Quality Control',
		description: 'Final quality check and polishing',
		order: 5,
		estimatedDays: 1
	}
];

export const demoOrders: Order[] = [
	{
		id: '1',
		patientId: '1',
		specialistId: '1',
		technicianId: '4',
		status: 'pending',
		description: 'Crown restoration for upper molar #16',
		urgentTag: false,
		createdAt: new Date('2024-03-01T09:30:00'),
		updatedAt: new Date('2024-03-01T09:30:00'),
		dueDate: new Date('2024-03-08T17:00:00'),
		stages: [
			{
				id: '1-1',
				orderId: '1',
				stageId: '1',
				status: 'pending',
				startedAt: undefined,
				completedAt: undefined
			}
		],
		notes: [
			{
				id: '1-note-1',
				orderId: '1',
				userId: '1',
				content: 'Patient presents with damaged crown on upper right molar. Requires full crown replacement.',
				createdAt: new Date('2024-03-01T09:30:00')
			}
		],
		version: 1
	},
	{
		id: '2',
		patientId: '2',
		specialistId: '5',
		technicianId: '4',
		status: 'approved',
		description: 'Partial denture for lower jaw',
		urgentTag: true,
		createdAt: new Date('2024-02-28T14:15:00'),
		updatedAt: new Date('2024-03-01T10:00:00'),
		approvedAt: new Date('2024-03-01T10:00:00'),
		dueDate: new Date('2024-03-07T17:00:00'),
		stages: [
			{
				id: '2-1',
				orderId: '2',
				stageId: '1',
				status: 'completed',
				startedAt: new Date('2024-03-01T10:30:00'),
				completedAt: new Date('2024-03-01T16:00:00')
			},
			{
				id: '2-2',
				orderId: '2',
				stageId: '2',
				status: 'in_progress',
				startedAt: new Date('2024-03-02T09:00:00'),
				completedAt: undefined
			}
		],
		notes: [
			{
				id: '2-note-1',
				orderId: '2',
				userId: '5',
				content: 'Urgent case - patient needs denture for important event next week.',
				createdAt: new Date('2024-02-28T14:15:00')
			},
			{
				id: '2-note-2',
				orderId: '2',
				userId: '3',
				content: 'Approved for urgent processing. Fast-track this order.',
				createdAt: new Date('2024-03-01T10:00:00')
			}
		],
		version: 1
	},
	{
		id: '3',
		patientId: '3',
		specialistId: '1',
		technicianId: '6',
		status: 'in_progress',
		description: 'Bridge restoration for teeth #14-16',
		urgentTag: false,
		createdAt: new Date('2024-02-25T11:20:00'),
		updatedAt: new Date('2024-03-02T14:30:00'),
		approvedAt: new Date('2024-02-26T09:15:00'),
		dueDate: new Date('2024-03-04T17:00:00'),
		stages: [
			{
				id: '3-1',
				orderId: '3',
				stageId: '1',
				status: 'completed',
				startedAt: new Date('2024-02-26T10:00:00'),
				completedAt: new Date('2024-02-26T17:00:00')
			},
			{
				id: '3-2',
				orderId: '3',
				stageId: '2',
				status: 'completed',
				startedAt: new Date('2024-02-27T09:00:00'),
				completedAt: new Date('2024-02-28T17:00:00')
			},
			{
				id: '3-3',
				orderId: '3',
				stageId: '3',
				status: 'completed',
				startedAt: new Date('2024-03-01T09:00:00'),
				completedAt: new Date('2024-03-01T17:00:00')
			},
			{
				id: '3-4',
				orderId: '3',
				stageId: '4',
				status: 'in_progress',
				startedAt: new Date('2024-03-02T09:00:00'),
				completedAt: undefined
			}
		],
		notes: [
			{
				id: '3-note-1',
				orderId: '3',
				userId: '1',
				content: 'Three-unit bridge replacement. Special attention to color matching.',
				createdAt: new Date('2024-02-25T11:20:00')
			},
			{
				id: '3-note-2',
				orderId: '3',
				userId: '6',
				content: 'Model created successfully. Proceeding with design phase.',
				createdAt: new Date('2024-02-28T17:30:00')
			}
		],
		version: 1
	},
	{
		id: '4',
		patientId: '4',
		specialistId: '5',
		status: 'rejected',
		description: 'Implant crown for tooth #25',
		urgentTag: false,
		createdAt: new Date('2024-02-20T16:45:00'),
		updatedAt: new Date('2024-02-21T11:30:00'),
		rejectedAt: new Date('2024-02-21T11:30:00'),
		dueDate: new Date('2024-02-27T17:00:00'),
		stages: [],
		notes: [
			{
				id: '4-note-1',
				orderId: '4',
				userId: '5',
				content: 'Implant crown for premolar area.',
				createdAt: new Date('2024-02-20T16:45:00')
			},
			{
				id: '4-note-2',
				orderId: '4',
				userId: '3',
				content: 'Rejected - incomplete impressions. Please retake impressions before resubmitting.',
				createdAt: new Date('2024-02-21T11:30:00')
			}
		],
		version: 1
	},
	{
		id: '5',
		patientId: '5',
		specialistId: '1',
		technicianId: '4',
		status: 'completed',
		description: 'Night guard for bruxism',
		urgentTag: false,
		createdAt: new Date('2024-02-15T13:00:00'),
		updatedAt: new Date('2024-02-22T16:00:00'),
		approvedAt: new Date('2024-02-16T09:00:00'),
		completedAt: new Date('2024-02-22T16:00:00'),
		dueDate: new Date('2024-02-22T17:00:00'),
		stages: [
			{
				id: '5-1',
				orderId: '5',
				stageId: '1',
				status: 'completed',
				startedAt: new Date('2024-02-16T10:00:00'),
				completedAt: new Date('2024-02-16T16:00:00')
			},
			{
				id: '5-2',
				orderId: '5',
				stageId: '2',
				status: 'completed',
				startedAt: new Date('2024-02-17T09:00:00'),
				completedAt: new Date('2024-02-19T17:00:00')
			},
			{
				id: '5-3',
				orderId: '5',
				stageId: '3',
				status: 'completed',
				startedAt: new Date('2024-02-20T09:00:00'),
				completedAt: new Date('2024-02-20T17:00:00')
			},
			{
				id: '5-4',
				orderId: '5',
				stageId: '4',
				status: 'completed',
				startedAt: new Date('2024-02-21T09:00:00'),
				completedAt: new Date('2024-02-22T14:00:00')
			},
			{
				id: '5-5',
				orderId: '5',
				stageId: '5',
				status: 'completed',
				startedAt: new Date('2024-02-22T14:30:00'),
				completedAt: new Date('2024-02-22T16:00:00')
			}
		],
		notes: [
			{
				id: '5-note-1',
				orderId: '5',
				userId: '1',
				content: 'Custom night guard for severe bruxism. Ensure proper thickness and comfort.',
				createdAt: new Date('2024-02-15T13:00:00')
			},
			{
				id: '5-note-2',
				orderId: '5',
				userId: '4',
				content: 'Night guard completed. Ready for delivery.',
				createdAt: new Date('2024-02-22T16:00:00')
			}
		],
		version: 1
	},
	{
		id: '6',
		patientId: '6',
		specialistId: '5',
		technicianId: '6',
		status: 'delivered',
		description: 'Veneers for front teeth #11-13',
		urgentTag: false,
		createdAt: new Date('2024-02-01T10:30:00'),
		updatedAt: new Date('2024-02-14T15:30:00'),
		approvedAt: new Date('2024-02-02T11:00:00'),
		completedAt: new Date('2024-02-12T17:00:00'),
		deliveredAt: new Date('2024-02-14T15:30:00'),
		dueDate: new Date('2024-02-08T17:00:00'),
		stages: [
			{
				id: '6-1',
				orderId: '6',
				stageId: '1',
				status: 'completed',
				startedAt: new Date('2024-02-02T12:00:00'),
				completedAt: new Date('2024-02-02T17:00:00')
			},
			{
				id: '6-2',
				orderId: '6',
				stageId: '2',
				status: 'completed',
				startedAt: new Date('2024-02-05T09:00:00'),
				completedAt: new Date('2024-02-06T17:00:00')
			},
			{
				id: '6-3',
				orderId: '6',
				stageId: '3',
				status: 'completed',
				startedAt: new Date('2024-02-07T09:00:00'),
				completedAt: new Date('2024-02-07T17:00:00')
			},
			{
				id: '6-4',
				orderId: '6',
				stageId: '4',
				status: 'completed',
				startedAt: new Date('2024-02-08T09:00:00'),
				completedAt: new Date('2024-02-11T17:00:00')
			},
			{
				id: '6-5',
				orderId: '6',
				stageId: '5',
				status: 'completed',
				startedAt: new Date('2024-02-12T09:00:00'),
				completedAt: new Date('2024-02-12T17:00:00')
			}
		],
		notes: [
			{
				id: '6-note-1',
				orderId: '6',
				userId: '5',
				content: 'Porcelain veneers for aesthetic improvement. Color match to adjacent teeth.',
				createdAt: new Date('2024-02-01T10:30:00')
			},
			{
				id: '6-note-2',
				orderId: '6',
				userId: '6',
				content: 'Veneers completed with excellent color match. Quality check passed.',
				createdAt: new Date('2024-02-12T17:00:00')
			},
			{
				id: '6-note-3',
				orderId: '6',
				userId: '2',
				content: 'Veneers delivered to patient. Patient very satisfied with results.',
				createdAt: new Date('2024-02-14T15:30:00')
			}
		],
		version: 1
	}
];