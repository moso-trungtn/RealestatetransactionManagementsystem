# Complete Folder Structure

## Visual Tree Structure

```
real-estate-transaction-system/
│
├── 📄 README.md                          # Main project documentation
├── 📄 PROJECT_STRUCTURE.md               # Detailed architecture guide
├── 📄 DEVELOPER_GUIDE.md                 # Developer quick start
├── 📄 COLOR_THEME_GUIDE.md               # Theme configuration guide
├── 📄 MIGRATION_CHECKLIST.md             # Component migration tracker
├── 📄 FOLDER_STRUCTURE.md                # This file
│
├── 📄 App.tsx                            # Main application entry point
├── 📄 package.json                       # Dependencies
├── 📄 tsconfig.json                      # TypeScript configuration
│
├── 📁 src/                               # New organized structure
│   │
│   ├── 📁 components/                    # Reusable components
│   │   │
│   │   ├── 📄 README.md                  # Component organization guide
│   │   ├── 📄 Navbar.tsx                 # Main navigation bar
│   │   ├── 📄 LoginModal.tsx             # Login modal
│   │   ├── 📄 TransactionCard.tsx        # Transaction display card
│   │   │
│   │   ├── 📁 homepage/                  # Landing page components
│   │   │   ├── 📄 index.ts               # Export all homepage components
│   │   │   ├── 📄 FeatureCard.tsx        # Individual feature card
│   │   │   ├── 📄 HeroSection.tsx        # Hero section with CTA
│   │   │   ├── 📄 FeaturesSection.tsx    # Features grid
│   │   │   ├── 📄 CTASection.tsx         # Call-to-action section
│   │   │   └── 📄 LandingNavbar.tsx      # Landing page navbar
│   │   │
│   │   ├── 📁 transaction/               # Transaction-related components
│   │   │   ├── 📄 index.ts               # Export all transaction components
│   │   │   ├── 📄 NewTransaction.tsx     # New transaction modal (proxy)
│   │   │   ├── 📄 AssignOwner.tsx        # Assign owner modal (proxy)
│   │   │   └── 📄 CommissionSplit.tsx    # Commission calculator (proxy)
│   │   │
│   │   ├── 📁 forms/                     # Form input components
│   │   │   ├── 📄 index.ts               # Export all form components
│   │   │   └── 📄 TextInput.tsx          # Text input wrapper
│   │   │
│   │   ├── 📁 common/                    # Shared components
│   │   │   ├── 📄 index.ts               # Export all common components
│   │   │   └── 📄 Footer.tsx             # Site footer
│   │   │
│   │   ├── 📁 dashboard/                 # Dashboard-specific (to be created)
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 StatsCard.tsx
│   │   │   ├── 📄 FilterBar.tsx
│   │   │   └── 📄 QuickActions.tsx
│   │   │
│   │   ├── 📁 profile/                   # User profile (to be created)
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 ProfileHeader.tsx
│   │   │   ├── 📄 ProfileSection.tsx
│   │   │   └── 📄 ProfileSettings.tsx
│   │   │
│   │   └── 📁 tables/                    # Table components (to be created)
│   │       ├── 📄 index.ts
│   │       ├── 📄 SelectableTable.tsx
│   │       ├── 📄 SortableTable.tsx
│   │       └── 📄 EditableTable.tsx
│   │
│   ├── 📁 pages/                         # Page-level components
│   │   ├── 📄 HomePage.tsx               # Landing/marketing page
│   │   ├── 📄 TransactionsDashboard.tsx  # Main dashboard
│   │   └── 📄 NewsPage.tsx               # News and updates
│   │
│   └── 📁 hooks/                         # Custom React hooks
│       ├── 📄 useThemeColors.ts          # Theme color utilities
│       └── 📄 useLocalStorage.ts         # (example)
│
├── 📁 components/                        # Legacy components (being migrated)
│   │
│   ├── 📁 ui/                           # shadcn/ui components (keep here)
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 input.tsx
│   │   ├── 📄 select.tsx
│   │   ├── 📄 dialog.tsx
│   │   ├── 📄 dropdown-menu.tsx
│   │   ├── 📄 badge.tsx
│   │   ├── 📄 avatar.tsx
│   │   ├── 📄 tabs.tsx
│   │   ├── 📄 table.tsx
│   │   ├── 📄 checkbox.tsx
│   │   ├── 📄 label.tsx
│   │   ├── 📄 textarea.tsx
│   │   ├── 📄 sonner.tsx
│   │   ├── 📄 primary-button.tsx
│   │   └── 📄 utils.ts                  # Utility functions
│   │
│   ├── 📁 figma/                        # Figma imports (protected)
│   │   └── 📄 ImageWithFallback.tsx     # Protected - do not modify
│   │
│   ├── 📄 AdminProfile.tsx              # To be split & migrated
│   ├── 📄 AssignOwner.tsx               # Original (proxied to src)
│   ├── 📄 CommissionSplit.tsx           # Original (proxied to src)
│   ├── 📄 DemoForm.tsx                  # To be migrated
│   ├── 📄 DynamicFieldList.tsx          # To be migrated
│   ├── 📄 EditableTable.tsx             # To be migrated
│   ├── 📄 Footer.tsx                    # Legacy (new in src)
│   ├── 📄 FormAccordion.tsx             # To be migrated
│   ├── 📄 FormCheckbox.tsx              # To be migrated
│   ├── 📄 FormCheckboxGroup.tsx         # To be migrated
│   ├── 📄 FormDatePicker.tsx            # To be migrated
│   ├── 📄 FormFileUpload.tsx            # To be migrated
│   ├── 📄 FormInput.tsx                 # To be migrated
│   ├── 📄 FormRadioGroup.tsx            # To be migrated
│   ├── 📄 FormSelect.tsx                # To be migrated
│   ├── 📄 FormSlider.tsx                # To be migrated
│   ├── 📄 FormSwitch.tsx                # To be migrated
│   ├── 📄 FormTextarea.tsx              # To be migrated
│   ├── 📄 LandingPage.tsx               # Legacy (split into src)
│   ├── 📄 LoginModal.tsx                # Legacy (moved to src)
│   ├── 📄 Navbar.tsx                    # Legacy (moved to src)
│   ├── 📄 NewTransaction.tsx            # Original (proxied to src)
│   ├── 📄 SelectableTable.tsx           # To be migrated
│   ├── 📄 SortableTable.tsx             # To be migrated
│   ├── 📄 StaticTable.tsx               # To be migrated
│   ├── 📄 ToDoTabContent.tsx            # To be migrated
│   ├── 📄 TransactionCard.tsx           # Legacy (moved to src)
│   ├── 📄 TransactionChecklist.tsx      # To be migrated
│   ├── 📄 TransactionChecklistTable.tsx # To be migrated
│   ├── 📄 TransactionDetail.tsx         # To be split & migrated
│   ├── 📄 TransactionsDashboard.tsx     # Legacy (moved to src)
│   └── 📄 WebsiteSettings.tsx           # To be migrated
│
├── 📁 contexts/                         # React Context providers
│   └── 📄 WebsiteConfigContext.tsx      # Theme & config management
│
├── 📁 styles/                           # Global styles
│   └── 📄 globals.css                   # Tailwind & global CSS
│
└── 📁 public/                           # Static assets
    ├── 📁 images/
    └── 📄 favicon.ico

```

