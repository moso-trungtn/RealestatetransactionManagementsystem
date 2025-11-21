# Color Theme Configuration Guide

## Overview
The Real Estate Transaction Management System uses a centralized color configuration system that allows easy theming throughout the entire application.

## Theme Context

### WebsiteConfigContext
Located at: `/contexts/WebsiteConfigContext.tsx`

```tsx
interface WebsiteConfig {
  companyName: string;
  companyLogo: string;
  primaryColor: string;
  // ... other config
}
```

## Using Theme Colors in Components

### 1. Import the Hook

```tsx
import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';
```

### 2. Get Config in Component

```tsx
export function MyComponent() {
  const { config } = useWebsiteConfig();
  
  // Now you have access to config.primaryColor
}
```

### 3. Apply Colors Dynamically

#### Background Color
```tsx
<div style={{ backgroundColor: config.primaryColor }}>
  Colored background
</div>
```

#### Text Color
```tsx
<span style={{ color: config.primaryColor }}>
  Colored text
</span>
```

#### Semi-Transparent Background
```tsx
// 1A = 10% opacity (hex alpha channel)
<div style={{ backgroundColor: `${config.primaryColor}1A` }}>
  Light background
</div>

// Common opacity values:
// 1A = 10%
// 33 = 20%
// 4D = 30%
// 80 = 50%
// CC = 80%
// DD = 87%
```

#### Gradient
```tsx
<div 
  style={{ 
    background: `linear-gradient(to right, ${config.primaryColor}, ${config.primaryColor}DD)` 
  }}
>
  Gradient background
</div>
```

#### Hover States (with inline events)
```tsx
<a
  href="#"
  onMouseEnter={(e) => e.currentTarget.style.color = config.primaryColor}
  onMouseLeave={(e) => e.currentTarget.style.color = ''}
>
  Hover me
</a>
```

## Real Examples from the Codebase

### Example 1: FeatureCard
```tsx
export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  const { config } = useWebsiteConfig();

  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
        style={{ 
          backgroundColor: `${config.primaryColor}1A`,
        }}
      >
        <Icon 
          className="w-6 h-6" 
          style={{ color: config.primaryColor }}
        />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

### Example 2: Button
```tsx
<Button 
  onClick={onLoginClick}
  className="text-white" 
  style={{ 
    backgroundColor: config.primaryColor,
    fontSize: '18px', 
    padding: '24px 32px', 
    height: 'auto' 
  }}
>
  Get Started
</Button>
```

### Example 3: Badge
```tsx
<Badge 
  className="px-4 py-2 rounded-full" 
  style={{ 
    backgroundColor: `${config.primaryColor}1A`,
    color: config.primaryColor,
  }}
>
  Status
</Badge>
```

### Example 4: Footer Links
```tsx
<a 
  href="#" 
  className="transition-colors" 
  onMouseEnter={(e) => e.currentTarget.style.color = config.primaryColor}
  onMouseLeave={(e) => e.currentTarget.style.color = ''}
>
  Link
</a>
```

## Color Palette Reference

### Default Colors
- **Primary**: `#FF6B35` (Orange)
- **White**: `#FFFFFF`
- **Gray Scale**: Tailwind's gray palette

### When to Use Primary Color

✅ **DO USE** for:
- Call-to-action buttons
- Active navigation items
- Important icons
- Status badges
- Links (hover state)
- Badges and pills
- Feature highlights
- Success states

❌ **DON'T USE** for:
- Body text (use gray-900)
- Secondary buttons (use outline)
- Backgrounds (unless intentional)
- All borders (only accent borders)

## Changing the Theme Color

### Via Website Settings Page
1. Log in to the system
2. Navigate to Website Settings
3. Find "Primary Color" setting
4. Enter new hex color (e.g., `#0066CC`)
5. Save changes
6. Color updates throughout the app immediately

### Programmatically (for development)
```tsx
// In WebsiteConfigContext.tsx
const [config, setConfig] = useState<WebsiteConfig>({
  primaryColor: '#FF6B35', // Change this default value
  // ...
});
```

## Advanced: Custom Color Hook

For components that need derived colors:

```tsx
// /src/hooks/useThemeColors.ts
import { useWebsiteConfig } from '../../contexts/WebsiteConfigContext';

export function useThemeColors() {
  const { config } = useWebsiteConfig();
  
  return {
    primary: config.primaryColor,
    primaryLight: `${config.primaryColor}1A`,
    primaryDark: `${config.primaryColor}DD`,
  };
}

// Usage in component:
const { primary, primaryLight } = useThemeColors();
```

## Testing Theme Colors

When creating components, test with these colors:
- Orange (default): `#FF6B35`
- Blue: `#0066CC`
- Green: `#10B981`
- Purple: `#8B5CF6`
- Red: `#EF4444`

This ensures your component works with any color.

## Common Patterns

### Pattern 1: Icon with Background
```tsx
<div 
  className="w-12 h-12 rounded-lg flex items-center justify-center"
  style={{ backgroundColor: `${config.primaryColor}1A` }}
>
  <Icon className="w-6 h-6" style={{ color: config.primaryColor }} />
</div>
```

### Pattern 2: Colored Section
```tsx
<section 
  className="py-20"
  style={{ 
    background: `linear-gradient(to bottom right, ${config.primaryColor}, ${config.primaryColor}DD)` 
  }}
>
  {/* Content */}
</section>
```

### Pattern 3: Interactive Badge
```tsx
<span 
  className="px-4 py-2 rounded-full cursor-pointer transition-all"
  style={{ 
    backgroundColor: isActive ? config.primaryColor : 'transparent',
    color: isActive ? 'white' : config.primaryColor,
    border: `1px solid ${config.primaryColor}`
  }}
>
  Badge
</span>
```

## Troubleshooting

### Color not updating?
- Ensure you're using `useWebsiteConfig()` hook
- Check that the component is inside `WebsiteConfigProvider`
- Verify you're using inline `style={{}}` not Tailwind classes for dynamic colors

### Color looks wrong?
- Check hex format includes `#`
- Verify opacity values are correct (1A for 10%, etc.)
- Test in different browsers

### Performance concerns?
- The context is lightweight and optimized
- Re-renders only occur when config changes
- Inline styles are the correct approach for dynamic theming

## Resources

- [WebsiteConfigContext](/contexts/WebsiteConfigContext.tsx)
- [useThemeColors Hook](/src/hooks/useThemeColors.ts)
- [Website Settings Page](/components/WebsiteSettings.tsx)
- [Example: FeatureCard](/src/components/homepage/FeatureCard.tsx)
- [Example: HeroSection](/src/components/homepage/HeroSection.tsx)
