import type { Patient } from '../types';

export const demoPatients: Patient[] = [
	{
		id: '1',
		name: 'Juan Pérez',
		email: 'juan.perez@email.com',
		phone: '+34 666 111 222',
		dateOfBirth: new Date('1985-05-15'),
		createdAt: new Date('2024-01-20')
	},
	{
		id: '2',
		name: 'María García',
		email: 'maria.garcia@email.com',
		phone: '+34 666 333 444',
		dateOfBirth: new Date('1992-08-22'),
		createdAt: new Date('2024-01-25')
	},
	{
		id: '3',
		name: 'Pedro Sánchez',
		email: 'pedro.sanchez@email.com',
		phone: '+34 666 555 666',
		dateOfBirth: new Date('1978-12-03'),
		createdAt: new Date('2024-02-01')
	},
	{
		id: '4',
		name: 'Laura Martín',
		email: 'laura.martin@email.com',
		phone: '+34 666 777 888',
		dateOfBirth: new Date('1990-03-17'),
		createdAt: new Date('2024-02-05')
	},
	{
		id: '5',
		name: 'Carlos Ruiz',
		email: 'carlos.ruiz@email.com',
		phone: '+34 666 999 000',
		dateOfBirth: new Date('1987-09-28'),
		createdAt: new Date('2024-02-10')
	},
	{
		id: '6',
		name: 'Ana Torres',
		email: 'ana.torres@email.com',
		phone: '+34 666 111 333',
		dateOfBirth: new Date('1983-06-12'),
		createdAt: new Date('2024-02-15')
	},
	{
		id: '7',
		name: 'Miguel Fernández',
		email: 'miguel.fernandez@email.com',
		phone: '+34 666 222 444',
		dateOfBirth: new Date('1995-11-08'),
		createdAt: new Date('2024-02-20')
	},
	{
		id: '8',
		name: 'Elena Jiménez',
		email: 'elena.jimenez@email.com',
		phone: '+34 666 333 555',
		dateOfBirth: new Date('1980-04-25'),
		createdAt: new Date('2024-02-25')
	}
];