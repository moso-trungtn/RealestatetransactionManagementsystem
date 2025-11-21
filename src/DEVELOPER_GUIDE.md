# Developer Guide - Real Estate Transaction Management System

## Quick Start

### Understanding the Project
This is a Real Estate Transaction Management admin system with:
- **Dynamic theming** (configurable primary color)
- **Component-based architecture** (React + TypeScript)
- **Organized structure** (features in `/src/components`)
- **Modern UI** (shadcn/ui + Tailwind CSS)

### Key Files to Know
- `/App.tsx` - Main application entry
- `/src/pages/` - Page components (HomePage, TransactionsDashboard, etc.)
- `/src/components/` - Organized reusable components
- `/contexts/WebsiteConfigContext.tsx` - Theme configuration
- `/PROJECT_STRUCTURE.md` - Full structure documentation

---

## Creating a New Component

### Step 1: Choose the Right Location

```
/src/components/
├── homepage/      → Landing page components
├── transaction/   → Transaction-related
├── forms/         → Form inputs
├── dashboard/     → Dashboard-specific
├── profile/       → User profile
├── common/        → Shared components
└── tables/        → Table components
```

### Step 2: Create the Component

```tsx
// /src/components/homepage/ExampleCard.tsx

import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';
import { LucideIcon } from 'lucide-react';

interface ExampleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export function ExampleCard({ 
  icon: Icon, 
  title, 
  description,
  onClick 
}: ExampleCardProps) {
  const { config } = useWebsiteConfig();

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Icon with themed background */}
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{ 
          backgroundColor: `${config.primaryColor}1A` // 10% opacity
        }}
      >
        <Icon 
          className="w-6 h-6" 
          style={{ color: config.primaryColor }}
        />
      </div>

      {/* Content */}
      <h3 className="text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
}
```

### Step 3: Export from Index

```tsx
// /src/components/homepage/index.ts

export { ExampleCard } from './ExampleCard';
export { FeatureCard } from './FeatureCard';
// ... other exports
```

### Step 4: Use in Parent Component

```tsx
// /src/pages/HomePage.tsx

import { ExampleCard } from '../components/homepage';
import { FileText } from 'lucide-react';

export function HomePage() {
  return (
    <div>
      <ExampleCard
        icon={FileText}
        title="My Feature"
        description="Feature description here"
        onClick={() => console.log('Clicked!')}
      />
    </div>
  );
}
```

---

## Working with Theme Colors

### Get Theme Configuration

```tsx
import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';

const { config } = useWebsiteConfig();
// config.primaryColor → "#FF6B35" (or user's custom color)
// config.companyLogo → "https://..."
// config.companyName → "LoanFactory"
```

### Apply Dynamic Colors

```tsx
// Background
<div style={{ backgroundColor: config.primaryColor }}>

// Text
<span style={{ color: config.primaryColor }}>

// Semi-transparent (10% opacity)
<div style={{ backgroundColor: `${config.primaryColor}1A` }}>

// Gradient
<div style={{ 
  background: `linear-gradient(to right, ${config.primaryColor}, ${config.primaryColor}DD)` 
}}>

// Hover state
<a
  onMouseEnter={(e) => e.currentTarget.style.color = config.primaryColor}
  onMouseLeave={(e) => e.currentTarget.style.color = ''}
>
```

### When NOT to Use Dynamic Colors

❌ **Don't use for:**
- Static gray scales (use Tailwind classes)
- White backgrounds (use Tailwind)
- Black text (use Tailwind)

✅ **DO use for:**
- Buttons, badges, active states
- Icons, highlights
- Brand elements
- Interactive elements

---

## Common Patterns

### Pattern 1: Icon + Background Card

```tsx
<div className="bg-gray-50 rounded-xl p-6">
  <div 
    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
    style={{ backgroundColor: `${config.primaryColor}1A` }}
  >
    <Icon className="w-6 h-6" style={{ color: config.primaryColor }} />
  </div>
  <h3>{title}</h3>
  <p className="text-gray-600">{description}</p>
</div>
```

