# Dental Lab Manager

A comprehensive web application for managing dental laboratory orders, built with SvelteKit and TailwindCSS. This system provides a complete workflow for dental order management from initial consultation to final delivery.

## 🚀 Features

### 📋 Order Management
- **Kanban Board**: Visual workflow with drag-and-drop order status management
- **Order Tracking**: Complete order lifecycle from creation to delivery
- **Status Management**: Six workflow stages (Pending → Approved → In Progress → Completed → Delivered → Rejected)
- **Progress Monitoring**: Real-time progress bars for orders in production
- **Search & Filtering**: Advanced filtering by status, urgency, and overdue orders

### 👥 User Roles & Permissions
- **Specialist**: Create orders, view patient information
- **Receptionist**: Manage orders and patients, schedule appointments
- **Branch Manager**: Approve/reject orders, view KPIs and analytics
- **Lab Technician**: Manage production stages, update order progress

### 🎯 Core Functionality
- **Patient Management**: Comprehensive patient profiles and history
- **Role-Based Access**: Dynamic navigation and permissions based on user role
- **Real-Time Updates**: Live order status tracking and notifications
- **Responsive Design**: Mobile-friendly interface with professional styling
- **Data Validation**: Type-safe operations with comprehensive error handling

## 🛠️ Technology Stack

- **Framework**: SvelteKit with TypeScript
- **Styling**: TailwindCSS with custom design system
- **State Management**: Svelte stores for reactive data handling
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Heroicons for consistent iconography

## 📱 Screenshots

### Login Interface
![Login Page](https://github.com/user-attachments/assets/2b5a9b41-25b3-410d-9738-658378d068d2)

### Dashboard Overview
![Specialist Dashboard](https://github.com/user-attachments/assets/869b2153-dd54-4ebe-b5b3-7e407d49adea)

### Kanban Order Management
![Kanban Board](https://github.com/user-attachments/assets/6a9b71de-05f8-4a11-9b1c-ee36ab81c886)

## 🏃 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HiGonz/dental-lab-manager.git
   cd dental-lab-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Access

The application includes demo users for testing all functionality:

| Username | Password | Role | Name |
|----------|----------|------|------|
| `especialista1` | `demo123` | Specialist | Dr. María González |
| `recepcionista1` | `demo123` | Receptionist | Ana Martínez |
| `gerente1` | `demo123` | Branch Manager | Carlos Rodriguez |
| `tecnico1` | `demo123` | Lab Technician | Luis Fernández |

## 🏗️ Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable UI components
│   │   ├── KanbanBoard.svelte
│   │   ├── OrderCard.svelte
│   │   └── Navigation.svelte
│   ├── data/               # Demo data
│   │   ├── demo-users.ts
│   │   ├── demo-patients.ts
│   │   └── demo-orders.ts
│   ├── types.ts            # TypeScript interfaces
│   ├── stores.ts           # Svelte stores
│   ├── api.ts              # API layer
│   └── utils.ts            # Utility functions
├── routes/                 # SvelteKit routes
│   ├── +layout.svelte      # Main layout
│   ├── +page.svelte        # Home page
│   ├── login/              # Authentication
│   ├── dashboard/          # Dashboard
│   ├── orders/             # Order management
│   ├── patients/           # Patient management
│   ├── calendar/           # Calendar view
│   ├── kpis/              # Analytics
│   └── settings/          # User settings
├── app.html               # HTML template
└── app.css               # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0ea5e9) - Actions and links
- **Secondary**: Gray (#64748b) - Text and borders
- **Success**: Green (#22c55e) - Completed states
- **Warning**: Amber (#f59e0b) - Pending/urgent states
- **Danger**: Red (#ef4444) - Errors and overdue items

### Components
- **Cards**: Consistent styling with shadows and borders
- **Buttons**: Multiple variants (primary, secondary, success, warning, danger)
- **Badges**: Status indicators with semantic colors
- **Forms**: Clean input styling with focus states

## 📊 Order Workflow

1. **Creation**: Specialist or Receptionist creates new order
2. **Review**: Branch Manager reviews and approves/rejects order
3. **Production**: Lab Technician manages production stages
4. **Completion**: Order marked as completed after quality check
5. **Delivery**: Order delivered to patient and marked as delivered

### Order Stages
- **Impression Review**: Validate dental impressions (1 day)
- **Model Creation**: Create dental model (2 days)
- **Design & Planning**: Design prosthetic (1 day)
- **Manufacturing**: Manufacture prosthetic (2 days)
- **Quality Control**: Final quality check (1 day)

## 🔐 Security & Access Control

### Role-Based Permissions
- **Order Creation**: Specialists and Receptionists
- **Order Approval**: Branch Managers only
- **Production Management**: Lab Technicians only
- **Patient Management**: Receptionists and Managers
- **KPI Access**: Managers and Technicians

### Session Management
- Persistent login with localStorage
- Automatic logout on role changes
- Route protection based on authentication state

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Quality Assurance
npm run check        # Type checking
npm run check:watch  # Watch mode type checking
```

## 🗃️ Data Models

### Order
```typescript
interface Order {
  id: string;
  patientId: string;
  specialistId: string;
  technicianId?: string;
  status: OrderStatus;
  description: string;
  urgentTag: boolean;
  dueDate: Date;
  stages: OrderStageProgress[];
  notes: OrderNote[];
  version: number;
}
```

### Patient
```typescript
interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  createdAt: Date;
}
```

### User
```typescript
interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
  createdAt: Date;
}
```

## 🎯 Future Enhancements

### Phase 5-8 (Future Development)
- **Real-time Notifications**: WebSocket integration for live updates
- **Advanced KPIs**: Detailed analytics and reporting dashboard
- **Calendar Integration**: Interactive calendar with appointment scheduling
- **File Management**: Document and image upload for orders
- **Print System**: Generate reports and order documentation
- **API Integration**: Connect to external dental lab systems
- **Mobile App**: Native mobile application for field access

### Planned Features
- [ ] Drag-and-drop order status updates
- [ ] Advanced filtering and search
- [ ] Automated email notifications
- [ ] PDF report generation
- [ ] Inventory management
- [ ] Billing integration
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Development Team

- **Frontend Architecture**: SvelteKit + TailwindCSS
- **UI/UX Design**: Modern, responsive, professional interface
- **Data Management**: TypeScript with comprehensive type safety
- **Demo Implementation**: Realistic sample data for testing

## 📞 Support

For support and questions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation in the `/docs` folder

---

**Dental Lab Manager** - Streamlining dental laboratory operations with modern web technology.