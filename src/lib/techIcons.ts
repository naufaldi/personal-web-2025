import {
  Code2,
  FileCode,
  Zap,
  Palette,
  Server,
  Globe,
  Database,
  Package,
  Cpu,
  Shield,
  GitBranch,
  Box,
  Layers,
  Clock,
  BarChart3,
  Gauge,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export const techIconMap: Record<string, LucideIcon> = {
  // Frontend
  React: Code2,
  "React 18": Code2,
  TypeScript: FileCode,
  "Next.js": Zap,
  Tailwind: Palette,
  "Tailwind CSS": Palette,
  Vite: Zap,
  "Vue.js": Code2,

  // Backend
  "Node.js": Server,
  Python: Code2,
  FastAPI: Zap,
  Hono: Server,
  Express: Server,
  "Ruby on Rails": Package,

  // Databases
  PostgreSQL: Database,
  PostGIS: Database,
  MongoDB: Database,
  SQLite: Database,
  "SQL Server": Database,
  Redis: Database,

  // ORMs & Query Builders
  SQLAlchemy: Layers,
  Prisma: Package,
  Sequelize: Package,
  TypeORM: Package,

  // Data & APIs
  GraphQL: Zap,
  "REST API": Globe,
  HTTPX: Globe,
  Axios: Globe,

  // Infrastructure & Deployment
  Docker: Box,
  Caddy: Shield,
  Traefik: Shield,
  Kubernetes: Layers,
  AWS: Cloud,
  "Cloudflare R2": Globe,
  "Docker Compose": Box,

  // Validation & Serialization
  Pydantic: Shield,
  Zod: Shield,
  Joi: Shield,
  "Firebase Auth": Shield,

  // Task Scheduling
  APScheduler: Clock,
  "Bull Queue": Clock,

  // Testing
  Pytest: Gauge,
  "Pytest-asyncio": Gauge,
  Playwright: Gauge,
  Jest: Gauge,
  Vitest: Gauge,

  // Development Tools
  Ruff: Cpu,
  ESLint: Cpu,
  Prettier: Palette,
  Bun: Cpu,

  // Monorepo & Build
  Turborepo: Zap,
  Turbo: Zap,

  // Framework & Runtime
  Firebase: Zap,
  Alembic: GitBranch,
  "Python JSON Logger": BarChart3,
  Storybook: Globe,
};

export const getTechIcon = (techName: string): LucideIcon | null => {
  return techIconMap[techName] || null;
};