### Pattern 2: Themed Button

```tsx
<Button
  className="text-white"
  style={{ backgroundColor: config.primaryColor }}
  onClick={handleClick}
>
  Click Me
</Button>
```

### Pattern 3: Active State Badge

```tsx
<span
  className="px-3 py-1 rounded-full text-sm"
  style={{
    backgroundColor: isActive ? config.primaryColor : `${config.primaryColor}1A`,
    color: isActive ? 'white' : config.primaryColor
  }}
>
  {label}
</span>
```

### Pattern 4: Hover Link

```tsx
<a
  href="#"
  className="transition-colors"
  onMouseEnter={(e) => e.currentTarget.style.color = config.primaryColor}
  onMouseLeave={(e) => e.currentTarget.style.color = ''}
>
  Link Text
</a>
```

---

## Using shadcn/ui Components

### Import Pattern

```tsx
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
```

### Available Components

Check `/src/components/README.md` for full list. Commonly used:
- `Button` - Buttons with variants
- `Card` - Card container
- `Input` - Form input
- `Select` - Dropdown select
- `Dialog` - Modal dialogs
- `Badge` - Status badges
- `Avatar` - User avatars
- `Dropdown Menu` - Context menus
- `Tabs` - Tab navigation

### Example: Card with Button

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

<Card>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content here</p>
    <Button 
      className="mt-4 text-white"
      style={{ backgroundColor: config.primaryColor }}
    >
      Action
    </Button>
  </CardContent>
</Card>
```

---

## Working with Icons

### Import from lucide-react

```tsx
import { 
  FileText, 
  Users, 
  Bell, 
  Home,
  Settings,
  ChevronDown
} from 'lucide-react';
```

### Use in Components

```tsx
// Simple icon
<FileText className="h-5 w-5 text-gray-600" />

// Themed icon
<Users className="h-5 w-5" style={{ color: config.primaryColor }} />

// In button
<Button>
  <Bell className="h-4 w-4 mr-2" />
  Notifications
</Button>
```

---

## Creating a New Page

### Step 1: Create Page Component

```tsx
// /src/pages/MyNewPage.tsx

import { Navbar, NavItem } from '../components/Navbar';
import { useWebsiteConfig } from '../../contexts/WebsiteConfigContext';

interface MyNewPageProps {
  onNavigate: (view: string) => void;
  onViewProfile: () => void;
}

export function MyNewPage({ onNavigate, onViewProfile }: MyNewPageProps) {
  const { config } = useWebsiteConfig();

  const handleNavigation = (item: NavItem) => {
    if (item === 'transactions') {
      onNavigate('dashboard');
    } else if (item === 'news') {
      onNavigate('news');
    }
    // ... handle other navigation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        activeItem="home"
        onNavigate={handleNavigation}
        onProfileClick={onViewProfile}
        notificationCount={3}
      />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl mb-6">My New Page</h1>
        {/* Page content */}
      </main>
    </div>
  );
}
```

### Step 2: Add to App.tsx

```tsx
// Add to View type
export type View = 'dashboard' | 'detail' | 'profile' | 'mynewpage';

// Add handler
const handleViewMyNewPage = () => {
  setCurrentView('mynewpage');
};

// Add route
{currentView === 'mynewpage' && (
  <MyNewPage 
    onNavigate={handleNavigate}
    onViewProfile={handleViewProfile}
  />
)}
```

---

## Form Handling

### Using Form Components

```tsx
import { TextInput } from '../components/forms/TextInput';
import { useState } from 'react';

const [email, setEmail] = useState('');

<TextInput
  id="email"
  label="Email Address"
  value={email}
  onChange={setEmail}
  type="email"
  required
  placeholder="you@example.com"
