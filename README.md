# Vans Healthcare Frontend

A modern role-based Healthcare Management System frontend built with React, TypeScript, Vite, Tailwind CSS, Zustand, React Router, and Axios.

The platform provides public onboarding pages plus protected dashboards for Patients, Doctors, and Hospital Administrators.

---

## Project Overview

Vans Healthcare is a web-based healthcare platform designed to support:

- Patient management
- Doctor management
- Appointment scheduling
- Medical records management
- Billing and payments
- Reports and analytics
- Notifications and alerts
- Role-based access control

---

## User Roles

### Patient

- Book and manage appointments
- View medical records
- Access prescriptions and reports
- Manage profile and settings
- View billing information

### Doctor

- Manage appointments
- View patient history
- Create prescriptions
- Add consultation notes
- Manage availability and schedules

### Hospital Admin

- Manage doctors and patients
- Monitor appointments
- Manage billing operations
- Generate reports and analytics
- Manage users, permissions, and system settings

---

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Zustand
- Axios
- Tailwind CSS
- shadcn-style UI components
- Radix UI
- Lucide React icons
- TanStack Query installed for future data fetching workflows
- React Hook Form and Zod installed for future form validation workflows

---

## Project Structure

```plaintext
src/
|-- assets/
|-- components/
|   |-- common/
|   |-- ui/
|-- config/
|-- features/
|   |-- admin/
|   |-- auth/
|   |   |-- components/
|   |   |-- hooks/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- types/
|   |-- doctor/
|   |-- patient/
|-- layouts/
|-- lib/
|-- pages/
|-- routes/
|-- store/
|-- types/
|-- App.tsx
|-- main.tsx
|-- index.css
```

---

## Available Routes

### Public Routes

```plaintext
/
/login
/register
/forgot-password
/reset-password
```

### Protected Routes

```plaintext
/admin/dashboard
/doctor/dashboard
/patient/dashboard
```

Protected routes are guarded by role-based route components. Authenticated users are redirected to the dashboard that matches their role.

---

## Current Features

### Completed

- React + TypeScript + Vite setup
- Tailwind CSS theme setup
- Public homepage
- Login page UI
- Registration page UI
- Forgot password page UI
- Reset password page UI
- Axios API client
- Zustand auth store
- Session restore from local storage
- Role-based route guarding
- Dashboard route placeholders for Admin, Doctor, and Patient
- Shared UI components

### In Progress

- Dashboard UI development
- Backend integration for registration and login
- Password recovery backend integration
- Role-specific portal workflows

### Planned

- Appointment management
- Medical records
- Billing and payments
- Notifications
- Reports and analytics
- Form validation with React Hook Form and Zod
- Data fetching workflows with TanStack Query
- Testing and optimization

---

## API Configuration

The Axios client is configured in:

```plaintext
src/config/axios.ts
```

Current API base URL:

```plaintext
https://ehrbackend-production-de58.up.railway.app/api
```

Recommended future improvement: move the API base URL into an environment variable such as:

```plaintext
VITE_API_BASE_URL=
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd vans-healthcare-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Preview production build:

```bash
npm run preview
```

On Windows PowerShell, if `npm` script execution is blocked, use:

```bash
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

---

## Development Roadmap

### Phase 1

- Project setup
- Routing
- Layout architecture

### Phase 2

- Authentication
- Role-based access control
- Public auth pages

### Phase 3

- Dashboard development
- Shared dashboard layouts

### Phase 4

- Appointment management
- Patient management

### Phase 5

- Medical records
- Billing and payments

### Phase 6

- Reports and analytics

### Phase 7

- Optimization
- Testing
- Deployment

---

## Notes

- Forgot password and reset password screens currently provide UI flow placeholders. Backend recovery endpoints still need to be connected.
- Layout files exist under `src/layouts/`, but the current route tree renders dashboard pages directly. These layouts can be connected later through nested routes.
- Starter assets such as `react.svg` and `vite.svg` can be removed if they remain unused.

---

## Team Guidelines

- Follow TypeScript best practices.
- Keep components modular and reusable.
- Prefer feature-based organization for domain code.
- Keep shared UI primitives under `src/components/ui`.
- Keep shared application state under `src/store`.
- Keep API clients and configuration under `src/config` or feature-specific `services`.
- Use role-based access architecture for protected pages.
- Run build and lint checks before merging changes.

---

## License

Internal Project - Vans Healthcare

(c) 2026 Vans Healthcare. All rights reserved.
