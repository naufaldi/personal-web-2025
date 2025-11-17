---
title: "Viralkan – Community Road Damage Reporting Platform"
slug: "viralkan-app"
description: "A full-stack civic engagement platform enabling citizens to report road damage, built from scratch with React, Hono, PostgreSQL, and PostGIS. Designed to centralize community reports and amplify citizen voices through social media virality."
image: "https://res.cloudinary.com/cynux/image/upload/v1762849053/portfolio-2025/portfolio/viralkan.png"
liveUrl: "https://viralkan.app"
githubUrl: "https://github.com/naufaldi/viralkan-app"
techStack:
  [
    "React 18",
    "Vite",
    "TypeScript",
    "Hono",
    "PostgreSQL",
    "PostGIS",
    "Cloudflare R2",
    "Tailwind CSS",
    "Firebase Auth",
    "Docker",
    "Caddy",
  ]
date: "2025-01-17"
---

## Overview

**Viralkan** is a community-driven civic engagement platform that enables citizens in Bekasi, Indonesia to report road damage and infrastructure issues. Built entirely from scratch, the platform serves as a centralized hub for collecting, verifying, and sharing road condition reports—helping citizens avoid damaged roads while raising public awareness about infrastructure problems.

Unlike a traditional government reporting system, Viralkan is designed to amplify citizen voices through social media virality and community pressure, making infrastructure issues visible and urgent.

## Project Objectives

The platform aims to:

- **Centralize Reports**: Replace scattered WhatsApp and social media complaints with one structured platform
- **Enable Community**: Lower barriers for citizens to document and share road damage
- **Amplify Voices**: Use social sharing to raise public awareness and government pressure
- **Provide Safety**: Help citizens avoid road damage that damages vehicles and safety
- **Build Data**: Accumulate geographic data for future analysis and planning

## Tech Stack

### Frontend

- **React 18**: Modern component-based UI architecture
- **Vite**: Lightning-fast build tool with HMR
- **TypeScript**: Type-safe development for reliability
- **Tailwind CSS v4**: Utility-first styling with monochromatic design system
- **Firebase Authentication**: Seamless Google OAuth integration

### Backend

- **Hono**: Lightweight, edge-deployable API framework
- **Node.js/Bun**: Fast JavaScript runtime
- **PostgreSQL 15**: Reliable relational database
- **PostGIS**: Geographic Information System (GIS) support for spatial data

### Infrastructure

- **Cloudflare R2**: S3-compatible object storage for images
- **Docker**: Containerization for consistent deployments
- **Caddy**: Reverse proxy with automatic HTTPS and Docker label-based configuration
- **Turborepo**: Monorepo orchestration for faster builds

### Security & Quality

- **Firebase Admin SDK**: Secure token verification
- **reCAPTCHA v3**: Abuse protection without user friction
- **Zod**: Runtime schema validation
- **Prettier**: Code formatting consistency

## Architecture Highlights

### Monorepo Structure

The project uses Turborepo to manage multiple applications and shared packages:

```
apps/
  ├─ api/        # Hono backend (Node.js/Bun)
  ├─ web/        # React frontend (Vite)
packages/
  ├─ ui/         # Shared UI components + shadcn/ui
  ├─ config/     # Shared configuration
  └─ validators/ # Shared Zod schemas
infra/
  └─ docker/     # Docker compose & Caddy config
```

### Authentication Flow

Viralkan uses Firebase for authentication without backend JWT generation:

1. User logs in with Google via Firebase SDK
2. Firebase returns a JWT token
3. Frontend sends Firebase token to `/api/auth/verify`
4. Backend verifies token with Firebase Admin SDK and upserts user to PostgreSQL
5. All subsequent API calls include Firebase token in Authorization header
6. Backend middleware verifies token on each request

This approach leverages Firebase's security expertise while maintaining a stateless backend.

### Database Design

The database is built with spatial features from day one:

