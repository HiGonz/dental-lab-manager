import type { Order, OrderStage } from '../types';

// Default order stages
export const orderStages: OrderStage[] = [
   {
	   id: '1',
	   name: 'Revisión de impresiones',
	   description: 'Revisar y validar las impresiones dentales',
	   order: 1,
	   estimatedDays: 1
   },
   {
	   id: '2',
	   name: 'Creación de modelo',
	   description: 'Crear el modelo dental a partir de las impresiones',
	   order: 2,
	   estimatedDays: 2
   },
   {
	   id: '3',
	   name: 'Diseño y planificación',
	   description: 'Diseñar la prótesis dental',
	   order: 3,
	   estimatedDays: 1
   },
   {
	   id: '4',
	   name: 'Fabricación',
	   description: 'Fabricar la prótesis dental',
	   order: 4,
	   estimatedDays: 2
   },
   {
	   id: '5',
	   name: 'Control de calidad',
	   description: 'Revisión final de calidad y pulido',
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
		description: 'Restauración de corona para molar superior #16',
		urgentTag: false,
		createdAt: new Date('2025-08-31T09:30:00'), // hace 3 días
		updatedAt: new Date('2025-08-31T09:30:00'),
		dueDate: new Date('2025-09-04T17:00:00'), // mañana
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
				   content: 'El paciente presenta corona dañada en molar superior derecho. Requiere reemplazo total de corona.',
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
		description: 'Prótesis parcial para mandíbula inferior',
		urgentTag: true,
		createdAt: new Date('2025-09-01T14:15:00'), // hace 2 días
		updatedAt: new Date('2025-09-02T10:00:00'), // ayer
		approvedAt: new Date('2025-09-02T10:00:00'),
		dueDate: new Date('2025-09-05T17:00:00'), // en 2 días
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
				   content: 'Caso urgente - el paciente necesita la prótesis para evento importante la próxima semana.',
				   createdAt: new Date('2024-02-28T14:15:00')
			   },
			   {
				   id: '2-note-2',
				   orderId: '2',
				   userId: '3',
				   content: 'Aprobado para procesamiento urgente. Priorizar esta orden.',
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
		description: 'Restauración de puente para dientes #14-16',
		urgentTag: false,
		createdAt: new Date('2025-09-02T11:20:00'), // ayer
		updatedAt: new Date('2025-09-03T14:30:00'), // hoy
		approvedAt: new Date('2025-09-03T09:15:00'), // hoy
		dueDate: new Date('2025-09-06T17:00:00'), // en 3 días
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
				   content: 'Reemplazo de puente de tres unidades. Atención especial a la coincidencia de color.',
				   createdAt: new Date('2024-02-25T11:20:00')
			   },
			   {
				   id: '3-note-2',
				   orderId: '3',
				   userId: '6',
				   content: 'Modelo creado exitosamente. Procediendo a la fase de diseño.',
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
		description: 'Corona sobre implante para diente #25',
		urgentTag: false,
		createdAt: new Date('2025-09-03T16:45:00'), // hoy
		updatedAt: new Date('2025-09-03T17:00:00'), // hoy
		rejectedAt: new Date('2025-09-03T17:00:00'),
		dueDate: new Date('2025-09-07T17:00:00'), // en 4 días
		stages: [],
		   notes: [
			   {
				   id: '4-note-1',
				   orderId: '4',
				   userId: '5',
				   content: 'Corona sobre implante en zona premolar.',
				   createdAt: new Date('2024-02-20T16:45:00')
			   },
			   {
				   id: '4-note-2',
				   orderId: '4',
				   userId: '3',
				   content: 'Rechazada - impresiones incompletas. Por favor, tomar nuevas impresiones antes de reenviar.',
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
		description: 'Férula nocturna para bruxismo',
		urgentTag: false,
		createdAt: new Date('2025-09-04T13:00:00'), // mañana
		updatedAt: new Date('2025-09-05T16:00:00'), // en 2 días
		approvedAt: new Date('2025-09-04T09:00:00'), // mañana
		completedAt: new Date('2025-09-05T16:00:00'), // en 2 días
		dueDate: new Date('2025-09-05T17:00:00'), // en 2 días
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
				   content: 'Férula nocturna personalizada para bruxismo severo. Asegurar grosor y comodidad adecuados.',
				   createdAt: new Date('2024-02-15T13:00:00')
			   },
			   {
				   id: '5-note-2',
				   orderId: '5',
				   userId: '4',
				   content: 'Férula nocturna terminada. Lista para entrega.',
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
		description: 'Carillas para dientes anteriores #11-13',
		urgentTag: false,
		createdAt: new Date('2025-09-05T10:30:00'), // en 2 días
		updatedAt: new Date('2025-09-06T15:30:00'), // en 3 días
		approvedAt: new Date('2025-09-05T11:00:00'), // en 2 días
		completedAt: new Date('2025-09-06T17:00:00'), // en 3 días
		deliveredAt: new Date('2025-09-07T15:30:00'), // en 4 días
		dueDate: new Date('2025-09-07T17:00:00'), // en 4 días
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
				   content: 'Carillas de porcelana para mejora estética. Coincidencia de color con dientes adyacentes.',
				   createdAt: new Date('2024-02-01T10:30:00')
			   },
			   {
				   id: '6-note-2',
				   orderId: '6',
				   userId: '6',
				   content: 'Carillas terminadas con excelente coincidencia de color. Control de calidad aprobado.',
				   createdAt: new Date('2024-02-12T17:00:00')
			   },
			   {
				   id: '6-note-3',
				   orderId: '6',
				   userId: '2',
				   content: 'Carillas entregadas al paciente. Muy satisfecho con el resultado.',
				   createdAt: new Date('2024-02-14T15:30:00')
			   }
		   ],
		version: 1
	}
];