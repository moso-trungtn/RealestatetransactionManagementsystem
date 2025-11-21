# Project Structure

This document describes the organization of the source code for the Real Estate Transaction Management System.

## Directory Structure

```
src/
├── assets/                    # Static assets like fonts and images
│   ├── fonts/                # Font files
│   └── images/               # Image files
├── components/               # Reusable UI components
│   ├── Form/                # Form-related components
│   │   ├── SelectInput.tsx  # Select dropdown component
│   │   └── TextInput.tsx    # Text input component
│   ├── Table/               # Table components
│   └── third-party/         # Third-party component integrations
├── hooks/                    # Custom React hooks
│   └── useLocalStorage.ts   # Hook for localStorage management
├── layout/                   # Layout components for page structure
│   └── Dashboard/           # Dashboard layout
│       ├── footer/          # Footer component
│       │   └── Footer.tsx
│       ├── Header/          # Header component
│       └── NavBar/          # Navigation bar components
│           └── Non-LoginNavBar.tsx   # Public navigation bar
├── pages/                    # Page components
│   └── HomePage.tsx         # Landing/Home page component
├── routes/                   # Routing configuration
│   ├── index.tsx            # Route definitions
│   └── MainRoutes.tsx       # Main route configuration
└── utils/                    # Utility functions and helpers
    ├── formatters.ts        # Formatting utilities (currency, dates, etc.)
    └── validators.ts        # Validation utilities (email, phone, etc.)
```

## Component Organization

### `/src/components/Form/`
Reusable form input components with consistent styling and behavior:
- `TextInput.tsx` - Text input with label and validation
- `SelectInput.tsx` - Select dropdown with label and validation

### `/src/layout/Dashboard/`
Layout components used across the application:
- `NavBar/Non-LoginNavBar.tsx` - Navigation bar for non-authenticated users with language selector
- `footer/Footer.tsx` - Application footer with links and branding

### `/src/pages/`
Top-level page components:
- `HomePage.tsx` - Landing page with features, CTA, and navigation

### `/src/hooks/`
Custom React hooks for shared functionality:
- `useLocalStorage.ts` - Hook for persisting state to localStorage

### `/src/utils/`
Utility functions and helpers:
- `formatters.ts` - Functions for formatting currency, dates, and text
- `validators.ts` - Functions for validating user input

## Usage Examples

### Using Form Components
```tsx
import { TextInput } from './src/components/Form/TextInput';
import { SelectInput } from './src/components/Form/SelectInput';

function MyForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  
  return (
    <>
      <TextInput
        id="name"
        label="Name"
        value={name}
        onChange={setName}
        required
      />
      <SelectInput
        id="type"
        label="Type"
        value={type}
        onChange={setType}
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]}
      />
    </>
  );
}
```

### Using Layout Components
```tsx
import { NonLoginNavBar } from './src/layout/Dashboard/NavBar/Non-LoginNavBar';
import { Footer } from './src/layout/Dashboard/footer/Footer';

function MyPage() {
  return (
    <div>
      <NonLoginNavBar onLoginClick={() => console.log('Login clicked')} />
      {/* Page content */}
      <Footer />
    </div>
  );
}
```

### Using Utilities
```tsx
import { formatCurrency, formatDate } from './src/utils/formatters';
import { isValidEmail } from './src/utils/validators';

const price = formatCurrency(250000); // "$250,000"
const date = formatDate('2025-01-15'); // "Jan 15, 2025"
const valid = isValidEmail('user@example.com'); // true
```

### Using Hooks
```tsx
import { useLocalStorage } from './src/hooks/useLocalStorage';

function MyComponent() {
  const [user, setUser] = useLocalStorage('user', null);
  
  // State persists to localStorage automatically
  return <div>Welcome {user?.name}</div>;
}
```

## Design Principles

1. **Separation of Concerns** - Each directory has a specific purpose
2. **Reusability** - Components are designed to be reused across the application
3. **Type Safety** - All components use TypeScript for type safety
4. **Consistency** - Shared utilities ensure consistent behavior across the app
5. **Maintainability** - Clear structure makes it easy to find and update code