## Component Categories

### ✅ Completed & Organized

#### Homepage Components (`/src/components/homepage/`)
- **Purpose**: Landing page elements
- **Components**: 
  - FeatureCard - Individual feature display
  - HeroSection - Hero with CTA
  - FeaturesSection - Features grid wrapper
  - CTASection - Call-to-action section
  - LandingNavbar - Landing page navigation
- **Status**: ✅ Complete, themed, tested

#### Common Components (`/src/components/common/`)
- **Purpose**: Shared across entire app
- **Components**:
  - Footer - Site footer with dynamic colors
- **Status**: ✅ Complete, themed, tested

#### Navigation (`/src/components/`)
- **Navbar.tsx** - Main app navigation
  - Avatar, notifications, nav items
  - Theme-aware active states
- **Status**: ✅ Complete, themed, tested

#### Transaction Components (`/src/components/transaction/`)
- **Purpose**: Transaction management
- **Components** (currently proxied):
  - NewTransaction - Create transaction modal
  - AssignOwner - Assign team members
  - CommissionSplit - Split calculator
- **Status**: ⚠️ Proxied, needs full migration

#### Form Components (`/src/components/forms/`)
- **Purpose**: Form inputs and controls
- **Components**:
  - TextInput - Text input wrapper
- **Status**: 🔄 In progress, needs more components

### 📋 Pending Organization

#### Dashboard Components (`/src/components/dashboard/`)
**To be created:**
- StatsCard - Statistics display
- FilterBar - Filter controls
- QuickActions - Quick action buttons
- ChartWidget - Data visualization
- ActivityFeed - Recent activity

#### Profile Components (`/src/components/profile/`)
**To be created from AdminProfile.tsx:**
- ProfileHeader - User header with avatar
- ProfileSection - Collapsible sections
- ProfileSettings - Settings form
- ProfileActivity - Activity timeline

#### Table Components (`/src/components/tables/`)
**To be migrated:**
- SelectableTable.tsx
- SortableTable.tsx
- EditableTable.tsx
- StaticTable.tsx
- DynamicFieldList.tsx
- TransactionChecklistTable.tsx

**To be created:**
- TableHeader - Reusable header
- TableRow - Reusable row
- TableCell - Reusable cell
- TablePagination - Pagination controls

### 🔧 Pages (`/src/pages/`)

#### Completed Pages
- **HomePage.tsx** - Landing page
  - Uses: LandingNavbar, HeroSection, FeaturesSection, CTASection, Footer
  
- **TransactionsDashboard.tsx** - Main dashboard
  - Uses: Navbar, TransactionCard, NewTransaction, AssignOwner
  
