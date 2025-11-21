# Component Migration Checklist

## Migration Plan: `/components` → `/src/components`

This document tracks the migration of components from the legacy `/components` folder to the new organized `/src/components` structure.

---

## ✅ Completed Migrations

### Homepage Components
- [x] **LandingPage.tsx** → Split into:
  - [x] `/src/components/homepage/HeroSection.tsx`
  - [x] `/src/components/homepage/FeatureCard.tsx`
  - [x] `/src/components/homepage/FeaturesSection.tsx`
  - [x] `/src/components/homepage/CTASection.tsx`
  - [x] `/src/components/homepage/LandingNavbar.tsx`
  - [x] `/src/components/homepage/index.ts`

### Common Components
- [x] **Footer.tsx** → `/src/components/common/Footer.tsx`
  - [x] Updated with theme configuration
  - [x] Dynamic color hover states
- [x] **Navbar.tsx** → `/src/components/Navbar.tsx`
  - [x] Main navigation with avatar, notifications
  - [x] Theme-aware active states

### Transaction Components (Proxied)
- [x] **NewTransaction.tsx** → `/src/components/transaction/NewTransaction.tsx` (proxy)
- [x] **AssignOwner.tsx** → `/src/components/transaction/AssignOwner.tsx` (proxy)
- [x] **CommissionSplit.tsx** → `/src/components/transaction/CommissionSplit.tsx` (proxy)
- [x] **TransactionCard.tsx** → Moved to `/src/components/TransactionCard.tsx`

### Form Components
- [x] **TextInput** → `/src/components/forms/TextInput.tsx`
  - [x] Removed PrimeReact dependency
  - [x] Uses shadcn Input component

### Pages
- [x] **HomePage.tsx** → `/src/pages/HomePage.tsx`
  - [x] Refactored to use new homepage components
- [x] **TransactionsDashboard.tsx** → `/src/pages/TransactionsDashboard.tsx`
  - [x] Updated imports for new structure
  - [x] Integrated new Navbar
- [x] **NewsPage.tsx** → `/src/pages/NewsPage.tsx`
  - [x] New page with navbar integration

### Utilities & Hooks
- [x] **useThemeColors.ts** → `/src/hooks/useThemeColors.ts`
- [x] **LoginModal.tsx** → `/src/components/LoginModal.tsx`

---

## 🔄 In Progress

### Transaction Components (Full Migration)
These are currently proxied but need full migration:
- [ ] **NewTransaction.tsx**
  - [ ] Split into smaller components:
    - [ ] `TransactionTypeSelector.tsx`
    - [ ] `ClientInfoForm.tsx`
    - [ ] `PropertyInfoForm.tsx`
    - [ ] `PartiesForm.tsx`
    - [ ] `OfferForm.tsx`
  - [ ] Add theme configuration
  - [ ] Move to `/src/components/transaction/new/`

- [ ] **AssignOwner.tsx**
  - [ ] Add theme configuration
  - [ ] Extract reusable parts
  - [ ] Full migration to `/src/components/transaction/`

- [ ] **CommissionSplit.tsx**
  - [ ] Add theme configuration
  - [ ] Split calculator logic into separate hook
  - [ ] Full migration to `/src/components/transaction/`

---

## 📋 Pending Migrations

### Form Components
Priority: **HIGH**

- [ ] **FormAccordion.tsx** → `/src/components/forms/FormAccordion.tsx`
- [ ] **FormCheckbox.tsx** → `/src/components/forms/FormCheckbox.tsx`
- [ ] **FormCheckboxGroup.tsx** → `/src/components/forms/FormCheckboxGroup.tsx`
- [ ] **FormDatePicker.tsx** → `/src/components/forms/FormDatePicker.tsx`
- [ ] **FormFileUpload.tsx** → `/src/components/forms/FormFileUpload.tsx`
- [ ] **FormInput.tsx** → `/src/components/forms/FormInput.tsx`
- [ ] **FormRadioGroup.tsx** → `/src/components/forms/FormRadioGroup.tsx`
- [ ] **FormSelect.tsx** → `/src/components/forms/FormSelect.tsx`
- [ ] **FormSlider.tsx** → `/src/components/forms/FormSlider.tsx`
- [ ] **FormSwitch.tsx** → `/src/components/forms/FormSwitch.tsx`
- [ ] **FormTextarea.tsx** → `/src/components/forms/FormTextarea.tsx`
- [ ] Create index file: `/src/components/forms/index.ts`

**Migration Steps:**
1. Add theme configuration where applicable
2. Ensure consistency with shadcn/ui
3. Extract shared form logic into hooks
4. Add TypeScript types
5. Create comprehensive form examples

### Table Components
Priority: **HIGH**

- [ ] **SelectableTable.tsx** → `/src/components/tables/SelectableTable.tsx`
- [ ] **SortableTable.tsx** → `/src/components/tables/SortableTable.tsx`
- [ ] **StaticTable.tsx** → `/src/components/tables/StaticTable.tsx`
- [ ] **EditableTable.tsx** → `/src/components/tables/EditableTable.tsx`
- [ ] **DynamicFieldList.tsx** → `/src/components/tables/DynamicFieldList.tsx`
- [ ] **TransactionChecklistTable.tsx** → `/src/components/tables/TransactionChecklistTable.tsx`
- [ ] Create index file: `/src/components/tables/index.ts`

