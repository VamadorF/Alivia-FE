# Alivia Frontend Architecture

## Overview

This document describes the architecture and design decisions for the Alivia healthcare platform frontend.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React

## Design Principles

### 1. Type Safety
- **No `any` types**: All code uses explicit TypeScript types
- **Strict mode**: TypeScript strict mode enabled
- **Type definitions**: Centralized in `/types` directory
- **Props typing**: All component props are properly typed

### 2. Modularity
- **Component isolation**: Each component has a single responsibility
- **Reusability**: Components designed to be reused across pages
- **Organization**: Components grouped by feature/domain
- **Composition**: Complex UIs built from simple components

### 3. Performance
- **Static generation**: Pages pre-rendered at build time
- **Clean renders**: No heavy computation in render functions
- **Optimized imports**: Tree-shakeable imports
- **Image optimization**: Next.js Image component

### 4. Maintainability
- **Consistent structure**: Clear directory organization
- **Mock data separation**: Data layer separated from UI
- **Code style**: ESLint and Prettier configured
- **Documentation**: README and inline comments

## Directory Structure

```
/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── layout/            # Layout components
│   ├── services/          # Service-related components
│   ├── appointments/      # Appointment components
│   └── stats/             # Statistics components
├── data/                  # Mock data for development
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Component Architecture

### Base UI Components (`/components/ui`)
Foundational components from shadcn/ui:
- **Button**: Versatile button with multiple variants
- **Card**: Container component with sections
- **Badge**: Status and label indicators

### Layout Components (`/components/layout`)
Shared layout elements:
- **Header**: Navigation and authentication
- **Footer**: Site-wide footer

### Feature Components
Domain-specific components:
- **ServiceCard**: Display medical service information
- **AppointmentCard**: Show appointment details
- **StatCard**: Display statistics and metrics

## Data Flow

```
Mock Data (data/) → TypeScript Types (types/) → Components → Pages
```

1. **Mock Data**: Static data defined in `/data` directory
2. **Types**: Strongly typed interfaces in `/types`
3. **Components**: Consume typed data via props
4. **Pages**: Compose components with data

## Styling System

### Theme Colors
- **Primary**: Sky (400-600)
- **Secondary**: Indigo (400-600)
- **Accents**: Sky/Indigo gradients
- **Neutrals**: Slate scale

### Design Tokens
- **Rounded borders**: 0.75rem (rounded-xl)
- **Shadows**: Layered shadows for depth
- **Spacing**: Tailwind default scale
- **Typography**: System font stack

### Component Styling
- **Utility-first**: Tailwind CSS classes
- **Variants**: Class Variance Authority for component variants
- **Composition**: `cn()` utility for class merging
- **Responsive**: Mobile-first breakpoints

## Type System

### Core Types

```typescript
// Service types
interface MedicalService {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  category: ServiceCategory;
  available: boolean;
  badge?: ServiceBadge;
}

// Appointment types
interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}
```

### Type Safety Benefits
- **Compile-time errors**: Catch issues before runtime
- **IntelliSense**: Better developer experience
- **Refactoring safety**: Easier to maintain and modify
- **Self-documenting**: Types serve as documentation

## Best Practices

### Component Development
1. **Single Responsibility**: Each component does one thing well
2. **Props Interface**: Define clear prop interfaces
3. **Default Props**: Provide sensible defaults
4. **Error Boundaries**: Handle errors gracefully (future)
5. **Accessibility**: Semantic HTML and ARIA attributes

### State Management
- **Local State**: React useState for component state
- **Props**: Pass data down component tree
- **No Global State**: Keep state local (for now)
- **Future**: Consider Zustand or Context for shared state

### Performance Optimization
1. **Static Generation**: Pre-render at build time
2. **Code Splitting**: Automatic with Next.js
3. **Image Optimization**: Use Next.js Image
4. **Bundle Size**: Monitor with `npm run build`

### Code Quality
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier for consistent style
- **Type Checking**: TypeScript strict mode
- **Testing**: Future - add Jest/React Testing Library

## Future Enhancements

### Short Term
- [ ] Add more pages (doctors, contact, profile)
- [ ] Implement form components
- [ ] Add loading states
- [ ] Create error pages

### Medium Term
- [ ] Connect to backend API
- [ ] Add authentication flow
- [ ] Implement appointment booking
- [ ] Add user dashboard

### Long Term
- [ ] Real-time notifications
- [ ] Video consultation integration
- [ ] Mobile app (React Native)
- [ ] Offline support (PWA)

## Development Workflow

1. **Start Dev Server**: `npm run dev`
2. **Make Changes**: Edit files in `/app` or `/components`
3. **Check Types**: TypeScript checks automatically
4. **Lint Code**: `npm run lint`
5. **Build**: `npm run build`
6. **Test Build**: `npm run start`

## Deployment

The application is optimized for deployment on:
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **CloudFlare Pages**: Edge deployment
- **Any Node.js host**: Self-hosted option

## Security Considerations

- **No sensitive data**: All data is mock/static
- **XSS Protection**: React escapes by default
- **HTTPS**: Required in production
- **CSP**: Configure Content Security Policy
- **Dependencies**: Regular security audits

## Performance Metrics

Target metrics:
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90
- **Bundle Size**: < 200KB (initial)

## Contributing Guidelines

1. Follow TypeScript strict mode
2. Use functional components
3. Implement proper prop typing
4. Add comments for complex logic
5. Keep components under 200 lines
6. Write meaningful commit messages

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
