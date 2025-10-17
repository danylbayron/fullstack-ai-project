# Home Page Features

This document outlines the features implemented for the home page following SOLID principles and utilizing TanStack Query and Zod.

## Features Implemented

### 1. Article List Display

- **Component**: `ArticleList`
- **Responsibility**: Display list of articles with loading states and error handling
- **Features**:
  - Responsive card layout
  - Article metadata (title, description, author, date)
  - Tag display
  - Favorite count display
  - Loading skeleton animation
  - Error state handling

### 2. Tag Filtering

- **Component**: `TagList`
- **Responsibility**: Display and handle tag selection
- **Features**:
  - Popular tags display
  - Tag selection with visual feedback
  - Clear filter functionality
  - Show more/less tags toggle
  - Loading and error states

### 3. Pagination

- **Component**: `Pagination`
- **Responsibility**: Handle pagination navigation
- **Features**:
  - Smart page number display
  - Previous/Next navigation
  - Current page highlighting
  - Items count display
  - Disabled states during loading

### 4. Feed Tabs

- **Component**: `FeedTabs`
- **Responsibility**: Handle feed type selection
- **Features**:
  - Global Feed tab
  - Your Feed tab (requires authentication)
  - Visual feedback for active tab
  - Disabled state for unauthenticated users

### 5. Data Management

- **Hooks**: `useArticles`, `useTags`, `useGlobalArticles`, `useFeedArticles`, `useArticlesByTag`
- **Service**: `ArticleService`
- **Types**: Full TypeScript support with Zod validation
- **Features**:
  - TanStack Query for data fetching
  - Automatic caching and background updates
  - Error handling and retry logic
  - Optimistic updates support

## Architecture Principles Applied

### SOLID Principles

1. **Single Responsibility Principle (SRP)**

   - Each component has a single, well-defined responsibility
   - `ArticleList` only handles article display
   - `TagList` only handles tag selection
   - `Pagination` only handles pagination logic

2. **Open/Closed Principle (OCP)**

   - Components are open for extension but closed for modification
   - New feed types can be added without changing existing code
   - New article display formats can be added via props

3. **Liskov Substitution Principle (LSP)**

   - All components can be substituted with their interfaces
   - Consistent prop interfaces across similar components

4. **Interface Segregation Principle (ISP)**

   - Components only depend on the interfaces they use
   - Separate interfaces for different concerns (display, interaction, data)

5. **Dependency Inversion Principle (DIP)**
   - Components depend on abstractions (hooks, services) not concretions
   - Service layer abstracts API calls
   - Hooks abstract data fetching logic

## Technology Stack

- **Next.js 15** with App Router
- **React 19** with hooks
- **TypeScript** for type safety
- **TanStack Query** for data fetching and caching
- **Zod** for schema validation
- **Bootstrap 5** for responsive UI
- **React Hook Form** (ready for forms)

## API Integration

The home page integrates with the RealWorld API:

- **Base URL**: `https://api.realworld.io/api`
- **Endpoints**:
  - `GET /articles` - Global articles
  - `GET /articles/feed` - User feed (requires auth)
  - `GET /articles?tag={tag}` - Articles by tag
  - `GET /tags` - Available tags

## State Management

- **Local State**: Component-level state for UI interactions
- **Server State**: TanStack Query for API data
- **URL State**: Ready for URL-based state management
- **Global State**: Ready for authentication state

## Performance Optimizations

- **Query Caching**: TanStack Query provides intelligent caching
- **Background Updates**: Automatic data freshness
- **Loading States**: Skeleton loading for better UX
- **Error Boundaries**: Graceful error handling
- **Memoization**: Optimized re-renders

## Future Enhancements

- Authentication integration
- Real-time updates
- Infinite scrolling
- Search functionality
- Article favoriting
- User profiles
- Comments system