**Migration Steps:**
1. Add theme configuration
2. Standardize table props interface
3. Extract common table logic
4. Add sorting/filtering capabilities
5. Create reusable table cells

### Profile Components
Priority: **MEDIUM**

- [ ] **AdminProfile.tsx** → Split into:
  - [ ] `/src/components/profile/ProfileHeader.tsx`
  - [ ] `/src/components/profile/ProfileSection.tsx`
  - [ ] `/src/components/profile/ProfileSettings.tsx`
  - [ ] `/src/components/profile/index.ts`
- [ ] Move to `/src/pages/AdminProfile.tsx` (main page)

**Migration Steps:**
1. Extract collapsible sections logic
2. Create reusable profile section component
3. Add theme configuration
4. Add avatar upload functionality

### Transaction Detail Components
Priority: **HIGH**

- [ ] **TransactionDetail.tsx** → Split into:
  - [ ] `/src/components/transaction/detail/TransactionHeader.tsx`
  - [ ] `/src/components/transaction/detail/PaperworkTab.tsx`
  - [ ] `/src/components/transaction/detail/ToDoTab.tsx`
  - [ ] `/src/components/transaction/detail/TimelineTab.tsx`
  - [ ] `/src/components/transaction/detail/HistoryTab.tsx`
  - [ ] `/src/components/transaction/detail/index.ts`
- [ ] Move to `/src/pages/TransactionDetail.tsx` (main page)

**Migration Steps:**
1. Split each tab into separate component
2. Extract shared tab logic
3. Add theme configuration
4. Create tab navigation component

### Other Components
Priority: **MEDIUM**

- [ ] **TransactionChecklist.tsx** → `/src/components/transaction/TransactionChecklist.tsx`
- [ ] **ToDoTabContent.tsx** → `/src/components/transaction/detail/ToDoTab.tsx`
- [ ] **DemoForm.tsx** → `/src/pages/DemoForm.tsx`
- [ ] **WebsiteSettings.tsx** → `/src/pages/WebsiteSettings.tsx`

---

## 🎯 Migration Guidelines

### For Each Component:

1. **Read the component**
   ```bash
   # Understand structure and dependencies
   ```

2. **Identify split opportunities**
   - Look for repeated patterns
   - Find sections that could be components
   - Identify state that could be hooks

3. **Create new component(s)**
   ```tsx
   // Template:
   import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';
   
   interface ComponentProps {
     // Props here
   }
   
   export function ComponentName({ props }: ComponentProps) {
     const { config } = useWebsiteConfig();
     
     return (
       // JSX with theme-aware styling
     );
   }
   ```

4. **Update imports**
   - Change absolute paths to relative
   - Update parent components
   - Create index files for clean imports

5. **Add theme configuration**
   - Replace hardcoded colors with `config.primaryColor`
   - Use inline styles for dynamic colors
   - Keep Tailwind for static colors

6. **Test thoroughly**
   - Test with different theme colors
   - Verify all props work
   - Check responsive design

7. **Update documentation**
   - Add to this checklist
   - Update component README
   - Add usage examples

---

## 📊 Migration Progress

### Overall Progress: **25%**

```
Homepage:        ████████████████████ 100% (5/5)
Common:          ████████████████████ 100% (2/2)
Transaction:     ████░░░░░░░░░░░░░░░░  20% (3/15)
Forms:           █░░░░░░░░░░░░░░░░░░░   8% (1/12)
Tables:          ░░░░░░░░░░░░░░░░░░░░   0% (0/6)
Profile:         ░░░░░░░░░░░░░░░░░░░░   0% (0/4)
Pages:           ████████░░░░░░░░░░░░  40% (3/7)
Other:           ░░░░░░░░░░░░░░░░░░░░   0% (0/4)
```

---

## 🚀 Next Steps (Priority Order)

1. **Forms Migration** (Week 1)
   - Migrate all form components
   - Create form examples page
   - Document form patterns

2. **Tables Migration** (Week 2)
   - Migrate table components
   - Standardize table interface
   - Add advanced features

3. **Transaction Detail** (Week 3)
   - Split into tab components
   - Add theme support
   - Enhance functionality

4. **Profile Components** (Week 4)
   - Split AdminProfile
   - Add new profile features
   - Enhance settings

5. **Cleanup** (Week 5)
   - Remove legacy components
   - Update all imports
   - Final testing

---

## 📝 Notes

- **Proxy Components**: Some components are currently proxied (re-exported from old location) to avoid breaking changes. These should be fully migrated in the next phase.

- **Theme Configuration**: All new components MUST use `useWebsiteConfig()` for primary color configuration.

- **Breaking Changes**: Document any breaking changes in a separate CHANGELOG.md

- **Testing**: Test each component with multiple theme colors before marking as complete.

---

## ✅ Definition of Done

A component migration is complete when:
- [ ] Component is in correct `/src/components` folder
- [ ] Component uses `useWebsiteConfig` for theming
- [ ] Component is split into reusable pieces (if applicable)
- [ ] Index file exports component
- [ ] Parent components updated to use new import
- [ ] Tested with different theme colors
- [ ] Documentation updated
- [ ] TypeScript types defined
- [ ] No console errors
- [ ] Responsive design verified
