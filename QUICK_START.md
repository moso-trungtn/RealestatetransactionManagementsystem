# Quick Start Guide

## ✅ Fixed Issues

All Tailwind CSS v4 conflicts have been resolved. The project now uses **Tailwind CSS v3.4.18** (stable).

## 🚀 Running the Project

### 1. Install Dependencies (if needed)
```bash
npm install --legacy-peer-deps
```

### 2. Start Development Server
```bash
npm run dev
```

Server will start at: **http://localhost:3000**

### 3. Access the Application
- **English**: http://localhost:3000/en
- **Vietnamese**: http://localhost:3000/vi
- **Auto-redirect**: http://localhost:3000 (redirects to `/en`)

## 📦 Commands

```bash
npm run dev      # Start development server ✅
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## ⚙️ Tech Stack

- **Framework**: Next.js 15.5.6
- **React**: 19.0.0
- **TypeScript**: 5.7.2
- **Tailwind CSS**: 3.4.18 ✅ (stable version)
- **Internationalization**: next-intl 3.26.2

## 🗂️ Key Directories

```
src/
├── app/[locale]/      # Main app pages
├── features/          # Feature modules (auth, transactions, etc.)
├── components/        # UI components (shadcn/ui)
├── shared/            # Shared components (Navbar, Footer)
├── i18n/              # Internationalization config
└── middleware.ts      # Routing middleware

messages/
├── en.json            # English translations
└── vi.json            # Vietnamese translations
```

## 🔧 Troubleshooting

### If you can't run npm install:
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json .next
npm install --legacy-peer-deps
```

### If port 3000 is in use:
The server will automatically use the next available port (3001, 3002, etc.)

### If you see Tailwind CSS errors:
Make sure only Tailwind v3 is installed:
```bash
npm list tailwindcss
# Should show: tailwindcss@3.4.18
```

### Clear cache if needed:
```bash
rm -rf .next
npm run dev
```

## ✨ What's Working

✅ Development server
✅ Internationalization (en/vi)
✅ All UI components (shadcn/ui)
✅ Landing page
✅ Authentication modal
✅ Transaction dashboard
✅ Admin features
✅ Tailwind CSS styling

## 📝 Notes

- Use `--legacy-peer-deps` flag for npm commands (React 19 peer dependency compatibility)
- The app uses App Router (not Pages Router)
- All routes are locale-prefixed (`/en/*`, `/vi/*`)
- TypeScript strict mode is enabled

## 🎯 Next Steps

1. **Test the application**: Visit http://localhost:3000
2. **Check all features**: Login, Dashboard, Transactions, etc.
3. **Update translations**: Edit `messages/en.json` and `messages/vi.json`
4. **Add new features**: Create folders in `src/features/`
5. **Deploy**: Run `npm run build` when ready

---

**Status**: ✅ All systems operational!
**Server**: Running at http://localhost:3000
**Last Updated**: 2025-11-25
