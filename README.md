# Vans Healthcare Frontend

A modern role-based Healthcare Management System built using React, TypeScript, and Vite. The platform provides dedicated portals for Patients, Doctors, and Hospital Administrators to streamline healthcare operations and improve user experience.

---

## Project Overview

Vans Healthcare is a web-based healthcare platform designed to provide:

* Patient Management
* Doctor Management
* Appointment Scheduling
* Medical Records Management
* Billing & Payments
* Reports & Analytics
* Notifications & Alerts
* Role-Based Access Control (RBAC)

---

## User Roles

### Patient

* Book and manage appointments
* View medical records
* Access prescriptions and reports
* Manage profile and settings
* View billing information

### Doctor

* Manage appointments
* View patient history
* Create prescriptions
* Add consultation notes
* Manage availability and schedules

### Hospital Admin

* Manage doctors and patients
* Monitor appointments
* Manage billing operations
* Generate reports and analytics
* Manage users, permissions, and system settings

---

## Tech Stack

### Frontend Framework

* React 19

### Language

* TypeScript

### Build Tool

* Vite

### Routing

* React Router DOM

### State Management

* Zustand

### API Communication

* Axios

### Data Fetching & Caching

* TanStack Query (Planned)

### Form Handling

* React Hook Form (Planned)

### Validation

* Zod (Planned)

### UI Framework

* Tailwind CSS (Planned)

### Charts & Analytics

* Recharts (Planned)

---

## Project Structure

```plaintext
src/
│
├── assets/
├── components/
├── layouts/
├── features/
├── routes/
├── config/
├── services/
├── store/
├── hooks/
├── utils/
├── types/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Current Features

### Completed

* Project Setup (React + TypeScript + Vite)
* Folder Structure
* Routing Configuration
* Role-Based Layout Architecture
* Navbar Component
* Sidebar Component
* Patient Layout
* Doctor Layout
* Admin Layout
* Dashboard Routing

### In Progress

* Dashboard UI Development
* Navigation Components
* Authentication System
* Role-Based Access Control

### Planned

* Appointment Management
* Medical Records
* Billing & Payments
* Notifications
* Reports & Analytics
* API Integration
* Responsive Design
* Testing & Optimization

---

## Available Routes

### Public Routes

```plaintext
/login
```

### Patient Routes

```plaintext
/patient/dashboard
```

### Doctor Routes

```plaintext
/doctor/dashboard
```

### Admin Routes

```plaintext
/admin/dashboard
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to project directory:

```bash
cd vans-healthcare-frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Development Roadmap

### Phase 1

* Project Setup
* Routing
* Layout Architecture

### Phase 2

* Authentication
* Role-Based Access Control

### Phase 3

* Dashboard Development

### Phase 4

* Appointment Management
* Patient Management

### Phase 5

* Medical Records
* Billing & Payments

### Phase 6

* Reports & Analytics

### Phase 7

* Optimization & Deployment

---

## Team Guidelines

* Follow TypeScript best practices.
* Use reusable components whenever possible.
* Maintain consistent folder structure.
* Keep components modular and scalable.
* Follow role-based access architecture.
* Use Git feature branches for development.

---

## License

Internal Project – Vans Healthcare
© 2026 Vans Healthcare. All Rights Reserved.
