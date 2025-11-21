# Components Organization

This directory contains all reusable components organized by feature and purpose.

## Directory Structure

```
/src/components/
├── homepage/          # Landing page components
│   ├── FeatureCard.tsx
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── CTASection.tsx
│   └── LandingNavbar.tsx
│
├── dashboard/         # Dashboard-specific components
│   └── (To be organized)
│
├── transaction/       # Transaction management components
│   ├── NewTransaction.tsx
│   ├── AssignOwner.tsx
│   ├── CommissionSplit.tsx
│   └── TransactionCard.tsx
│
├── forms/            # Form input components
│   └── TextInput.tsx
│
├── profile/          # User profile components
│   └── (To be organized)
│
├── common/           # Shared/common components
│   ├── Footer.tsx
│   └── Navbar.tsx
│
└── tables/           # Table components
    └── (To be organized)
```

## Design Principles

### 1. Component Reusability
- Components are broken down into small, single-purpose pieces
- Each component should be independent and reusable
- Shared logic is extracted into hooks

### 2. Theme Configuration
- All components use the `useWebsiteConfig` hook for theming
- Primary color can be configured from Website Settings
- Colors are applied dynamically using inline styles where needed

### 3. Import Paths
- Components import from the organized structure
- UI components from shadcn are imported from `../../components/ui/`
- Use relative imports within the same feature folder

## Usage Examples

### Homepage Components

```tsx
import { FeatureCard } from '../components/homepage/FeatureCard';
import { FileText } from 'lucide-react';

<FeatureCard
  icon={FileText}
  title="Transaction Management"
  description="Track all your deals in one place"
/>
```

### Transaction Components

```tsx
import { NewTransaction } from '../components/transaction/NewTransaction';

<NewTransaction
  onClose={() => setShowModal(false)}
  onSave={(data) => console.log(data)}
/>
```

### Common Components

```tsx
import { Footer } from '../components/common/Footer';
import { Navbar } from '../components/Navbar';

<Navbar 
  activeItem="transactions"
  onNavigate={handleNavigate}
  onProfileClick={handleProfile}
  notificationCount={5}
/>
```

## Theme Configuration

The primary color is configured in the Website Settings page and accessed via:

```tsx
import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';

const { config } = useWebsiteConfig();

// Use in components
<div style={{ backgroundColor: config.primaryColor }}>
  {/* Content */}
</div>
```

## Migration Status

- ✅ Homepage components (FeatureCard, HeroSection, etc.)
- ✅ Common components (Footer, Navbar)
- ✅ Transaction components (proxied from /components)
- ✅ Form components (TextInput)
- ⏳ Dashboard components
- ⏳ Profile components
- ⏳ Table components