```sql
-- Users table (Firebase integrated)
users:
  - id, firebase_uid, email, name, avatar_url
  - role (user/admin) for future moderation

-- Reports table (GIS-ready)
reports:
  - id, user_id, image_url, category
  - street_name, location_text
  - lat, lon (for geographic queries)
  - status (pending/verified/rejected)
  - verified_at, verified_by, rejection_reason
```

Geographic columns enable future features like map visualization and clustering.

## Core Features (MVP)

### 1. Public Report Browsing

- Anonymous users can view all reports without login
- Paginated table with 10 reports per page
- Searchable by category (Berlubang/Retak/Lainnya)
- Report detail pages with full image and metadata
- <2 second load time on 3G connections

### 2. Google Authentication

- One-click Google OAuth login
- Secure Firebase token handling
- Session persistence across browser sessions
- HTTP-only cookie storage for security

### 3. User Dashboard

- Personalized dashboard with user statistics
- View personal reports in chronological order
- Quick statistics (total reports, this month, by category)
- One-click access to create new reports

### 4. Report Creation

- Multi-step form for structured data collection
- Image upload with drag-and-drop support
- Category selection (pothole, crack, other)
- Street name and location description
- Image preview before submission
- Form validation with helpful error messages
- reCAPTCHA protection against spam
- Rate limiting (10 reports per user per day)

### 5. Image Storage

- Secure upload to Cloudflare R2
- Signed URLs for private image access
- Client-side file validation (JPEG/PNG, max 10MB)
- Automatic thumbnail generation
- Optimized delivery with compression

### 6. Admin System (MVP 1.5)

- Admin dashboard for verification and moderation
- One-click report verification workflow
- Rejection with reason explanation
- Soft-delete capability for data recovery
- Status toggle for correcting mistakes
- Comprehensive audit logging
- Activity timeline for admin accountability
- Admin statistics and performance metrics

### 7. Error Handling

- Graceful error pages (404, 500, offline)
- Helpful error messages with recovery suggestions
- Network error handling with retry options
- User-friendly form validation messages

### 8. PWA Capabilities

- Offline support with service workers
- Installable as web app on mobile
- Background sync for report submissions
- Cached content for better performance

## Design System

### Monochromatic Design Philosophy

Viralkan uses a deliberately monochromatic (95% grayscale) design system:

**Why Monochromatic?**

- **Government Neutrality**: Appears impartial without political color associations
- **Content Focus**: User-generated damage photos become the primary visual
- **Accessibility**: Works perfectly for colorblind users and high-contrast displays
- **Trust**: Honest, unmanipulative interface design
- **Performance**: Fewer colors = simpler CSS and faster rendering

**Color Strategy:**

- **Base**: 13-step grayscale from #ffffff to #000000
- **Accents**: Dark gray for primary actions, red only for critical urgency
- **Categories**: Subtle differentiation (red for potholes, gray for cracks)
- **Status**: Green for resolved, red for urgent issues only

## Roadmap

| Version | Tagline                | Deliverable                                 | Timeline |
| ------- | ---------------------- | ------------------------------------------- | -------- |
| **V1**  | "Report & view — fast" | Google login, image upload, public list     | 3 weeks  |
| **V2**  | "Less typing"          | Auto EXIF GPS, reverse geocoding, autofill  | 2 weeks  |
| **V3**  | "See it on a map"      | Leaflet map, clustering, geographic filters | 2 weeks  |
| **V4**  | "Keep data clean"      | Enhanced admin dashboard, duplicate merge   | 2 weeks  |

## Technical Highlights

### Performance

- **Server-side Rendering**: Next.js 15 App Router with full SSR capabilities
- **Image Optimization**: Client-side compression with browser-image-compression library
  - HEIC/HEIF to JPEG conversion
  - WebP format with 85% quality, 1MB target size
  - Next.js image remotePatterns with 60-second minimum cache TTL
- **Database Connection Pooling**: PostgreSQL pool with 10 max connections, 20s idle timeout
- **Database Indexing**: 37 optimized indexes covering reports, user queries, and administrative operations
- **Caching Infrastructure**: Redis configured but caching logic not yet implemented (future enhancement)

### Security

- **Firebase Token Verification**: Full Admin SDK integration with comprehensive error handling
  - Token expiration checking and signature validation
  - Secure context-based user identification
