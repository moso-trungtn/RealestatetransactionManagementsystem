# Real Estate Transaction Management System

A comprehensive admin system for managing real estate transactions, built with React, TypeScript, and Tailwind CSS. Features dynamic theming, modular components, and a clean, organized architecture.

![LoanFactory](https://lf-homepage-444859640964.us-central1.run.app/images/logo/loanfactory.svg)

## 🎯 Overview

This system provides real estate professionals with tools to:
- Manage transactions from pre-contract to close
- Track commissions and splits
- Coordinate paperwork and timelines
- Monitor team performance
- Configure system-wide settings

## ✨ Key Features

### 🎨 Dynamic Theming
- **Configurable Primary Color**: Change the entire app's theme from Website Settings
- **Consistent Branding**: Logo and colors applied throughout
- **Real-time Updates**: Changes reflect immediately across all pages

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces

### 🧩 Modular Architecture
- **Component-based**: Small, reusable pieces
- **Feature-organized**: Logical folder structure
- **TypeScript**: Type-safe development
- **Well-documented**: Comprehensive guides

### 🔐 User Features
- Secure login with SSO option
- User profiles with avatars
- Notification system
- Role-based access (coming soon)

### 📊 Transaction Management
- Card and table views
- Advanced filtering and search
- Status tracking
- Commission splitting
- Document management
- Timeline tracking

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### First Steps

1. **Login**: Click "Sign In" on the homepage
2. **Explore Dashboard**: View transactions in card or table view
3. **Change Theme**: Go to Website Settings → Primary Color
4. **Create Transaction**: Click "New Transaction" button
5. **View Details**: Click any transaction to see full details

## 📁 Project Structure

```
/
├── /src/
│   ├── /components/      # Organized reusable components
│   │   ├── /homepage/   # Landing page components
│   │   ├── /transaction/ # Transaction components
│   │   ├── /forms/      # Form components
│   │   ├── /common/     # Shared components
│   │   └── /dashboard/  # Dashboard components
│   ├── /pages/          # Page components
│   ├── /hooks/          # Custom React hooks
│   └── README.md        # Component documentation
├── /components/         # Legacy components (being migrated)
│   ├── /ui/            # shadcn/ui components
│   └── /figma/         # Figma components
├── /contexts/          # React contexts
├── /styles/            # Global styles
└── App.tsx             # Main application

```

## 📚 Documentation

### For Developers
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Start here! Complete guide for creating components
- **[Project Structure](PROJECT_STRUCTURE.md)** - Detailed architecture documentation
- **[Color Theme Guide](COLOR_THEME_GUIDE.md)** - How to work with dynamic theming
- **[Component README](src/components/README.md)** - Component organization

### For Contributors
- **[Migration Checklist](MIGRATION_CHECKLIST.md)** - Track component migration progress

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18 + TypeScript |
| **Styling** | Tailwind CSS v4.0 |
| **UI Components** | shadcn/ui |
| **Icons** | lucide-react |
| **State** | React Context API |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Build** | Vite |

## 🎨 Design System

### Colors
- **Primary**: Orange (#FF6B35) - Configurable
- **White**: #FFFFFF
- **Gray Scale**: Tailwind's gray palette

### Typography
- Default typography set in `/styles/globals.css`
- Semantic HTML elements
- Responsive font sizes

### Components
Built on shadcn/ui:
- Buttons, Cards, Inputs, Selects
- Dialogs, Dropdowns, Tabs
- Tables, Badges, Avatars
- And more...

## 📖 Usage Examples

### Creating a Component

```tsx
import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';

export function MyComponent() {
  const { config } = useWebsiteConfig();
  
  return (
    <div 
      className="p-6 rounded-lg"
      style={{ backgroundColor: `${config.primaryColor}1A` }}
    >
      <h2 style={{ color: config.primaryColor }}>
        Themed Component
      </h2>
    </div>
  );
}
```

### Using Theme Colors

```tsx
// Background
<div style={{ backgroundColor: config.primaryColor }}>

// Text
<span style={{ color: config.primaryColor }}>

// Semi-transparent
<div style={{ backgroundColor: `${config.primaryColor}1A` }}>
```

## 🗺️ Roadmap

### ✅ Completed
- [x] Dynamic theming system
- [x] Homepage with features
- [x] Transactions dashboard
- [x] News page
- [x] Navigation system
- [x] Component reorganization
- [x] Comprehensive documentation

### 🔄 In Progress
- [ ] Complete component migration
- [ ] Form components standardization
- [ ] Table components enhancement
- [ ] Profile page improvements

### 📋 Planned
- [ ] Advanced search & filtering
- [ ] Real-time notifications
- [ ] Document preview
- [ ] Activity timeline
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] API integration
- [ ] Multi-language support

## 🤝 Contributing

### Getting Started
1. Read the [Developer Guide](DEVELOPER_GUIDE.md)
2. Check [Migration Checklist](MIGRATION_CHECKLIST.md) for tasks
3. Create a branch for your feature
4. Follow the component patterns
5. Test with multiple theme colors
6. Submit a pull request

### Guidelines
- Use TypeScript for all components
- Follow the folder structure
- Use `useWebsiteConfig` for theming
- Write clean, readable code
- Add proper TypeScript types
- Test responsive design
- Update documentation

## 📝 Component Examples

### Homepage Feature Card
```tsx
<FeatureCard
  icon={FileText}
  title="Transaction Management"
  description="Track all deals in one place"
/>
```

### Navigation Bar
```tsx
<Navbar 
  activeItem="transactions"
  onNavigate={handleNavigate}
  onProfileClick={handleProfile}
  notificationCount={5}
/>
```

### Transaction Card
```tsx
<TransactionCard
  transaction={transaction}
  onClick={() => viewDetails(transaction)}
/>
```

## 🔧 Configuration

### Website Settings
Access via navigation: **Website Settings**

Configure:
- Company Name
- Company Logo
- Primary Color (theme)
- Contact Information
- System Preferences

### Theme Colors
Change primary color to match your brand:
1. Navigate to **Website Settings**
2. Find **Primary Color** field
3. Enter hex color (e.g., `#0066CC`)
4. Save changes
5. See instant updates throughout app

## 🐛 Troubleshooting

### Color Not Updating
- Ensure component uses `useWebsiteConfig()`
- Check component is inside `WebsiteConfigProvider`
- Use inline styles for dynamic colors

### Import Errors
- Verify relative paths (`../../` vs `../`)
- Check file exists at path
- Ensure export/import names match

### Component Not Rendering
- Check TypeScript errors
- Verify all required props passed
- Look for console errors

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

[Your License Here]

## 👥 Authors

- **LoanFactory Team**

## 🙏 Acknowledgments

- shadcn/ui for beautiful components
- Lucide for icons
- Tailwind CSS for styling
- React team for the framework

---

## 📞 Support

For questions or issues:
1. Check the [Developer Guide](DEVELOPER_GUIDE.md)
2. Review [Project Structure](PROJECT_STRUCTURE.md)
3. Look at existing components for patterns
4. Contact the development team

---

**Built with ❤️ for Real Estate Professionals**
