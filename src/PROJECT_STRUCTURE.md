# Real Estate Transaction Management System - Project Structure

## Overview
This is a Real Estate Transaction Management admin system built with React, TypeScript, and Tailwind CSS. The system features dynamic theming with orange and white as primary colors (configurable via Website Settings).

## Technology Stack
- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **State Management**: React Context (WebsiteConfigContext)
- **Logo**: LoanFactory (https://lf-homepage-444859640964.us-central1.run.app/images/logo/loanfactory.svg)

## Directory Structure

```
/
├── App.tsx                    # Main application entry point
├── PROJECT_STRUCTURE.md       # This file
│
├── /src/
│   ├── /components/           # Organized reusable components
│   │   ├── README.md         # Component organization guide
│   │   │
│   │   ├── /homepage/        # Landing page components
│   │   │   ├── index.ts
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── LandingNavbar.tsx
│   │   │
│   │   ├── /transaction/     # Transaction components
│   │   │   ├── index.ts
│   │   │   ├── NewTransaction.tsx
│   │   │   ├── AssignOwner.tsx
│   │   │   ├── CommissionSplit.tsx
│   │   │   └── TransactionCard.tsx
│   │   │
│   │   ├── /forms/           # Form components
│   │   │   └── TextInput.tsx
│   │   │
│   │   ├── /common/          # Shared components
│   │   │   ├── index.ts
│   │   │   ├── Footer.tsx
│   │   │   └── (more common components)
│   │   │
│   │   ├── /dashboard/       # Dashboard components
│   │   │   └── (to be organized)
│   │   │
│   │   ├── /profile/         # Profile components
│   │   │   └── (to be organized)
│   │   │
│   │   ├── /tables/          # Table components
│   │   │   └── (to be organized)
│   │   │
│   │   ├── Navbar.tsx        # Main navigation bar
│   │   ├── TransactionCard.tsx
│   │   └── LoginModal.tsx
│   │
│   ├── /pages/               # Page components
│   │   ├── HomePage.tsx      # Landing page
│   │   ├── TransactionsDashboard.tsx
│   │   └── NewsPage.tsx
│   │
│   └── /hooks/               # Custom React hooks
│       └── useThemeColors.ts
│
├── /components/              # Legacy components (being migrated)
│   ├── /ui/                 # shadcn/ui components
│   ├── /figma/              # Figma-related components
│   ├── AdminProfile.tsx
│   ├── AssignOwner.tsx
│   ├── CommissionSplit.tsx
│   ├── DemoForm.tsx
│   ├── NewTransaction.tsx
│   ├── TransactionDetail.tsx
│   ├── WebsiteSettings.tsx
│   └── (other legacy components)
│
├── /contexts/
│   └── WebsiteConfigContext.tsx  # Theme configuration context
│
└── /styles/
    └── globals.css          # Global styles and Tailwind config

```

## Key Features

### 1. Dynamic Theming
- **Primary Color Configuration**: Configurable from Website Settings page
- **Context Provider**: `WebsiteConfigContext` manages theme state
- **Hook**: `useWebsiteConfig()` provides access to theme colors
- **Usage**: Components use inline styles for dynamic colors

```tsx
const { config } = useWebsiteConfig();
<div style={{ backgroundColor: config.primaryColor }}>
```

### 2. Navigation System
- **Navbar Component**: Main navigation with Avatar, Notifications, Navigation items
- **Items**: Home, Transactions, News, Demo Form, Website Settings, Templates
- **Active State**: Highlights current page
- **Notifications**: Badge counter for alerts

### 3. Pages & Views

#### HomePage (Landing Page)
- Hero section with CTA
- Features showcase (6 feature cards)
- CTA section
- Footer

#### Transactions Dashboard
- Card/Table view toggle
- Filters: Type, Status, Search
- Sorting options
- New Transaction modal
- Assign Owner functionality

#### News Page
- News articles grid
- Category filtering
- Article metadata (author, date, read time)

#### Admin Profile
- Collapsible sections
- User information management

#### Website Settings
- Company information
- Color theme configuration
- Logo management
- System-wide settings

### 4. Transaction Management
- **New Transaction**: Multi-step modal with sidebar navigation
- **Transaction Detail**: Tabs for Paperwork, To-Do, Timeline, History
- **Commission Split**: Split between loan factory, agents, custom parties
- **Assign Owner**: Assign transactions to team members

### 5. Component Organization Principles

#### Small & Reusable
- Single responsibility
- Props-based configuration
- No hardcoded values

#### Theme-Aware
- All use `useWebsiteConfig`
- Dynamic color application
- Consistent styling

#### Well-Organized
- Grouped by feature
- Index files for clean imports
- Clear naming conventions

## Migration Progress

### ✅ Completed
- [x] Homepage components split and organized
- [x] Common components (Footer, Navbar)
- [x] Transaction components proxied
- [x] Form components (TextInput)
- [x] Theme configuration system
- [x] Navigation system
- [x] News page

### ⏳ In Progress
- [ ] Dashboard components reorganization
- [ ] Profile components split
- [ ] Table components organization
- [ ] Form components migration
- [ ] Complete migration from /components to /src/components

### 📋 Pending
- [ ] Additional utility components
- [ ] Animation components
- [ ] Modal/Dialog components
- [ ] Enhanced table features

## Color Configuration

The system uses a centralized color configuration:

### Primary Color
- Default: `#FF6B35` (Orange)
- Configurable in Website Settings
- Applied dynamically throughout the app

### Color Usage
```tsx
// In components
const { config } = useWebsiteConfig();

// Background
style={{ backgroundColor: config.primaryColor }}

// Text color
style={{ color: config.primaryColor }}

// Semi-transparent (1A = 10% opacity)
style={{ backgroundColor: `${config.primaryColor}1A` }}
```

## Import Guidelines

### UI Components (shadcn)
```tsx
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
```

### Feature Components
```tsx
// Individual imports
import { FeatureCard } from '../components/homepage/FeatureCard';

// Index imports (recommended)
import { FeatureCard, HeroSection } from '../components/homepage';
```

### Icons
```tsx
import { FileText, Users, Bell } from 'lucide-react';
```

### Context/Hooks
```tsx
import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';
import { useThemeColors } from '../hooks/useThemeColors';
```

## Best Practices

1. **Always use theme configuration** for colors
2. **Break components into smaller pieces** for reusability
3. **Use TypeScript interfaces** for props
4. **Export from index files** for cleaner imports
5. **Follow the established folder structure**
6. **Document complex components** with comments
7. **Use semantic HTML** elements
8. **Maintain accessibility** standards

## Development Workflow

1. Create component in appropriate feature folder
2. Use `useWebsiteConfig` for theming
3. Export from index file
4. Import in page/parent component
5. Test with different theme colors
6. Document if complex

## Notes

- Tailwind v4.0 is used (no separate config file needed)
- Global typography is set in `/styles/globals.css`
- Don't use Tailwind classes for font-size, font-weight, line-height unless specifically requested
- Images use `ImageWithFallback` component
- Protected files: `/components/figma/ImageWithFallback.tsx`