- **Input Validation**: Comprehensive Zod schemas for all endpoints
  - String length validation, regex patterns, enum constraints
  - File upload validation (JPEG, PNG, WebP, HEIC max 10MB)
  - UUID v7 format validation for all IDs
- **SQL Injection Prevention**: Parametrized PostgreSQL queries throughout (no string concatenation)
- **XSS Protection**: Schema-validated responses, no raw HTML injection points
- **CORS Configuration**: Explicit origin whitelist with secure credentials and 24-hour max age
- **Authentication Middleware**: Reusable middleware for required/optional auth and role-based access control
- **Admin Access Control**: Environment-variable based admin configuration with session timeout
- **Future Enhancements**: reCAPTCHA v3 (configured but not yet integrated), Rate limiting (config exists, middleware pending)

### Scalability

- **Load Balancing**: Caddy reverse proxy with service discovery via Docker labels
- **Health Checks**: Automated health monitoring for database, Redis, and API services
- **CDN Integration**: Cloudflare R2 storage with remote pattern optimization in Next.js
- **Docker Architecture**: Multi-stage builds with non-root user execution for enhanced security
- **Containerization**: Separate optimized Docker images for API and Web with proper health checks
- **Infrastructure as Code**: Production-ready docker-compose files for staging and production
- **CI/CD Ready**: GitHub Container Registry integration with Watchtower auto-updates
- **Future Enhancements**: PostGIS spatial features available but not yet utilized, database read replicas (architecture ready)

### Developer Experience

- **Hot Reload Development**: Bun hot module reloading for API, Next.js turbopack for frontend
- **Type Safety**: Strict TypeScript mode with path aliases and type-safe environment variables
- **Shared Schemas**: Zod validation schemas shared across API validation and OpenAPI documentation
- **Monorepo Setup**: Turborepo with shared packages (ui, eslint-config, typescript-config)
- **API Documentation**: Auto-generated Swagger UI and OpenAPI specification from code
- **Database Commands**: Built-in migrate, reset, and seed scripts for easy management
- **Code Quality**: ESLint, Prettier, and TypeScript type checking configured and enforced
- **Comprehensive Documentation**: README with quick start, environment setup, and database management
- **Testing Infrastructure**: Bun test runner configured; E2E testing (Playwright) referenced but not yet implemented

## Deployment

The platform is designed for easy self-hosting:

**Local Development:**

```bash
git clone https://github.com/naufaldi/viralkan-app
cd viralkan-app
bun install
turbo run dev  # API on :3000, Web on :5173
```

**Production Stack:**

- Docker Compose orchestration
- Caddy reverse proxy with automatic HTTPS
- PostgreSQL with PostGIS extension
- Cloudflare R2 for image storage
- Docker labels for easy routing configuration
- Environment-based configuration for easy deployment

## Security & Admin Features

The admin system provides necessary moderation with a balance between functionality and simplicity:

### Implemented:

- **Admin Setup**: Environment-variable based configuration (ADMIN_EMAILS) for easy deployment
- **Role-Based Access Control**: Admin role management with middleware enforcement
- **Verification Workflow**: Report status management (pending/verified/rejected/deleted)
- **Rejection Management**: Reason storage and user feedback capability
- **Soft Deletes**: Data retention with logical deletion (not permanent removal)
- **Admin Middleware**: Composite middleware (`requireAdmin`) for protecting admin endpoints
- **Session Management**: Session timeout configuration for admin sessions
- **Error Handling**: Structured error responses with timestamps and request tracking

### Schema & Infrastructure Ready (Not Yet Implemented):

- **Audit Trail**: `admin_actions` table created with proper indexing for tracking admin actions
  - Schema includes: admin_user_id, action_type, target_type, target_id, details, created_at
  - Indexes on admin_user_id, action_type, target_type, and created_at
  - **Awaiting**: Population of this table with actual admin action logging
- **Rate Limiting**: Configuration functions exist but middleware enforcement is pending
- **Statistics**: Admin dashboard structure defined but metrics aggregation needs implementation

