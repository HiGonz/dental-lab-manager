import type { User } from '../types';

export const demoUsers: User[] = [
	{
		id: '1',
		username: 'especialista1',
		name: 'Dr. María González',
		role: 'specialist',
		email: 'maria.gonzalez@dentallabmanager.com',
		createdAt: new Date('2024-01-15')
	},
	{
		id: '2',
		username: 'recepcionista1',
		name: 'Ana Martínez',
		role: 'receptionist',
		email: 'ana.martinez@dentallabmanager.com',
		createdAt: new Date('2024-01-20')
	},
	{
		id: '3',
		username: 'gerente1',
		name: 'Carlos Rodriguez',
		role: 'manager',
		email: 'carlos.rodriguez@dentallabmanager.com',
		createdAt: new Date('2024-01-10')
	},
	{
		id: '4',
		username: 'tecnico1',
		name: 'Luis Fernández',
		role: 'technician',
		email: 'luis.fernandez@dentallabmanager.com',
		createdAt: new Date('2024-01-25')
	},
	{
		id: '5',
		username: 'especialista2',
		name: 'Dr. Carmen López',
		role: 'specialist',
		email: 'carmen.lopez@dentallabmanager.com',
		createdAt: new Date('2024-02-01')
	},
	{
		id: '6',
		username: 'tecnico2',
		name: 'Roberto Silva',
		role: 'technician',
		email: 'roberto.silva@dentallabmanager.com',
		createdAt: new Date('2024-02-05')
	}
];