- **NewsPage.tsx** - News & updates
  - Uses: Navbar, Card components

#### To Be Migrated
- AdminProfile (from /components)
- DemoForm (from /components)
- WebsiteSettings (from /components)
- TransactionDetail (needs splitting)

## Import Path Reference

### From Pages to Components

```tsx
// Homepage components
import { FeatureCard, HeroSection } from '../components/homepage';

// Transaction components
import { NewTransaction } from '../components/transaction';

// Common components
import { Footer } from '../components/common';

// Direct components
import { Navbar } from '../components/Navbar';
```

### From Components to UI

```tsx
// From src/components/
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

// From src/pages/
import { Button } from '../components/ui/button';
```

### From Components to Context

```tsx
// From src/components/
import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';

// From src/pages/
import { useWebsiteConfig } from '../../contexts/WebsiteConfigContext';
```

## Migration Status by Folder

```
📊 Migration Progress

Homepage:        ████████████████████ 100% (5/5 components)
Common:          ████████████████████ 100% (1/1 components)
Navigation:      ████████████████████ 100% (1/1 components)
Transaction:     ████░░░░░░░░░░░░░░░░  20% (Proxied, needs migration)
Forms:           █░░░░░░░░░░░░░░░░░░░   8% (1/12 components)
Dashboard:       ░░░░░░░░░░░░░░░░░░░░   0% (Not started)
Profile:         ░░░░░░░░░░░░░░░░░░░░   0% (Not started)
Tables:          ░░░░░░░░░░░░░░░░░░░░   0% (Not started)
Pages:           ████████░░░░░░░░░░░░  43% (3/7 pages)

Overall:         ████░░░░░░░░░░░░░░░░  25%
```

## Next Migration Targets

### Priority 1: Forms (Week 1)
```
/components/Form*.tsx → /src/components/forms/
- FormInput.tsx
- FormSelect.tsx
- FormTextarea.tsx
- FormCheckbox.tsx
- FormCheckboxGroup.tsx
- FormRadioGroup.tsx
- FormDatePicker.tsx
- FormFileUpload.tsx
- FormSlider.tsx
- FormSwitch.tsx
- FormAccordion.tsx
```

### Priority 2: Tables (Week 2)
```
/components/*Table.tsx → /src/components/tables/
- SelectableTable.tsx
- SortableTable.tsx
- EditableTable.tsx
- StaticTable.tsx
- DynamicFieldList.tsx
- TransactionChecklistTable.tsx
```

### Priority 3: Transaction (Week 3)
```
Full migration from proxies:
- NewTransaction.tsx (split into sub-components)
- AssignOwner.tsx (add theming)
- CommissionSplit.tsx (add theming)
```

### Priority 4: Detail Pages (Week 4)
```
Split large components:
- TransactionDetail.tsx → detail/*.tsx
- AdminProfile.tsx → profile/*.tsx
```

## File Naming Conventions

### Components
- **PascalCase**: `FeatureCard.tsx`, `HeroSection.tsx`
- **Descriptive**: Name describes what it displays
- **Singular**: `Card.tsx` not `Cards.tsx`

### Folders
- **lowercase**: `homepage/`, `transaction/`
- **plural if contains multiple**: `forms/`, `tables/`
- **singular if purpose**: `common/`, `profile/`

### Index Files
- **index.ts**: Export barrel files
- **README.md**: Documentation files

## Best Practices for Organization

### 1. Feature-First
Group by feature/domain, not by type:
```
✅ Good:
/transaction/
  NewTransaction.tsx
  AssignOwner.tsx
  CommissionSplit.tsx

❌ Avoid:
/modals/
  NewTransaction.tsx
  AssignOwner.tsx
```

### 2. Shallow Structure
Keep nesting to 3 levels max:
```
✅ Good:
/src/components/homepage/FeatureCard.tsx

❌ Avoid:
/src/components/homepage/cards/feature/FeatureCard.tsx
```

### 3. Index Exports
Use index files for clean imports:
```tsx
// index.ts
export { FeatureCard } from './FeatureCard';
export { HeroSection } from './HeroSection';

// Usage
import { FeatureCard, HeroSection } from '../components/homepage';
```

### 4. Co-location
Keep related files together:
```
/homepage/
  FeatureCard.tsx
  FeatureCard.types.ts (if needed)
  FeatureCard.test.ts (if testing)
```

## Documentation Files

All key documentation in root:
- `README.md` - Main project overview
- `PROJECT_STRUCTURE.md` - Architecture details
- `DEVELOPER_GUIDE.md` - Development guide
- `COLOR_THEME_GUIDE.md` - Theming guide
- `MIGRATION_CHECKLIST.md` - Migration tracker
- `FOLDER_STRUCTURE.md` - This file

Component-specific docs in component folders:
- `/src/components/README.md` - Component organization

## Summary

The folder structure is designed for:
- **Clarity**: Easy to find components
- **Scalability**: Room to grow
- **Maintainability**: Logical organization
- **Developer Experience**: Quick navigation

Follow the structure, and the codebase stays clean! 🎯