### Security Best Practices Implemented:

- No hardcoded credentials in source code
- Environment-based admin configuration
- Database-based role management
- Proper error handling without exposing sensitive information

## Impact & Future

Viralkan is built as a community-first platform with:

- **Citizen Empowerment**: Enable voices that aren't officially heard
- **Data-Driven Insights**: Accumulate geographic patterns of road damage
- **Social Proof**: Public visibility encourages government response
- **Sustainability**: Open-source design allows others to fork and adapt

Future versions will add:

- Map visualization of damage clusters
- Smart metadata extraction from photos (EXIF GPS, reverse geocoding)
- Admin dashboard for content moderation
- Export capabilities for data analysis
- Integration with government APIs

## Live Site

Visit **[https://viralkan.app](https://viralkan.app)** to explore the platform or submit a report.

## Repository

Full source code available at **[https://github.com/naufaldi/viralkan-app](https://github.com/naufaldi/viralkan-app)**

---

## Technical Decisions

### Why Hono over Express?

Hono is lightweight, edge-friendly, and perfect for single-developer projects with built-in middleware support and TypeScript-first design.

### Why Bun?

Fast runtime startup, excellent TypeScript support without compilation, and powerful built-in APIs reduce dependency bloat.

### Why Firebase Auth?

Reduces backend complexity, provides enterprise-grade security, and Firebase JWT tokens can be verified server-side without managing secrets.

### Why PostGIS?

Enables future geographic features (clustering, distance queries, heatmaps) while maintaining relational database benefits for current data.

### Why Cloudflare R2?

Cost-effective S3 alternative with geographic distribution, especially beneficial for Southeast Asia deployment.

### Why Monochromatic Design?

Builds trust through honest design, focuses attention on user-generated content (damage photos), and ensures accessibility without compromise.

## Lessons Learned

Building Viralkan as a solo full-stack project from scratch provided valuable experience in:

### Technical Learnings:

- **Progressive Enhancement**: Build infrastructure first (database, auth, storage), then add features incrementally
  - Redis configured but caching not yet integrated (learned: separate infrastructure from implementation)
  - PostGIS installed but spatial queries not yet utilized (learned: plan features before adding dependencies)
- **Security Fundamentals**: Firebase token verification is solid, but other layers need equal attention
  - Comprehensive Zod validation prevents bad data at the source
  - Environment-based configuration keeps secrets safe
  - Learned: Don't implement reCAPTCHA without understanding actual abuse patterns first
- **Schema-Driven Development**: Zod schemas sharing between validation and API documentation reduces duplication
- **DevOps & Containerization**: Multi-stage Docker builds, health checks, and docker-compose orchestration
  - Learned: Label-based routing (Caddy) is simpler than complex reverse proxy configurations
- **Monorepo Discipline**: Shared packages keep code DRY across API and Web applications

### Product & Process Learnings:

- **Scope Management**: Planning V1-V4 releases helps prioritize what matters most
  - V1 focuses on core reporting (image + form)
  - V2 adds smart features (EXIF, geocoding)
  - V3 adds visualization (maps)
  - Learned: Don't implement admin features until the public product is solid
- **Database Design**: GIS columns from day one enable future geographic features without schema migration
  - Learned: PostGIS capability vs. PostGIS usage are different—plan actual queries before optimization
- **Admin System**: Environment-variable based configuration works well for open-source self-hosting
  - Audit logging schema exists but isn't populated—learned: implement logging at the same time as features, not after
- **Civic Tech Principles**: Designing for real-world impact requires understanding community trust and transparency
  - Monochromatic design signals neutrality and government-appropriateness
  - Public data access builds community credibility

### What Would Be Done Differently:

1. **Implement audit logging alongside admin features**, not as an afterthought
2. **Add rate limiting and reCAPTCHA during report creation**, not later
3. **Activate Redis caching for frequently accessed data** before performance issues arise
4. **Write E2E tests early** instead of referencing Playwright without tests
5. **Document what's planned vs. implemented** in code (learned the hard way when reviewing for portfolio)
