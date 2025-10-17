# Client Architecture

This document outlines the architecture of the Next.js client application, following the principles outlined in the main README.md.

## Architecture Principles

- **SOLID Principles**: Guide our code structure and development practices
- **Modular Structure**: Resource-based pattern inspired by NestJS
- **Shared Code**: Common functionality placed in `shared` folder
- **Naming Convention**: All files and folders use dash-case (e.g., `user-profile`)

## Folder Structure

```
.
└── src/
    ├── app/
    │   ├── layout.tsx                # Main layout for all pages
    │   ├── page.tsx                  # Root home page
    │   ├── globals.css               # Global styles
    │   ├── favicon.ico
    │   └── [resource]/               # Example resource module (replace with actual resource name)
    │       ├── page.tsx              # Resource page
    │       ├── components/           # Components specific to this resource
    │       │   ├── [feature]-form.tsx
    │       │   └── [feature]-list.tsx
    │       ├── hooks/                # Resource-specific hooks
    │       │   └── use-[feature].tsx
    │       ├── services/             # Resource-specific services (API/data logic)
    │       │   └── [resource]-service.ts
    │       └── types/                # Resource-specific types/interfaces
    │           └── [resource].ts
    └── shared/
        ├── components/               # Shared, reusable components
        ├── hooks/                    # Shared React hooks
        ├── services/                 # Shared service logic/APIs
        ├── types/                    # Common types and interfaces
        └── utils/                    # Utility functions
```

## Key Features

### 1. Page-Based Resource Architecture

- Each page contains its own resource module within the `app/` directory
- Page-specific components, hooks, services, and types are co-located with the page
- Follows Next.js App Router conventions while maintaining modular structure

### 2. Shared Functionality

- Common code lives in the `shared` folder
- Reusable across different resources
- Includes providers, utilities, and common types

### 3. Clean Imports

- Module index files provide clean exports
- Import from module root instead of deep paths
- Example: `import { UserForm, UserList } from "../user-profile"`

### 4. Technology Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Bootstrap 5** for styling
- **React Hook Form** for form handling
- **TanStack Query** for data fetching
- **Zod** for schema validation
