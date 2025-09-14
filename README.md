# Rate My | BYELYK

A production-ready MVP website for the "Rate My" platform at the University of Houston. Rate dorms, rank fits, and crown winners in this purple-themed community platform.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🎨 Design System

### Color Palette
- **Primary**: #6D28D9 (violet-700)
- **Light**: #A78BFA (violet-300) 
- **Dark**: #4C1D95 (violet-900)
- **Backgrounds**: White + near-black #0B0B12 (dark mode)
- **Accent**: #F5F3FF (violet-50)

### Features
- Rounded-2xl cards with soft shadows
- Subtle gradients and tasteful blur effects
- Smooth hover/focus states
- Mobile-first responsive design
- Dark mode support

## 🏠 Features

### Dorm Wars
- Browse and rate UH residence halls
- Detailed dorm information with photos
- Filter by hall, type, and tags
- Real-time rating system (1-10 scale)
- Leaderboards (All-Time, This Week coming soon)

### Fit Checks
- Browse and rate student fashion
- Style tag filtering
- Creator profiles and descriptions
- Photo galleries
- Fashion leaderboards

### Application System
- Apply to be featured in Dorm Wars
- Submit fits for Fit Checks
- File upload support (client-side preview)
- Form validation with Zod

### Admin Dashboard
- Review submitted applications
- Filter by section (Dorm Wars/Fit Checks)
- Contact information management
- Photo preview (placeholder)

## 🏢 UH Housing Data

Pre-seeded with comprehensive University of Houston housing information:

### Residence Halls
- **Cougar Village I & II** (first-year only)
- **Moody Towers** (mixed classes, dining hall)
- **The Quad** (sophomore+, suite-style)
- **Cougar Place** (sophomore+, apartment-style)
- **University Lofts** (upper-class, modern lofts)
- **Bayou Oaks** (sophomore+, townhouse-style)

### Affiliated Housing
- **Cambridge Oaks** (CLV managed)
- **Cullen Oaks** (ACC managed)

Each location includes:
- Room types and amenities
- Class eligibility
- Address/area information
- Student-focused descriptions
- 3+ placeholder photos
- Relevant tags for filtering

## 🛠 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd rate-my

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dorm-wars/         # Dorm Wars section
│   ├── fit-checks/        # Fit Checks section
│   ├── apply/             # Application forms
│   └── admin/             # Admin dashboard
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── NavBar.tsx        # Navigation component
│   ├── Hero.tsx          # Landing page hero
│   ├── RatingControl.tsx # 1-10 rating widget
│   ├── FilterBar.tsx     # Search and filter UI
│   ├── ItemCard.tsx      # Dorm/Fit display cards
│   ├── Leaderboard.tsx   # Rankings display
│   ├── ApplyCTA.tsx      # Call-to-action cards
│   └── ApplicationForm.tsx # Application form
├── lib/
│   ├── types.ts          # TypeScript type definitions
│   ├── data.ts           # Mock data and service functions
│   ├── analytics.ts      # Analytics tracking (no-op)
│   └── utils.ts          # Utility functions
└── globals.css           # Global styles and theme
```

## 🔄 Data Layer

### Current Implementation (MVP)
- In-memory data store
- Mock service functions
- Session-based persistence
- File upload stubs

### Upgrade Path
The data layer is designed for easy migration to:
- **Database**: Prisma + PostgreSQL/Supabase
- **File Storage**: AWS S3/Supabase Storage
- **Authentication**: NextAuth.js/Auth0
- **Real-time**: Supabase Realtime/WebSockets

### Service Functions
```typescript
// Dorm operations
getDorms(filters?: DormFilters): Dorm[]
getDormById(id: string): Dorm | undefined
rateDorm(id: string, score: number): Rating

// Fit operations  
getFits(filters?: FitFilters): Fit[]
getFitById(id: string): Fit | undefined
rateFit(id: string, score: number): Rating

// Application operations
submitApplication(app: Application): Application
getApplications(): Application[]
```

## 🎯 Future Roadmap

### Phase 1 (Current MVP)
- ✅ Core UI and components
- ✅ UH housing seed data
- ✅ Rating system
- ✅ Application forms
- ✅ Admin dashboard scaffold

### Phase 2 (Database Integration)
- [ ] Prisma + PostgreSQL setup
- [ ] User authentication
- [ ] Real file uploads
- [ ] Email notifications
- [ ] Admin approval workflow

### Phase 3 (Enhanced Features)
- [ ] Weekly leaderboards
- [ ] User profiles
- [ ] Comments and discussions
- [ ] Push notifications
- [ ] Mobile app (React Native)

### Phase 4 (Advanced Features)
- [ ] AI-powered recommendations
- [ ] Video integration
- [ ] Social features
- [ ] Analytics dashboard
- [ ] Content moderation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main

### Other Platforms
- **Netlify**: Compatible with Next.js static export
- **Railway**: Full-stack deployment with database
- **AWS**: Amplify or custom EC2 setup

## 📊 Analytics

Currently using a no-op analytics system. Ready to integrate:
- Google Analytics 4
- Mixpanel
- PostHog
- Custom analytics solution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary to BYELYK. All rights reserved.

## 📞 Support

For questions or support, contact:
- Email: [contact@byelyk.com]
- Instagram: [@byelyk]
- YouTube: [@BYELYK]

---

**Built with ❤️ for the University of Houston community**