/>
```

### Form Submission

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  const formData = {
    email,
    name,
    // ... other fields
  };
  
  console.log('Form data:', formData);
  // Handle submission
};

<form onSubmit={handleSubmit}>
  {/* Form fields */}
  <Button type="submit">Submit</Button>
</form>
```

---

## State Management

### Component State

```tsx
const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState<Item | null>(null);
```

### Context (Theme Config)

```tsx
// Already available globally
const { config, updateConfig } = useWebsiteConfig();

// Update theme
updateConfig({ primaryColor: '#0066CC' });
```

### Props Drilling (for now)

Pass callbacks down through props:

```tsx
// Parent
<ChildComponent onAction={handleAction} />

// Child
<Button onClick={onAction}>Action</Button>
```

---

## TypeScript Tips

### Define Props Interface

```tsx
interface MyComponentProps {
  title: string;
  description?: string; // Optional
  count: number;
  onAction: () => void;
  items: string[];
  config?: {
    color: string;
    size: number;
  };
}
```

### Use Type Exports

```tsx
// Import from App.tsx
import { Transaction, View } from '../../App';

// Use in component
const handleSelect = (transaction: Transaction) => {
  // ...
};
```

### Type Event Handlers

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // ...
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

---

## Testing Your Component

### 1. Visual Test
- Test in browser
- Check responsive design
- Verify hover states

### 2. Theme Test
```tsx
// Change in WebsiteSettings page
- Orange: #FF6B35
- Blue: #0066CC
- Green: #10B981
- Purple: #8B5CF6
```

### 3. Props Test
```tsx
// Test with different props
<MyComponent title="Test 1" />
<MyComponent title="Test 2" description="With description" />
<MyComponent title="Test 3" onClick={() => console.log('Click!')} />
```

### 4. Edge Cases
- Empty states
- Long text
- Missing optional props
- Error states

---

## Debugging Tips

### Console Logs

```tsx
console.log('Config:', config);
console.log('Props:', { title, description });
```

### React DevTools
- Install React DevTools browser extension
- Inspect component props and state
- Check component hierarchy

### Common Issues

**Color not applying?**
- Check if using `config.primaryColor`
- Verify component is inside `WebsiteConfigProvider`
- Use inline styles, not Tailwind classes

**Import errors?**
- Check relative path (`../../` vs `../`)
- Verify file exists
- Check export/import names match

**Component not updating?**
- Check if state is being set correctly
- Verify props are passed down
- Look for missing dependencies in useEffect

---

## Best Practices Checklist

- [ ] Component in correct folder
- [ ] Uses `useWebsiteConfig` for theming
- [ ] TypeScript interface defined
- [ ] Exported from index file
- [ ] Responsive design
- [ ] Accessibility (ARIA labels)
- [ ] Tested with multiple theme colors
- [ ] No hardcoded colors (use config or Tailwind)
- [ ] Clean, readable code
- [ ] Reusable and composable

---

## Resources

### Documentation
- [Project Structure](/PROJECT_STRUCTURE.md)
- [Color Theme Guide](/COLOR_THEME_GUIDE.md)
- [Migration Checklist](/MIGRATION_CHECKLIST.md)
- [Component README](/src/components/README.md)

### External
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app)

---

## Getting Help

1. **Check existing components** for patterns
2. **Read the guides** (PROJECT_STRUCTURE.md, COLOR_THEME_GUIDE.md)
3. **Look at examples** in `/src/components/homepage/`
4. **Test incrementally** as you build
5. **Ask questions** if stuck

---

## Next Steps

1. Read [PROJECT_STRUCTURE.md](/PROJECT_STRUCTURE.md)
2. Review [COLOR_THEME_GUIDE.md](/COLOR_THEME_GUIDE.md)
3. Explore existing components in `/src/components/`
4. Try creating a simple component
5. Check [MIGRATION_CHECKLIST.md](/MIGRATION_CHECKLIST.md) for tasks

Happy coding! 🚀
