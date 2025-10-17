# Client Architecture

This document outlines the architecture of the Next.js client application, following the principles outlined in the main README.md.

## Architecture Principles

- **SOLID Principles**: Guide our code structure and development practices
- **Modular Structure**: Resource-based pattern inspired by NestJS
- **Shared Code**: Common functionality placed in `shared` folder
- **Naming Convention**: All files and folders use dash-case (e.g., `user-profile`)

## Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── favicon.ico              # App favicon
│   ├── about/                   # About page (/about)
│   │   └── page.tsx             # About page component
│   └── user-profile/            # User Profile page (/user-profile)
│       ├── page.tsx             # User Profile page component
│       ├── components/          # User-specific components
│       │   ├── user-form.tsx    # User registration form
│       │   └── user-list.tsx    # User list display
│       ├── hooks/               # User-specific hooks
│       ├── services/            # User-specific services
│       ├── types/               # User-specific types
│       └── index.ts             # User Profile module exports
└── shared/                      # Shared functionality
    ├── components/              # Shared components
    │   └── providers.tsx        # TanStack Query provider
    ├── hooks/                   # Shared custom hooks
    │   └── use-users.ts         # Users data fetching hook
    ├── services/                # API services
    │   └── user-service.ts      # User API functions
    ├── types/                   # TypeScript type definitions
    │   └── user.ts              # User types and Zod schemas
    ├── utils/                   # Utility functions
    │   └── bootstrap-client.tsx # Bootstrap JS loader
    └── index.ts                 # Shared module exports
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

## Page Structure & Routing

### Next.js App Router Pages

When adding new pages, follow this structure:

```
app/
├── page.tsx                     # Home page (/)
├── about/                       # About page (/about)
│   ├── page.tsx                 # Main page component
│   ├── loading.tsx              # Loading UI (optional)
│   ├── error.tsx                # Error boundary (optional)
│   └── not-found.tsx            # 404 page (optional)
├── products/                    # Products section (/products)
│   ├── page.tsx                 # Products listing
│   ├── [id]/                    # Dynamic route (/products/[id])
│   │   ├── page.tsx             # Product detail page
│   │   └── loading.tsx          # Product loading UI
│   └── create/                   # Nested route (/products/create)
│       └── page.tsx             # Create product page
└── api/                         # API routes (if needed)
    └── users/
        └── route.ts             # API endpoint
```

### Page Component Structure

Each page should follow this pattern:

```typescript
// app/products/page.tsx
"use client";

import { ProductList, ProductFilters } from "../../product-catalog";
import { useProducts } from "../../shared";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="container mt-4">
      <h1>Products</h1>
      <ProductFilters />
      <ProductList products={products} isLoading={isLoading} error={error} />
    </div>
  );
}
```

### Special Page Files

- **`loading.tsx`**: Shows loading UI while page loads
- **`error.tsx`**: Error boundary for the route segment
- **`not-found.tsx`**: 404 page for the route segment
- **`layout.tsx`**: Layout wrapper for the route segment

### Dynamic Routes

For dynamic routes, use square brackets:

```
app/
├── products/
│   └── [id]/
│       ├── page.tsx             # /products/123
│       └── edit/
│           └── page.tsx         # /products/123/edit
```

## Usage Examples

### Adding a New Page with Resource Module

1. Create a new folder in `app/` (e.g., `app/product-catalog/`)
2. Add `page.tsx` as the main page component
3. Add subfolders: `components/`, `hooks/`, `services/`, `types/`
4. Create an `index.ts` file for exports
5. Follow the same pattern as `app/user-profile/`

### Adding a New Page

1. Create a new folder in `app/` (e.g., `app/products/`)
2. Add `page.tsx` as the main component
3. Optionally add `loading.tsx`, `error.tsx`, `not-found.tsx`
4. Import components from appropriate resource modules
5. Use shared hooks and services for data fetching

Example:

```typescript
// app/products/page.tsx
"use client";

import { ProductList } from "../../product-catalog";
import { useProducts } from "../../shared";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="container mt-4">
      <h1>Products</h1>
      <ProductList products={products} isLoading={isLoading} error={error} />
    </div>
  );
}
```

### Using Shared Functionality

```typescript
// Import from shared module
import { UserFormData, useUsers } from "../shared";
import { UserForm, UserList } from "../user-profile";
```

### Creating New Components

- Place in appropriate resource module
- Use dash-case naming
- Export from module index file
- Follow TypeScript best practices

## Benefits

1. **Scalability**: Easy to add new features and resources
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Shared code reduces duplication
4. **Type Safety**: Full TypeScript support throughout
5. **Consistency**: Uniform structure across all modules
