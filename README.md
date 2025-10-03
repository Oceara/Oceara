# Oceara - Sustainable Agriculture Carbon Credit Platform

A comprehensive full-stack platform connecting farmers, buyers, and administrators in a carbon credit trading ecosystem.

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router) + TypeScript + TailwindCSS
- **Backend**: Express + TypeScript + Prisma (PostgreSQL)
- **Smart Contracts**: Hardhat + TypeScript
- **Authentication**: NextAuth.js + Google OAuth
- **Maps**: Mapbox GL JS
- **3D Visualization**: Three.js + React Three Fiber
- **Database**: PostgreSQL with Prisma ORM

## 🚀 Features

### User Roles & Authentication
- **Farmer/Landowner**: Manage land, track carbon credits, monetize sustainable practices
- **Buyer**: Purchase verified carbon credits, support environmental initiatives
- **Admin (NCCR)**: Platform oversight, user management, compliance monitoring

### Dashboard Features
- **Interactive Maps**: Mapbox integration for project visualization
- **3D Globe**: Three.js global ecosystem view
- **Analytics**: Comprehensive data insights and reporting
- **News Feed**: Platform updates and industry news
- **Project Management**: Track and manage carbon credit projects

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Google OAuth credentials
- Mapbox access token

### 1. Environment Setup

Create environment files:

**Backend** (`backend/.env`):
```env
PORT=4000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/oceara?schema=public"
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`):
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

### 2. Start Services

```bash
# Start all services with Docker
docker compose up --build

# Or start individually:
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# Contracts
cd contracts && npm run compile
```

### 3. Database Setup

```bash
# Run Prisma migrations (first time)
docker compose exec backend npx prisma migrate dev --name init

# Generate Prisma client
docker compose exec backend npx prisma generate
```

### 4. Access Applications

- **Web App**: http://localhost:3000
- **API**: http://localhost:4000/health
- **Database**: localhost:5432

## 📱 User Flows

### Landing Page
- Role selection (Farmer/Landowner, Buyer, Admin)
- Google Sign-In integration
- Role-based routing to dashboards

### Dashboard Features
- **Overview**: Key metrics and recent activity
- **Projects**: Manage carbon credit projects
- **Map**: Interactive Mapbox visualization
- **Globe**: 3D Three.js global view
- **Analytics**: Performance metrics and insights
- **News**: Platform updates and industry news

## 🔧 Development

### Project Structure
```
├── frontend/          # Next.js application
│   ├── src/app/       # App Router pages
│   ├── components/    # Reusable components
│   └── lib/          # Utilities and configs
├── backend/          # Express API
│   ├── src/          # Source code
│   ├── prisma/       # Database schema
│   └── routes/       # API routes
├── contracts/        # Smart contracts
│   ├── src/          # Solidity contracts
│   ├── test/         # Contract tests
│   └── scripts/      # Deployment scripts
└── docs/            # Documentation
```

### Available Scripts

**Frontend**:
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
```

**Backend**:
```bash
npm run dev          # Development with nodemon
npm run build        # TypeScript compilation
npm run start        # Production server
npm run lint         # ESLint
```

**Contracts**:
```bash
npm run compile      # Compile contracts
npm run test         # Run tests
npm run deploy       # Deploy to network
```

## 🔐 Authentication

The platform uses NextAuth.js with Google OAuth for authentication:

1. User selects role on landing page
2. Google OAuth authentication
3. Role stored in session/localStorage
4. Redirected to role-specific dashboard

## 🗺️ Map Integration

Mapbox GL JS provides:
- Interactive project visualization
- Geodata overlays
- Custom markers and popups
- Satellite/street/terrain views

## 🌍 3D Globe

Three.js integration includes:
- Interactive 3D Earth visualization
- Data point visualization
- Regional carbon credit distribution
- Orbit controls for navigation

## 📊 Analytics

Comprehensive analytics dashboard with:
- Revenue and credit tracking
- Project performance metrics
- User engagement statistics
- Regional distribution data

## 🚀 Deployment

### Production Environment Variables

Ensure all environment variables are properly set for production:
- Database connection strings
- OAuth credentials
- JWT secrets
- API endpoints

### Docker Deployment

```bash
# Build and deploy
docker compose -f docker-compose.prod.yml up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.


